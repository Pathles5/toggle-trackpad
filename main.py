import logging
import subprocess
from decky_plugin import Plugin

class Plugin:
    async def _main(self):
        decky_plugin.logger.info(" - - - - Framegen plugin loaded")

    async def _unload(self):
        decky_plugin.logger.info(" - - - - Framegen plugin unloaded.")

    async def activate(self):
        logging.info("Modificando preset...")
        print("Modificando preset...")
        subprocess.run(["python3", "/home/deck/homebrew/plugins/Toggle-Trackpad/backend/on.py"])

    async def restore(self):
        logging.info("Restaurando preset...")
        subprocess.run(["python3", "/home/deck/homebrew/plugins/Toggle-Trackpad/backend/off.py"])
