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
        """
        Initializes the plugin instance and sets the in-memory game state to None.
        This variable will hold the current GameConfig if a game is detected.
        """
        self.current_game = None

    async def _main(self):
        """
        Called when the plugin is loaded.
        Logs the initialization event.
        """
        decky.logger.info("Toggle Trackpad plugin loaded")

    async def _unload(self):
        """
        Called when the plugin is unloaded.
        Logs the unloading event.
        """
        decky.logger.info("Toggle Trackpad plugin unloaded")

    async def activate(self):
        """
        Disables the trackpads by modifying the VDF file and updates the game state.

        Returns:
            dict: A status object indicating success and that the toggle is now enabled.
        """
        decky.logger.info("Disabling trackpads...")
        modify_vdf(VDF_PATH)
        await self.set_state(True)
        return {"status": "ok", "enabled": True}

    async def restore(self):
        """
        Restores the trackpads by reverting the VDF file and updates the game state.

        Returns:
            dict: A status object indicating success and that the toggle is now disabled.
        """
        decky.logger.info("Restoring trackpads...")
        restore_vdf(VDF_PATH)
        await self.set_state(False)
        return {"status": "ok", "enabled": False}
    
    async def get_state(self):
        """
        Determines the current state of the plugin based on the detected game.

        If no game is running, disables the toggle.
        If a game is running, loads its config from disk and updates memory.

        Returns:
            dict: {
                "enabled": bool → whether the toggle is interactable,
                "state": bool → whether the trackpad is currently disabled
            }
        """
        detected = get_running_game()
        if not detected or not detected["appid"]:
            decky.logger.info("No game detected → toggle disabled")
            self.current_game = None
            return {"enabled": False, "state": False}

        if not self.current_game or self.current_game.name != detected["name"]:
            config = load_game_config(detected["name"])
            if config:
                self.current_game = config
                decky.logger.info(f"Game loaded: {config.name} → trackpad_disabled={config.trackpad_disabled}")
                return {"enabled": True, "state": not config.trackpad_disabled}
            else:
                decky.logger.info(f"No config found for {detected['name']} → toggle enabled, default state")
                return {"enabled": True, "state": True}

        return {"enabled": True, "state": not self.current_game.trackpad_disabled}

    async def set_state(self, disabled: bool):
        """
        Updates the trackpad state for the current game.

        If no game is detected, does nothing.
        If the game has changed, reloads or creates its config.
        Then updates both memory and disk with the new state.

        Args:
            disabled (bool): True to disable trackpad, False to enable.
        """
        detected = get_running_game()
        if not detected or not detected["appid"]:
            decky.logger.warning("No game running → cannot set state")
            return

        if not self.current_game or self.current_game.name != detected["name"]:
            config = load_game_config(detected["name"])
            if config:
                self.current_game = config
            else:
                decky.logger.info(f"Creating new config for {detected['name']}")
                save_game_config(detected["name"], str(detected["appid"]), trackpad_disabled=disabled)
                self.current_game = load_game_config(detected["name"])
                return

        self.current_game.trackpad_disabled = disabled
        save_game_config(
            appname=self.current_game.name,
            appid=str(self.current_game.appid),
            trackpad_disabled=disabled
        )
        decky.logger.info(f"Updated state for {self.current_game.name} → trackpad_disabled={disabled}")

    async def detect_game(self):
        """
        Detects the currently running game using system process inspection.

        Returns:
            dict: {
                "running": bool,
                "name": str or None,
                "appid": int or None
            }
        """
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
