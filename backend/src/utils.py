import os
import decky
import shutil
import difflib
from typing import Optional, List, Dict
from modules.GameConfig import GameConfig

GAME_DIR = "/tmp/Toggle-Trackpad/games"

def find_most_similar(detected: str, candidates: List[Dict]) -> Optional[Dict]:
    best = None
    best_score = 0.0
    for candidate in candidates:
        name = candidate["name"]
        score = similar_strings(detected, name)
        if score > best_score:
            best = candidate
            best_score = score
    return best if best else None

def similar_strings(a: str, b: str) -> float:
    ratio = difflib.SequenceMatcher(None, a, b).ratio()
    return round(ratio * 100, 2)

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

def get_game_file(appname: str) -> str:
    return os.path.join(GAME_DIR, f"{appname}.json")

def load_game_config(appname: str) -> Optional[GameConfig]:
    path = get_game_file(appname)
    if os.path.exists(path):
        try:
            with open(path, "r") as f:
                config = GameConfig.from_json(f.read())
                with open(path, "w") as fw:
                    fw.write(config.to_json())
                return config
        except Exception as e:
            decky.logger.error(f"[ERROR] Failed to load game config for {appname}: {e}")
    return None

def save_game_config(appname: str, appid: str, trackpad_disabled: bool):
    try:
        os.makedirs(GAME_DIR, exist_ok=True)
        path = get_game_file(appname)
        config = GameConfig(
            appid=int(appid),
            name=appname,
            trackpad_disabled=trackpad_disabled,
        )
        with open(path, "w") as f:
            f.write(config.to_json())
        decky.logger.info(f"[STATE] Saved config for {appname}")
    except Exception as e:
        decky.logger.error(f"[ERROR] Failed to save game config for {appname}: {e}")
