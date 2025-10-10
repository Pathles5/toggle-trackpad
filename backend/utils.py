import os
import shutil
import difflib
import json
from typing import Optional, List, Dict
from datetime import datetime
from models.GameConfig import GameConfig
import decky

GAME_DIR = "/tmp/Toggle-Trackpad/games"

# 🔍 Similaridad de nombres
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

# 📄 Lectura y escritura de texto plano
def read_text(path: str) -> str:
    with open(path, "r", encoding="utf-8", errors="replace") as f:
        return f.read()

def write_text(path: str, text: str):
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)

# 🗂 Backup de archivos
def backup_file(path: str, suffix: str = ".bak") -> str:
    backup_path = path + suffix
    shutil.copy(path, backup_path)
    return backup_path

# 🧩 Persistencia por juego
def get_game_file(appid: str) -> str:
    return os.path.join(GAME_DIR, f"{appid}.json")

def load_game_config(appid: str) -> Optional[GameConfig]:
    path = get_game_file(appid)
    if os.path.exists(path):
        try:
            with open(path, "r") as f:
                return GameConfig.from_json(f.read())
        except Exception as e:
            decky.logger.error(f"[ERROR] loading game config {appid}: {e}")
    return None

def save_game_config(appid: str, name: str, trackpad_disabled: bool):
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
        decky.logger.info(f"[STATE] Saved config for {appid}")
    except Exception as e:
        decky.logger.error(f"[ERROR] saving game config {appid}: {e}")
