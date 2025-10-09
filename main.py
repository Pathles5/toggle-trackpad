import decky
import subprocess
import json
from pathlib import Path

STATE_DIR = Path("/tmp/Toggle-Trackpad")
STATE_FILE = STATE_DIR / "trackpad_state.json"

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

    async def activate(self):
        decky.logger.info("Ejecutando on.py para desactivar trackpad...")
        subprocess.run(["python3", "/home/deck/homebrew/plugins/Toggle-Trackpad/backend/on.py"])
        await self.set_state(True)
        return {"status": "ok", "enabled": True}

    async def restore(self):
        decky.logger.info("Ejecutando off.py para restaurar trackpad...")
        subprocess.run(["python3", "/home/deck/homebrew/plugins/Toggle-Trackpad/backend/off.py"])
        await self.set_state(False)
        return {"status": "ok", "enabled": False}
