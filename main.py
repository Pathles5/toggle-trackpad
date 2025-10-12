import os, sys
import decky
from pathlib import Path

sys.path.append(os.path.join(os.path.dirname(__file__), "backend/src"))
from toggle import modify_vdf, restore_vdf
from utils import load_game_config, save_game_config

STATE_DIR = Path("/tmp/Toggle-Trackpad")
GAME_DIR = STATE_DIR / "games"

def get_vdf_path(account_id: str, app_id: str) -> str:
    """
    Constructs the full path to the VDF file for a given Steam AppID.

    Args:
        appid (int): The Steam AppID of the game.

    Returns:
        str: Full path to the controller VDF file.
    """
    return f"/home/deck/.local/share/Steam/steamapps/common/Steam Controller Configs/{account_id}/config/{app_id}/controller_neptune.vdf"
class Plugin:
    def __init__(self):
        self.current_game = None

    async def _main(self):
        decky.logger.info("Toggle Trackpad plugin loaded")

    async def _unload(self):
        decky.logger.info("Toggle Trackpad plugin unloaded")

    async def toggle_trackpad(self, account_id: str, game: dict, enabled: bool):
        if not game or not game.get("appid"):
            decky.logger.warning("No game detected → cannot toggle")
            return {"status": "error", "enabled": not enabled}

        appid = game["appid"]
        vdf_path = get_vdf_path(account_id, appid)

        if not os.path.exists(vdf_path):
            decky.logger.error(f"File not found: {vdf_path}")
            return {
                "status": "missing_vdf",
                "enabled": not enabled,
                # "message": "Missing VDF file. Please create an Action Set in the controller layout editor."
            }

        if enabled:
            decky.logger.info(f"Disabling trackpads for AppID {appid}...")
            modify_vdf(vdf_path)
        else:
            decky.logger.info(f"Restoring trackpads for AppID {appid}...")
            restore_vdf(vdf_path)

        await self.set_state(game,enabled)
        return {"status": "ok", "enabled": enabled}

    async def get_state(self, game: dict):
        if not game or not game.get("appid"):
            decky.logger.info("No game detected → toggle disabled")
            self.current_game = None
            return {"enabled": False, "state": False}

        if not self.current_game or self.current_game.appid != game["appid"]:
            config = load_game_config(game["appid"])
            if config:
                decky.logger.info(config)
                self.current_game = config
                decky.logger.info(f"Game loaded: {config['name']} → trackpad_disabled={config['trackpad_disabled']}")
                return {"enabled": True, "state": not config["trackpad_disabled"]}
            else:
                config = save_game_config(game["display_name"], game["appid"], False)
                decky.logger.info(f"Game loaded: {config['name']} → trackpad_disabled={config['trackpad_disabled']}")
                return {"enabled": True, "state": config["trackpad_disabled"]}


    async def set_state(self, game: dict, disabled: bool):
        try:
            if not game or not game.get("appid"):
                decky.logger.warning("No game running → cannot set state")
                return

            if not self.current_game or self.current_game.appid != game["appid"]:
                config = load_game_config(game["appid"])
                if config:
                    self.current_game = config
                else:
                    decky.logger.info(f"Creating new config for {game['display_name']}")
                    self.current_game = save_game_config(game["display_name"], str(game["appid"]), disabled)
                    return

            self.current_game.trackpad_disabled = disabled
            save_game_config(
                appname=self.current_game.name,
                appid=str(self.current_game.appid),
                trackpad_disabled=disabled
            )
            decky.logger.info(f"Updated state for {self.current_game.name} → trackpad_disabled={disabled}")
        except Exception as e:
            decky.logger.error(f"[ERROR] Failed to set state for {game['display_name']}: {e}")
