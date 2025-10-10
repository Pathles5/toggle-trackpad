import subprocess
import re
import urllib.request
import urllib.parse
import json
import os
import decky
from utils import find_most_similar

CACHE_FILE = "/tmp/Toggle-Trackpad/appid_cache.json"

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

def load_cache():
    if os.path.exists(CACHE_FILE):
        try:
            with open(CACHE_FILE, "r") as f:
                return json.load(f)
        except Exception as e:
            decky.logger.error(f"[ERROR] loading cache: {e}")
            return {}
    return {}

def save_cache(cache):
    try:
        os.makedirs(os.path.dirname(CACHE_FILE), exist_ok=True)
        with open(CACHE_FILE, "w") as f:
            json.dump(cache, f)
        decky.logger.info("[CACHE] Saved successfully")
    except Exception as e:
        decky.logger.error(f"[ERROR] saving cache: {e}")

def get_appid_from_gamedb(game_name):
    try:
        decky.logger.info(f"[GameDB] Searching AppID for: {game_name}")
        query = urllib.parse.quote(game_name)
        url = f"https://steam.watercollector.icu/search?q={query}"

        with urllib.request.urlopen(url, timeout=10) as response:
            data = response.read()
            results = json.loads(data)

        if results:
            best = find_most_similar(game_name, results)
            if best:
                decky.logger.info(f"[GameDB] Best match: {best['name']} (AppID: {best['id']})")
                return best["id"], best["name"]

        decky.logger.info("[GameDB] No match found")
    except Exception as e:
        decky.logger.error(f"[ERROR] GameDB API: {e}")
    return None, None

def get_running_game():
    game_name = detect_game_from_process()
    if not game_name:
        return {
            "appid": None,
            "name": None,
            "running": False
        }

    cache = load_cache()
    if game_name in cache:
        decky.logger.info(f"[CACHE] Using cached AppID for {game_name}")
        return {
            "appid": cache[game_name]["appid"],
            "name": cache[game_name]["name"],
            "running": True
        }

    appid, official_name = get_appid_from_gamedb(game_name)
    if appid:
        cache[game_name] = {"appid": appid, "name": official_name}
        save_cache(cache)
        return {
            "appid": appid,
            "name": official_name,
            "running": True
        }

    decky.logger.warning(f"[GAME] Game detected but not correctly identified: {game_name}")
    return {
        "appid": None,
        "name": "Game not correctly identified",
        "running": True
    }
