import logging
import subprocess
# from decky_plugin import Plugin
import decky

class Plugin:
    async def _main(self):
        decky.logger.info(" - - - - Framegen plugin loaded")

    async def _unload(self):
        decky.logger.info(" - - - - Framegen plugin unloaded.")

    async def activate(self):
        decky.logger.info("Modificando preset...")
        logging.info("Modificando preset...")
        print("Modificando preset...")
        subprocess.run(["python3", "/home/deck/homebrew/plugins/Toggle-Trackpad/backend/on.py"])

    async def restore(self):
        logging.info("Restaurando preset...")
        subprocess.run(["python3", "/home/deck/homebrew/plugins/Toggle-Trackpad/backend/off.py"])
