from utils import read_text, write_text, backup_file
from parseVdf import find_matching_brace
from logger import *
import re
import os

def extraer_presets(texto: str):
    pattern = r'"preset"\s*\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}'
    return re.findall(pattern, texto, re.DOTALL)

# 🔧 Activar: duplicar preset y acción
def desactivar_trackpads(block: str) -> str:
    return "\n".join([line for line in block.splitlines() if "trackpad" not in line.lower()])

def duplicar_preset_default(texto: str) -> str:
    if re.search(r'"preset"\s*\{[^{}]*"name"\s*"__backup"', texto):
        log_warn("Ya existe un preset '__backup'. No se duplica.")
        return texto

    presets = extraer_presets(texto)
    default_block = next((b for b in presets if re.search(r'"name"\s*"Default"', b)), None)

    if not default_block:
        log("No se encontró preset 'Default'. Saltando duplicación.")
        return texto

    log_info("Duplicando preset 'Default' como '__backup'...")
    backup = re.sub(r'"id"\s*"[^"]+"', '"id" "9"', default_block, count=1)
    backup = re.sub(r'"name"\s*"[^"]+"', '"name" "__backup"', backup, count=1)
    default_mod = desactivar_trackpads(default_block)

    return texto.replace(default_block, default_mod + "\n" + backup, 1)

def duplicar_action_default(texto: str) -> str:
    if re.search(r'"__backup"\s*\{', texto):
        log_warn("Ya existe acción '__backup'. No se duplica.")
        return texto

    actions_match = re.search(r'"actions"\s*\{', texto)
    if not actions_match:
        log_warn("No se encontró bloque 'actions'.")
        return texto

    open_idx = actions_match.end() - 1
    close_idx = find_matching_brace(texto, open_idx)
    actions_block = texto[open_idx:close_idx + 1]

    default_match = re.search(r'"Default"\s*\{', actions_block)
    if not default_match:
        log_warn("No se encontró acción 'Default'.")
        return texto

    def_open = default_match.end() - 1
    def_close = find_matching_brace(actions_block, def_open)
    default_subblock = actions_block[default_match.start():def_close + 1]

    log_info("Duplicando acción 'Default' como '__backup'...")
    backup = re.sub(r'"Default"\s*\{', '"__backup"\n{', default_subblock, count=1)
    backup = re.sub(r'"title"\s*"[^"]+"', '"title" "Backup"', backup, count=1)

    new_actions = actions_block.replace(default_subblock, default_subblock + "\n" + backup, 1)
    return texto[:open_idx] + new_actions + texto[close_idx + 1:]

def modificar_vdf(path: str):
    if not os.path.exists(path):
        log_error(f"Archivo no encontrado: {path}")
        return False

    log_info("Modificando VDF...")
    original = read_text(path)
    modificado = duplicar_preset_default(original)
    final = duplicar_action_default(modificado)

    backup_path = backup_file(path, ".bak")
    log_info(f"Backup creado en: {backup_path}")

    write_text(path, final)
    log_info("Modificación completada.")
    return True

# 🔧 Restaurar: revertir preset y acción
def restaurar_preset(texto: str) -> str:
    presets = extraer_presets(texto)
    default = next((b for b in presets if re.search(r'"name"\s*"Default"', b)), None)
    backup = next((b for b in presets if re.search(r'"name"\s*"__backup"', b)), None)

    if not backup:
        log_error("No existe preset '__backup'.")
        return texto

    log_info("Restaurando preset 'Default' desde '__backup'...")
    restored = re.sub(r'"id"\s*"[^"]+"', '"id" "0"', backup, count=1)
    restored = re.sub(r'"name"\s*"[^"]+"', '"name" "Default"', restored, count=1)

    texto = texto.replace(default, restored, 1) if default else texto.replace(backup, restored, 1)
    texto = texto.replace(backup, "", 1)
    return texto

def limpiar_action_backup(texto: str) -> str:
    match = re.search(r'"__backup"\s*\{', texto)
    if not match:
        log_error("No existe acción '__backup'.")
        return texto

    open_idx = match.end() - 1
    close_idx = find_matching_brace(texto, open_idx)
    backup_block = texto[match.start():close_idx + 1]

    log_info("Eliminando acción '__backup'...")
    return texto.replace(backup_block, "", 1)

def restaurar_vdf(path: str):
    if not os.path.exists(path):
        log_error(f"Archivo no encontrado: {path}")
        return False

    log_info("Restaurando VDF...")
    original = read_text(path)
    restaurado = restaurar_preset(original)
    final = limpiar_action_backup(restaurado)

    backup_path = backup_file(path, ".restorebak")
    log_info(f"Backup de seguridad creado en: {backup_path}")

    write_text(path, final)
    log_info("Restauración completada.")
    return True
