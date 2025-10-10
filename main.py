import os, sys
import decky
from pathlib import Path

sys.path.append(os.path.join(os.path.dirname(__file__), "backend/src"))
from toggle import modify_vdf, restore_vdf
from game import get_running_game
from utils import load_game_config, save_game_config

STATE_DIR = Path("/tmp/Toggle-Trackpad")
GAME_DIR = STATE_DIR / "games"
VDF_PATH = "/home/deck/.local/share/Steam/steamapps/common/Steam Controller Configs/312585954/config/668580/controller_neptune.vdf"

class Plugin:
    async def _main(self):
        decky.logger.info("Toggle Trackpad plugin loaded")

    async def _unload(self):
        decky.logger.info("Toggle Trackpad plugin unloaded")

    async def get_state(self):
        game = get_running_game()
        if not game or not game["appid"]:
            decky.logger.warning("No game running or AppID missing")
            return False

        config = load_game_config(str(game["appid"]))
        if config:
            decky.logger.info(f"Loaded config for {game['name']}: trackpad_disabled={config['trackpad_disabled']}")
            return config["trackpad_disabled"]
        else:
            decky.logger.info(f"No config found for {game['name']}, defaulting to False")
            return False

    async def set_state(self, enabled: bool):
        game = get_running_game()
        if not game or not game["appid"]:
            decky.logger.warning("No game running or AppID missing")
            return

        save_game_config(
            appid=str(game["appid"]),
            name=game["name"],
            trackpad_disabled=enabled
        )
        decky.logger.info(f"Saved config for {game['name']}: trackpad_disabled={enabled}")

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
        decky.logger.info("Checking for a running game...")
        try:
            game = get_running_game()
            if game:
                decky.logger.info(f"Detected game: {game}")
            else:
                decky.logger.info("No running game detected.")
        except Exception as e:
            decky.logger.error(f"Error detecting game from process: {e}")
        return game
