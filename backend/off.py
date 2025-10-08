import re
import shutil
import os

VDF_PATH = "./controller_neptune.vdf"
# VDF_PATH = "/home/deck/.local/share/Steam/steamapps/common/Steam Controller Configs/312585954/config/668580/controller_neptune.vdf"

def log(msg: str):
    print(f"[LOG] {msg}")

def read_text(path: str) -> str:
    with open(path, "r", encoding="utf-8", errors="replace") as f:
        return f.read()

def write_text(path: str, text: str):
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)

def backup_file(path: str) -> str:
    backup_path = path + ".restorebak"
    shutil.copy(path, backup_path)
    return backup_path

def extraer_presets(texto: str):
    pattern = r'"preset"\s*\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}'
    return re.findall(pattern, texto, re.DOTALL)

def restaurar_preset(texto: str) -> str:
    presets = extraer_presets(texto)
    default_block = None
    backup_block = None

    for block in presets:
        name_match = re.search(r'"name"\s*"([^"]+)"', block)
        nombre = name_match.group(1) if name_match else "??"
        if nombre == "Default":
            default_block = block
        elif nombre == "__backup":
            backup_block = block

    if not backup_block:
        log("No existe preset '__backup'. No se restaura nada.")
        return texto

    log("Restaurando preset 'Default' desde '__backup'...")

    # Crear copia del bloque backup pero con name="Default" y id="0"
    restored_block = backup_block
    restored_block = re.sub(r'"id"\s*"[^"]+"', '"id" "0"', restored_block, count=1)
    restored_block = re.sub(r'"name"\s*"[^"]+"', '"name" "Default"', restored_block, count=1)

    # Reemplazar el bloque Default por el restaurado
    if default_block:
        texto = texto.replace(default_block, restored_block, 1)
    else:
        log("No había bloque 'Default', se insertará desde backup.")
        texto = texto.replace(backup_block, restored_block, 1)

    # Eliminar el bloque __backup
    texto = texto.replace(backup_block, "", 1)

    return texto

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

def limpiar_action_backup(texto: str) -> str:
    # Buscar bloque "__backup" dentro de actions
    match = re.search(r'"__backup"\s*\{', texto)
    if not match:
        log("No existe acción '__backup'. Nada que borrar.")
        return texto

    log("Eliminando acción '__backup'...")

    open_index = match.end() - 1
    close_index = find_matching_brace(texto, open_index)

    # Subbloque completo "__backup" { ... }
    backup_action_block = texto[match.start():close_index + 1]

    # Eliminarlo del texto
    return texto.replace(backup_action_block, "", 1)

def restaurar_vdf(path: str):
    if not os.path.exists(path):
        log(f"Archivo no encontrado: {path}")
        return

    log("Leyendo archivo VDF como texto...")
    original_text = read_text(path)

    # Restaurar preset
    text_after_presets = restaurar_preset(original_text)

    # Limpiar acción __backup
    final_text = limpiar_action_backup(text_after_presets)

    # Guardar backup de seguridad
    backup_path = backup_file(path)
    log(f"Backup de seguridad creado en: {backup_path}")

    # Guardar archivo restaurado
    write_text(path, final_text)
    log("Restauración completada correctamente.")

if __name__ == "__main__":
    restaurar_vdf(VDF_PATH)
