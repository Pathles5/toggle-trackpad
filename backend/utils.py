import subprocess
import re
import shutil
import decky

def read_text(path: str) -> str:
    with open(path, "r", encoding="utf-8", errors="replace") as f:
        return f.read()

def write_text(path: str, text: str):
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)

def backup_file(path: str, suffix: str = ".bak") -> str:
    backup_path = path + suffix
    shutil.copy(path, backup_path)
    return backup_path

def detect_game_from_process():
    result = subprocess.run(["ps", "aux"], stdout=subprocess.PIPE, text=True)
    for line in result.stdout.splitlines():
        match = re.search(r"/steamapps/common/([^/]+)/[^ ]+\.exe", line)
        if match:
            game_name = match.group(1)
            return game_name
    return None

def printDeckyConstants():
    try:
        pyi_path = getattr(decky, "__file__", None)
        if pyi_path and pyi_path.endswith(".pyi"):
            with open(pyi_path, "r", encoding="utf-8") as f:
                contents = f.read()
            const_names = re.findall(r'^\s*([A-Z][A-Z0-9_]+)\s*[:=]', contents, flags=re.M)
            seen = set()
            for name in const_names:
                if name in seen:
                    continue
                seen.add(name)
                try:
                    value = getattr(decky, name)
                except Exception:
                    value = "<no attribute>"
                decky.logger.info(f"{name}: {value}")
        else:
            decky.logger.info("No se encontró un archivo .pyi para decky")
    except Exception as e:
        decky.logger.error(f"Error al listar constantes de decky.pyi: {e}")