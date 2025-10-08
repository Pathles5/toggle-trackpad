import re
import shutil
import os

# VDF_PATH = "./controller_neptune.vdf"
VDF_PATH = "/home/deck/.local/share/Steam/steamapps/common/Steam Controller Configs/312585954/config/668580/controller_neptune.vdf"

def log(msg: str):
    print(f"[LOG] {msg}")

def read_text(path: str) -> str:
    with open(path, "r", encoding="utf-8", errors="replace") as f:
        return f.read()

def write_text(path: str, text: str):
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)

def backup_file(path: str) -> str:
    backup_path = path + ".bak"
    shutil.copy(path, backup_path)
    return backup_path

def extraer_presets(texto: str):
    pattern = r'"preset"\s*\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}'
    return re.findall(pattern, texto, re.DOTALL)

def desactivar_trackpads(block: str) -> str:
    """
    Elimina cualquier línea que contenga 'trackpad' (clave y valor).
    """
    nuevas_lineas = []
    for linea in block.splitlines():
        if "trackpad" not in linea.lower():
            nuevas_lineas.append(linea)
    return "\n".join(nuevas_lineas)

def duplicar_preset_default(texto: str) -> str:
    # Validación: ¿ya existe un preset con name="__backup"?
    if re.search(r'"preset"\s*\{[^{}]*"name"\s*"__backup"', texto):
        log("Ya existe un preset '__backup'. No se duplica.")
        return texto

    presets = extraer_presets(texto)
    log(f"Presets detectados: {len(presets)}")

    default_block = None
    for block in presets:
        name_match = re.search(r'"name"\s*"([^"]+)"', block)
        nombre = name_match.group(1) if name_match else "??"
        log(f" - {nombre}")
        if nombre == "Default" and default_block is None:
            default_block = block

    if not default_block:
        log("No se encontró preset 'Default'. Saltando duplicación de preset.")
        return texto

    log("Duplicando preset 'Default' como id=9 y name='__backup'...")
    backup_preset = default_block
    backup_preset = re.sub(r'"id"\s*"[^"]+"', '"id" "9"', backup_preset, count=1)
    backup_preset = re.sub(r'"name"\s*"[^"]+"', '"name" "__backup"', backup_preset, count=1)

    # Aplicar la regla: desactivar trackpads 'active' en el Default original
    default_block_mod = desactivar_trackpads(default_block)

    return texto.replace(default_block, default_block_mod + "\n" + backup_preset, 1)

def find_matching_brace(text: str, open_index: int) -> int:
    depth = 0
    for i in range(open_index, len(text)):
        c = text[i]
        if c == '{':
            depth += 1
        elif c == '}':
            depth -= 1
            if depth == 0:
                return i
    raise ValueError("No se encontró cierre de bloque '}'")

def duplicar_action_default(texto: str) -> str:
    # Validación: ¿ya existe una acción "__backup"?
    if re.search(r'"__backup"\s*\{', texto):
        log("Ya existe una acción '__backup'. No se duplica.")
        return texto

    actions_match = re.search(r'"actions"\s*\{', texto)
    if not actions_match:
        log("No se encontró bloque 'actions'. Saltando duplicación de acción.")
        return texto

    actions_open = actions_match.end() - 1
    actions_close = find_matching_brace(texto, actions_open)
    actions_block = texto[actions_open:actions_close + 1]

    default_key_match = re.search(r'"Default"\s*\{', actions_block)
    if not default_key_match:
        log("No se encontró acción 'Default' en 'actions'.")
        return texto

    def_open = default_key_match.end() - 1
    def_close = find_matching_brace(actions_block, def_open)
    default_subblock = actions_block[default_key_match.start():def_close + 1]

    log("Duplicando acción 'Default' como '__backup' con título 'Backup'...")

    backup_subblock = default_subblock
    backup_subblock = re.sub(r'"Default"\s*\{', '"__backup"\n{', backup_subblock, count=1)
    backup_subblock = re.sub(r'"title"\s*"[^"]+"', '"title" "Backup"', backup_subblock, count=1)

    new_actions_block = actions_block.replace(default_subblock, default_subblock + "\n" + backup_subblock, 1)
    return texto[:actions_open] + new_actions_block + texto[actions_close + 1:]

def modificar_vdf(path: str):
    if not os.path.exists(path):
        log(f"Archivo no encontrado: {path}")
        return

    log("Leyendo archivo VDF como texto...")
    original_text = read_text(path)

    text_with_backup_preset = duplicar_preset_default(original_text)
    final_text = duplicar_action_default(text_with_backup_preset)

    backup_path = backup_file(path)
    log(f"Backup creado en: {backup_path}")

    write_text(path, final_text)
    log("Preset '__backup' y acción '__backup' añadidos correctamente, con trackpads activos desactivados en 'Default'.")

if __name__ == "__main__":
    modificar_vdf(VDF_PATH)
