import os
import shutil
import difflib
import json
from typing import Optional, List, Dict
from datetime import datetime
from models.GameConfig import GameConfig
import decky

GAME_DIR = "/tmp/Toggle-Trackpad/games"

def find_most_similar(detected: str, candidates: List[Dict]) -> Optional[Dict]:
    """
    Finds the most similar candidate name to the detected string.

    Args:
        detected (str): The name to compare against.
        candidates (List[Dict]): A list of dictionaries with a 'name' key.

    Returns:
        Optional[Dict]: The dictionary with the highest similarity score, or None if no match found.
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
    Calculates the similarity percentage between two strings using SequenceMatcher.

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
        str: File contents as a string.
    """
    with open(path, "r", encoding="utf-8", errors="replace") as f:
        return f.read()

def write_text(path: str, text: str):
    """
    Writes text content to a file.

    Args:
        path (str): Path to the file.
        text (str): Text to write.
    """
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)

def backup_file(path: str, suffix: str = ".bak") -> str:
    """
    Creates a backup copy of a file.

    Args:
        path (str): Original file path.
        suffix (str, optional): Suffix to append to the backup file. Defaults to ".bak".

    Returns:
        str: Path to the backup file.
    """
    backup_path = path + suffix
    shutil.copy(path, backup_path)
    return backup_path

def get_game_file(appid: str) -> str:
    """
    Constructs the file path for a game's configuration file.

    Args:
        appid (str): Steam AppID of the game.

    Returns:
        str: Full path to the game's JSON config file.
    """
    return os.path.join(GAME_DIR, f"{appid}.json")

def load_game_config(appid: str) -> Optional[GameConfig]:
    """
    Loads a game's configuration from disk.

    Args:
        appid (str): Steam AppID of the game.

    Returns:
        Optional[GameConfig]: Parsed GameConfig object, or None if not found or failed to load.
    """
    path = get_game_file(appid)
    if os.path.exists(path):
        try:
            with open(path, "r") as f:
                return GameConfig.from_json(f.read())
        except Exception as e:
            decky.logger.error(f"[ERROR] Failed to load game config for {appid}: {e}")
    return None

def save_game_config(appid: str, name: str, trackpad_disabled: bool):
    """
    Saves a game's configuration to disk.

    Args:
        appid (str): Steam AppID of the game.
        name (str): Display name of the game.
        trackpad_disabled (bool): Whether the trackpad is disabled for this game.
    """
    try:
        os.makedirs(GAME_DIR, exist_ok=True)
        path = get_game_file(appid)
        config = GameConfig(
            appid=int(appid),
            name=name,
            trackpad_disabled=trackpad_disabled,
            last_seen=datetime.now().isoformat()
        )
        with open(path, "w") as f:
            f.write(config.to_json())
        decky.logger.info(f"[STATE] Saved config for AppID {appid}")
    except Exception as e:
        decky.logger.error(f"[ERROR] Failed to save game config for {appid}: {e}")
