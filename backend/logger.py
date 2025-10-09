import decky

def log(msg: str):
    decky.logger.info(f"[Toggle Trackpad] {msg}")

def log_error(msg: str):
    decky.logger.error(f"[Toggle Trackpad] {msg}","color: orange; font-weight: bold")

def log_warn(msg: str):
    decky.logger.warning(f"[Toggle Trackpad] {msg}","color: yellow; font-weight: bold")

def log_info(msg: str):
    print(f"[Toggle Trackpad](print) {msg}","color: cyan")
    decky.logger.info(f"[Toggle Trackpad](dck.log.info.f) {msg}","color: cyan")
    
def log_debug(msg: str):
    decky.logger.debug(f"[Toggle Trackpad] {msg}","color: green")