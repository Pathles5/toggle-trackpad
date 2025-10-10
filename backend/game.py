import subprocess
import re
import requests
import os
import json
import decky

CACHE_FILE = "/tmp/Toggle-Trackpad/appid_cache.json"

def detect_game_from_process():
    try:
        result = subprocess.run(["ps", "aux"], stdout=subprocess.PIPE, text=True)
        for line in result.stdout.splitlines():
            match = re.search(r"/steamapps/common/([^/]+)/[^ ]+\.exe", line)
            if match:
                game_name = match.group(1)
                decky.logger.info(f"[GAME] Nombre detectado desde proceso: {game_name}")
                return game_name
        decky.logger.info("[GAME] No se detectó ningún proceso de juego.")
        return None
    except Exception as e:
        decky.logger.error(f"[ERROR] detect_game_from_process: {e}")
        return None

def load_cache():
    if os.path.exists(CACHE_FILE):
        try:
            with open(CACHE_FILE, "r") as f:
                return json.load(f)
        except:
            decky.logger.error(f"[ERROR] al cargar cache: {e}")
            return {}
    return {}

def save_cache(cache):
    try:
        os.makedirs(os.path.dirname(CACHE_FILE), exist_ok=True)
        with open(CACHE_FILE, "w") as f:
            json.dump(cache, f)
            decky.logger.info("[CACHE] Guardado exitoso")
    except Exception as e:
        decky.logger.error(f"[ERROR] al guardar cache: {e}")

def get_appid_from_steam(game_name):
    try:
        decky.logger.info(f"[STEAM] Buscando AppID para: {game_name}")
        response = requests.get("https://api.steampowered.com/ISteamApps/GetAppList/v2/")
        data = response.json()
        for app in data["applist"]["apps"]:
            if game_name.lower() in app["name"].lower():
                decky.logger.info(f"[STEAM] Coincidencia encontrada: {app['name']} (AppID: {app['appid']})")
                return app["appid"], app["name"]
        decky.logger.info("[STEAM] No se encontró AppID en la lista")
    except Exception as e:
        decky.logger.error(f"[ERROR] get_appid_from_steam: {e}")
    return None, None

def detect_game():
    game_name = detect_game_from_process()
    if not game_name:
        return {
            "appid": None,
            "name": None,
            "running": False
        }

    cache = load_cache()
    if game_name in cache:
        decky.logger.info(f"[CACHE] Usando AppID cacheado para {game_name}")
        return {
            "appid": cache[game_name]["appid"],
            "name": cache[game_name]["name"],
            "running": True
        }

    appid, official_name = get_appid_from_steam(game_name)
    if appid:
        cache[game_name] = {"appid": appid, "name": official_name}
        save_cache(cache)
        return {
            "appid": appid,
            "name": official_name,
            "running": True
        }

    decky.logger.warning(f"[GAME] Juego detectado pero no identificado correctamente: {game_name}")
    return {
        "appid": None,
        "name": "Juego no identificado correctamente",
        "running": True
    }
