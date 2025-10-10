import { useEffect, useState } from "react";
import { PanelSection, PanelSectionRow, ToggleField } from "@decky/ui";
import { call } from "@decky/api";

const PluginContent = () => {
  const [enabled, setEnabled] = useState(false);
  const [runningGame, setRunningGame] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [state, game] = await Promise.all([
          call<[], boolean>("get_state"),
          call<[], {
            running: boolean;
            name: string | null;
            appid: number | null;
          }>("detect_game")
        ]);

        setEnabled(state);
        log(`Estado inicial del juego: ${JSON.stringify(game)}`);

        if (game.running) {
          log(`Juego activo: ${game.name} (AppID: ${game.appid})`);
          if (game.appid) {
            setRunningGame(`${game.name} (AppID: ${game.appid})`);
          } else {
            log("Juego activo pero no identificado correctamente");
            setRunningGame("Juego activo no identificado correctamente");
          }
        } else {
          setRunningGame("Ningún juego en ejecución");
        }
      } catch (error) {
        console.error("Error al obtener estado inicial:", error);
        setRunningGame("Error al consultar juego");
      }
    };

    fetchInitialData();
  }, []);

  const toggleOn = async () => {
    log("Desactivando Trackpad...");
    try {
      await call("activate");
      setEnabled(true);
      log("Trackpad Desactivado!");
    } catch (error) {
      console.error("Error al deshabilitar el trackpad:", error);
    }
  };

  const toggleOff = async () => {
    log("Restaurando Trackpads...");
    try {
      await call("restore");
      setEnabled(false);
      log("Trackpads Restaurados!!!");
    } catch (error) {
      console.error("Error al restaurar el trackpad:", error);
    }
  };

  const handleToggle = async (val: boolean) => {
    if (val) {
      await toggleOn();
    } else {
      await toggleOff();
    }
  };

  return (
    <PanelSection title="Opciones">
      <PanelSectionRow>
        <div>
          <strong>Juego activo:</strong> {runningGame}
        </div>
      </PanelSectionRow>
      <PanelSectionRow>
        <ToggleField
          label="Desactivar Trackpad"
          checked={enabled}
          onChange={handleToggle}
        />
      </PanelSectionRow>
    </PanelSection>
  );
};

const log = (str: String) => console.log(`[Toggle Trackpad] ${str}`);

export default PluginContent;
