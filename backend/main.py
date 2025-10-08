import logging
import subprocess
from decky_plugin import Plugin

class Plugin:
    async def activate(self):
        logging.info("Activando preset...")
        subprocess.run(["python3", "/home/deck/.local/share/decky-loader/plugins/my-controller-plugin/backend/on.py"])

    async def restore(self):
        logging.info("Restaurando preset...")
        subprocess.run(["python3", "/home/deck/.local/share/decky-loader/plugins/my-controller-plugin/backend/off.py"])
