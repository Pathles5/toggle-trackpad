import vdf

def load_steamcontroller_config():
    path = "/home/deck/.steam/steam/config/steamcontroller.vdf"
    with open(path, "r") as f:
        data = vdf.load(f)
    return data

def desasignar_trackpads(app_id):
    config = load_steamcontroller_config()
    sets = config.get("controller_configurations", {})
    if app_id not in sets:
        print("No hay configuración para este juego.")
        return

    set_actual = sets[app_id]
    # Aquí modificamos solo los campos de los trackpads
    set_actual["trackpad_left"] = "none"
    set_actual["trackpad_left_click"] = "none"
    set_actual["trackpad_right"] = "none"
    set_actual["trackpad_right_click"] = "none"

    # Guardamos el archivo modificado
    with open("/home/deck/.steam/steam/config/steamcontroller.vdf", "w") as f:
        f.write(vdf.dumps(config))
