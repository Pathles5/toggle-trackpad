import subprocess
from decky_plugin import Plugin

class Plugin(Plugin):
    def enable_trackpads(self):
        subprocess.run(["xinput", "enable", "ID_IZQUIERDO"])
        subprocess.run(["xinput", "enable", "ID_DERECHO"])

    def disable_trackpads(self):
        subprocess.run(["xinput", "disable", "ID_IZQUIERDO"])
        subprocess.run(["xinput", "disable", "ID_DERECHO"])

    async def toggle(self, enabled: bool):
        if enabled:
            self.enable_trackpads()
        else:
            self.disable_trackpads()
        return {"status": "ok"}
