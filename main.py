import sys
import os
import decky
import json
from pathlib import Path
sys.path.append(os.path.join(os.path.dirname(__file__), "backend"))
from toggle import modificar_vdf, restaurar_vdf
from utils import detect_game_from_process

STATE_DIR = Path("/tmp/Toggle-Trackpad")
STATE_FILE = STATE_DIR / "trackpad_state.json"
VDF_PATH = "/home/deck/.local/share/Steam/steamapps/common/Steam Controller Configs/312585954/config/668580/controller_neptune.vdf"

class Plugin:
    async def _main(self):
        decky.logger.info("Toggle Trackpad plugin loaded")

    async def _unload(self):
        decky.logger.info("Toggle Trackpad plugin unloaded")

    async def get_state(self):
        try:
            if not STATE_DIR.exists():
                STATE_DIR.mkdir(parents=True)
                decky.logger.info(f"Directorio creado: {STATE_DIR}")

            if STATE_FILE.exists():
                with open(STATE_FILE, "r") as f:
                    data = json.load(f)
                    return data.get("enabled", False)
            else:
                with open(STATE_FILE, "w") as f:
                    json.dump({"enabled": False}, f)
                decky.logger.info("Archivo de estado creado por primera vez")
                return False
        except Exception as e:
            decky.logger.error(f"Error al leer o crear el archivo de estado: {e}")
            return False

    async def set_state(self, enabled: bool):
        try:
            if not STATE_DIR.exists():
                STATE_DIR.mkdir(parents=True)
                decky.logger.info(f"Directorio creado: {STATE_DIR}")

            with open(STATE_FILE, "w") as f:
                json.dump({"enabled": enabled}, f)
            decky.logger.info(f"Estado guardado: {enabled}")
        except Exception as e:
            decky.logger.error(f"Error al guardar el estado: {e}")

    async def get_running_game(self):
        try:
            game =  None
            if game:
                decky.logger.info(f"Juego en ejecución: {game['display_name']} ({game['appid']})")
                return {
                    "running": True,
                    "name": game["display_name"],
                    "appid": game["appid"]
                }
            else:
                decky.logger.info("No hay juego en ejecución")
                return {
                    "running": False,
                    "name": None,
                    "appid": None
                }
        except Exception as e:
            decky.logger.error(f"Error al obtener juego activo: {e}")
            return {
                "running": False,
                "name": None,
                "appid": None
            }
        
    async def activate(self):
        decky.logger.info("Desactivando trackpads...")
        modificar_vdf(VDF_PATH)
        await self.set_state(True)
        return {"status": "ok", "enabled": True}

    async def restore(self):
        decky.logger.info("Restaurar trackpads...")
        restaurar_vdf(VDF_PATH)
        await self.set_state(False)
        return {"status": "ok", "enabled": False}
    
    def detect_game_from_process():
        game = {
            "name": None,
            "running": False,
            "appid": None
        }
        try:
            game_name = detect_game_from_process()
            if game_name:
                decky.logger.info(f"Juego detectado: {game_name}")
                game["name"] = game_name
            else:
                decky.logger.info("No se detectó ningún juego en ejecución.")
        except Exception as e:
            decky.logger.error(f"Error al detectar juego desde proceso: {e}")
        return game
