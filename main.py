import decky
import subprocess
import json
from pathlib import Path

STATE_FILE = Path("/tmp/Toggle-Trackpad/trackpad_state.json")

class Plugin:
    async def _main(self):
        decky.logger.info("Toggle Trackpad plugin loaded")

    async def _unload(self):
        decky.logger.info("Toggle Trackpad plugin unloaded")

    async def get_state(self):
        if STATE_FILE.exists():
            try:
                with open(STATE_FILE, "r") as f:
                    data = json.load(f)
                    return data.get("enabled", False)
            except Exception as e:
                decky.logger.error(f"Error reading state file: {e}")
        return False

    async def set_state(self, enabled: bool):
        try:
            with open(STATE_FILE, "w") as f:
                json.dump({"enabled": enabled}, f)
            decky.logger.info(f"Trackpad state saved: {enabled}")
        except Exception as e:
            decky.logger.error(f"Error writing state file: {e}")

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
