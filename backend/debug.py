import decky

def printDeckyConstants():
    try:
        pyi_path = getattr(decky, "__file__", None)
        if pyi_path and pyi_path.endswith(".pyi"):
            with open(pyi_path, "r", encoding="utf-8") as f:
                contents = f.read()
            const_names = re.findall(r'^\s*([A-Z][A-Z0-9_]+)\s*[:=]', contents, flags=re.M)
            seen = set()
            for name in const_names:
                if name in seen:
                    continue
                seen.add(name)
                try:
                    value = getattr(decky, name)
                except Exception:
                    value = "<no attribute>"
                decky.logger.info(f"{name}: {value}")
        else:
            decky.logger.info("No se encontró un archivo .pyi para decky")
    except Exception as e:
        decky.logger.error(f"Error al listar constantes de decky.pyi: {e}")