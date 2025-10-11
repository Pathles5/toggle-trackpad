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
    def __init__(self):
        self.current_game = None  # GameConfig en memoria

    async def _main(self):
        decky.logger.info("Toggle Trackpad plugin loaded")

    async def _unload(self):
        decky.logger.info("Toggle Trackpad plugin unloaded")

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
    
    async def get_state(self):
        detected = get_running_game()
        if not detected or not detected["appid"]:
            decky.logger.info("No game detected → toggle disabled")
            self.current_game = None
            return {"enabled": False, "state": False}

        # Si no hay juego en memoria o ha cambiado
        if not self.current_game or self.current_game.name != detected["name"]:
            config = load_game_config(detected["name"])
            if config:
                self.current_game = config
                decky.logger.info(f"Game loaded: {config.name} → trackpad_disabled={config.trackpad_disabled}")
                return {"enabled": True, "state": not config.trackpad_disabled}
            else:
                decky.logger.info(f"No config found for {detected['name']} → toggle enabled, default state")
                return {"enabled": True, "state": True}

        # Juego en memoria y coincide
        return {"enabled": True, "state": not self.current_game.trackpad_disabled}

    async def set_state(self, disabled: bool):
        detected = get_running_game()
        if not detected or not detected["appid"]:
            decky.logger.warning("No game running → cannot set state")
            return

        # Si el juego en memoria no coincide, lo recargamos
        if not self.current_game or self.current_game.name != detected["name"]:
            config = load_game_config(detected["name"])
            if config:
                self.current_game = config
            else:
                decky.logger.info(f"Creating new config for {detected['name']}")
                save_game_config(detected["name"], str(detected["appid"]), trackpad_disabled=disabled)
                self.current_game = load_game_config(detected["name"])
                return

        # Actualizamos estado en memoria y disco
        self.current_game.trackpad_disabled = disabled
        save_game_config(
            appname=self.current_game.name,
            appid=str(self.current_game.appid),
            trackpad_disabled=disabled
        )
        decky.logger.info(f"Updated state for {self.current_game.name} → trackpad_disabled={disabled}")


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
