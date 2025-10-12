import os
import decky
import shutil
import difflib
from typing import Optional, List, Dict
from modules.GameConfig import GameConfig

GAME_DIR = "/tmp/Toggle-Trackpad/games"

def find_most_similar(detected: str, candidates: List[Dict]) -> Optional[Dict]:
    """
    Finds the most similar candidate name to the detected game name using string similarity.

    Args:
        detected (str): The name of the game detected from the system.
        candidates (List[Dict]): A list of candidate games from the API, each with a 'name' field.

    Returns:
        Optional[Dict]: The best matching candidate dictionary, or None if no match is found.
    """
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
    """
    Calculates the similarity ratio between two strings using difflib.

    Args:
        a (str): First string.
        b (str): Second string.

    Returns:
        float: Similarity score as a percentage (0.0 to 100.0).
    """
    ratio = difflib.SequenceMatcher(None, a, b).ratio()
    return round(ratio * 100, 2)

def read_text(path: str) -> str:
    """
    Reads the contents of a text file.

    Args:
        path (str): Path to the file.

    Returns:
        str: Contents of the file as a string.
    """
    with open(path, "r", encoding="utf-8", errors="replace") as f:
        return f.read()

def write_text(path: str, text: str):
    """
    Writes text content to a file.

    Args:
        path (str): Path to the file.
        text (str): Text content to write.
    """
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)

def backup_file(path: str, suffix: str = ".bak") -> str:
    """
    Creates a backup copy of a file with a given suffix.

    Args:
        path (str): Original file path.
        suffix (str): Suffix to append to the backup file name.

    Returns:
        str: Path to the backup file.
    """
    backup_path = path + suffix
    shutil.copy(path, backup_path)
    return backup_path

def get_game_file(appid: str) -> str:
    """
    Constructs the full path to a game's configuration file.

    Args:
        appname (str): Name of the game used as the file identifier.

    Returns:
        str: Full path to the game's JSON config file.
    """
    return os.path.join(GAME_DIR, f"{appid}.json")

def load_game_config(appid: str) -> Optional[GameConfig]:
    """
    Loads a game's configuration from disk.

    Args:
        appname (str): Name of the game used to locate the config file.

    Returns:
        Optional[GameConfig]: Parsed GameConfig object if found and valid, otherwise None.
    """
    path = get_game_file(appid)
    if os.path.exists(path):
        try:
            with open(path, "r") as f:
                config = GameConfig.from_json(f.read())
                with open(path, "w") as fw:
                    fw.write(config.to_json())
                return config
        except Exception as e:
            decky.logger.error(f"[ERROR] Failed to load game config for {appid}: {e}")
    return None

def save_game_config(appname: str, appid: str, trackpad_disabled: bool):
    """
    Saves a game's configuration to disk.

    Args:
        appname (str): Name of the game used as the file identifier.
        appid (str): Steam AppID of the game.
        trackpad_disabled (bool): Whether the trackpad is disabled for this game.
    """
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
