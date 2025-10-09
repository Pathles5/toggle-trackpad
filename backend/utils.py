import subprocess
import re
import shutil

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

# # Ejemplo de uso
# if __name__ == "__main__":
#     game = detect_game_from_process()
#     if game:
#         print(f"Juego detectado: {game}")
#     else:
#         print("No se detectó ningún juego en ejecución.")
