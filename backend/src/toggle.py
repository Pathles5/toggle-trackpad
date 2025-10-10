import re
import os
import decky
from parseVdf import find_matching_brace
from utils import read_text, write_text, backup_file

def extract_presets(text: str):
    pattern = r'"preset"\s*\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}'
    return re.findall(pattern, text, re.DOTALL)

# 🔧 Enable: duplicate preset and action
def disable_trackpads(block: str) -> str:
    return "\n".join([line for line in block.splitlines() if "trackpad" not in line.lower()])

def duplicate_default_preset(text: str) -> str:
    if re.search(r'"preset"\s*\{[^{}]*"name"\s*"__backup"', text):
        decky.logger.warning("A '__backup' preset already exists. Skipping duplication.")
        return text

    presets = extract_presets(text)
    default_block = next((b for b in presets if re.search(r'"name"\s*"Default"', b)), None)

    if not default_block:
        decky.logger.warning("No 'Default' preset found. Skipping duplication.")
        return text

    decky.logger.info("Duplicating 'Default' preset as '__backup'...")
    backup = re.sub(r'"id"\s*"[^"]+"', '"id" "9"', default_block, count=1)
    backup = re.sub(r'"name"\s*"[^"]+"', '"name" "__backup"', backup, count=1)
    default_mod = disable_trackpads(default_block)

    return text.replace(default_block, default_mod + "\n" + backup, 1)

def duplicate_default_action(text: str) -> str:
    if re.search(r'"__backup"\s*\{', text):
        decky.logger.warning("A '__backup' action already exists. Skipping duplication.")
        return text

    actions_match = re.search(r'"actions"\s*\{', text)
    if not actions_match:
        decky.logger.warning("No 'actions' block found.")
        return text

    open_idx = actions_match.end() - 1
    close_idx = find_matching_brace(text, open_idx)
    actions_block = text[open_idx:close_idx + 1]

    default_match = re.search(r'"Default"\s*\{', actions_block)
    if not default_match:
        decky.logger.warning("No 'Default' action found.")
        return text

    def_open = default_match.end() - 1
    def_close = find_matching_brace(actions_block, def_open)
    default_subblock = actions_block[default_match.start():def_close + 1]

    decky.logger.info("Duplicating 'Default' action as '__backup'...")
    backup = re.sub(r'"Default"\s*\{', '"__backup"\n{', default_subblock, count=1)
    backup = re.sub(r'"title"\s*"[^"]+"', '"title" "Backup"', backup, count=1)

    new_actions = actions_block.replace(default_subblock, default_subblock + "\n" + backup, 1)
    return text[:open_idx] + new_actions + text[close_idx + 1:]

def modify_vdf(path: str):
    if not os.path.exists(path):
        decky.logger.error(f"File not found: {path}")
        return False

    decky.logger.info("Modifying VDF...")
    original = read_text(path)
    modified = duplicate_default_preset(original)
    final = duplicate_default_action(modified)

    backup_path = backup_file(path, ".bak")
    decky.logger.info(f"Backup created at: {backup_path}")

    write_text(path, final)
    decky.logger.info("Modification completed.")
    return True

# 🔧 Restore: revert preset and action
def restore_preset(text: str) -> str:
    presets = extract_presets(text)
    default = next((b for b in presets if re.search(r'"name"\s*"Default"', b)), None)
    backup = next((b for b in presets if re.search(r'"name"\s*"__backup"', b)), None)

    if not backup:
        decky.logger.error("No '__backup' preset exists.")
        return text

    decky.logger.info("Restoring 'Default' preset from '__backup'...")
    restored = re.sub(r'"id"\s*"[^"]+"', '"id" "0"', backup, count=1)
    restored = re.sub(r'"name"\s*"[^"]+"', '"name" "Default"', restored, count=1)

    text = text.replace(default, restored, 1) if default else text.replace(backup, restored, 1)
    text = text.replace(backup, "", 1)
    return text

def remove_action_backup(text: str) -> str:
    match = re.search(r'"__backup"\s*\{', text)
    if not match:
        decky.logger.error("No '__backup' action exists.")
        return text

    open_idx = match.end() - 1
    close_idx = find_matching_brace(text, open_idx)
    backup_block = text[match.start():close_idx + 1]

    decky.logger.info("Removing '__backup' action...")
    return text.replace(backup_block, "", 1)

def restore_vdf(path: str):
    if not os.path.exists(path):
        decky.logger.error(f"File not found: {path}")
        return False

    decky.logger.info("Restoring VDF...")
    original = read_text(path)
    restored = restore_preset(original)
    final = remove_action_backup(restored)

    backup_path = backup_file(path, ".restorebak")
    decky.logger.info(f"Safety backup created at: {backup_path}")

    write_text(path, final)
    decky.logger.info("Restoration completed.")
    return True
