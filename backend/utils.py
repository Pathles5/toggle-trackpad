import subprocess
import re

def detect_game_from_process():
    try:
        # Ejecutar ps aux para obtener todos los procesos activos
        result = subprocess.run(["ps", "aux"], stdout=subprocess.PIPE, text=True)
        output = result.stdout

        # Buscar líneas que contengan la ruta de instalación de juegos
        for line in output.splitlines():
            match = re.search(r"/steamapps/common/([^/]+)/", line)
            if match:
                game_name = match.group(1)
                return game_name  # Nombre del juego detectado
        return None  # No se detectó ningún juego
    except Exception as e:
        return f"Error al detectar juego: {e}"

# Ejemplo de uso
if __name__ == "__main__":
    game = detect_game_from_process()
    if game:
        print(f"Juego detectado: {game}")
    else:
        print("No se detectó ningún juego en ejecución.")
