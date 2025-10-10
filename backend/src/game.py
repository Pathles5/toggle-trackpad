import re
import ssl
import json
import subprocess
import urllib.parse
import urllib.request
import decky
from utils import find_most_similar, load_game_config, save_game_config

def detect_game_from_process():
    try:
        result = subprocess.run(["ps", "aux"], stdout=subprocess.PIPE, text=True)
        for line in result.stdout.splitlines():
            match = re.search(r"/steamapps/common/([^/]+)/[^ ]+\.exe", line)
            if match:
                game_name = match.group(1)
                decky.logger.info(f"[GAME] Detected name from process: {game_name}")
                return game_name
        decky.logger.info("[GAME] No game process detected.")
        return None
    except Exception as e:
        decky.logger.error(f"[ERROR] detect_game_from_process: {e}")
        return None

def get_appid_from_gamedb(game_name):
    try:
        decky.logger.info(f"[GameDB] Searching AppID for: {game_name}")
        query = urllib.parse.quote(game_name)
        url = f"https://steam.watercollector.icu/search?q={query}"
        context = ssl._create_unverified_context()
        with urllib.request.urlopen(url, timeout=10, context=context) as response:
            data = response.read()
            results = json.loads(data)

        if results:
            best = find_most_similar(game_name, results)
            if best:
                decky.logger.info(f"[GameDB] Best match: {best['name']} (AppID: {best['id']})")
                return best["id"]
        decky.logger.info("[GameDB] No match found")
    except Exception as e:
        decky.logger.error(f"[ERROR] GameDB API: {e}")
    return None

def get_running_game():
    game_name = detect_game_from_process()
    if not game_name:
        return {
            "appid": None,
            "name": None,
            "running": False
        }

    config = load_game_config(game_name)
    if config:
        return {
            "appid": config.appid,
            "name": config.name,
            "running": True
        }

    appid = get_appid_from_gamedb(game_name)
    if appid:
        save_game_config(game_name, str(appid), trackpad_disabled=False)
        return {
            "appid": appid,
            "name": game_name,
            "running": True
        }

    decky.logger.warning(f"[GAME] Game detected but not correctly identified: {game_name}")
    return {
        "appid": None,
        "name": "Game not correctly identified",
        "running": True
    }
