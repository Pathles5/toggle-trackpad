import sys
import os
import decky
import json
from pathlib import Path
sys.path.append(os.path.join(os.path.dirname(__file__), "backend"))
from toggle import modify_vdf, restore_vdf
from game import get_running_game
import re

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
            decky.logger.info(f"Checking state file: {STATE_FILE}")
            os.makedirs(STATE_DIR, exist_ok=True)
            if STATE_FILE.exists():
                with open(STATE_FILE, "r") as f:
                    data = json.load(f)
                    return data.get("enabled", False)
            else:
                with open(STATE_FILE, "w") as f:
                    json.dump({"enabled": False}, f)
                decky.logger.info("State file created for the first time")
                return False
        except Exception as e:
            decky.logger.error(f"Error reading or creating the state file: {e}")
            return False
        except Exception as e:
            decky.logger.error(f"Error reading or creating the state file: {e}")
            return False

    async def set_state(self, enabled: bool):
        try:
            os.makedirs(STATE_DIR, exist_ok=True)

            with open(STATE_FILE, "w") as f:
                json.dump({"enabled": enabled}, f)
            decky.logger.info(f"State saved: {enabled}")
        except Exception as e:
            decky.logger.error(f"Error saving state: {e}")

    # async def get_running_game(self):
    #     try:
    #         game = get_running_game()
    #         if game["appid"]:
    #             decky.logger.info(f"Detected game: {game['name']} (AppID: {game['appid']})")
    #         else:
    #             decky.logger.info("No running game detected.")
    #         return game
    #     except Exception as e:
    #         decky.logger.error(f"Error detecting game: {e}")
    #         return {"appid": None, "name": None, "running": False}

    async def activate(self):
        decky.logger.info("Disabling trackpads...")
        modify_vdf(VDF_PATH)
        await self.set_state(True)
        return {"status": "ok", "enabled": True}

    async def restore(self):
        decky.logger.info("Restoring trackpads...")
        restore_vdf(VDF_PATH)
        await self.set_state(False)
        return {"status": "ok", "enabled": False}
    
    async def detect_game(self):
        game = {
            "name": None,
            "running": False,
            "appid": None
        }
        decky.logger.info("Checking for a running game...")

        try:
            game_name = get_running_game()
            if game_name:
                decky.logger.info(f"Detected game: {game_name}")
                game["name"] = game_name
            else:
                decky.logger.info("No running game detected.")
        except Exception as e:
            decky.logger.error(f"Error detecting game from process: {e}")
        return game
