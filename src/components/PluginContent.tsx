import { useEffect, useState } from "react";
import { PanelSection, PanelSectionRow, ToggleField } from "@decky/ui";
import { call } from "@decky/api";

const PluginContent = () => {
  const [enabled, setEnabled] = useState(false);
  const [runningGame, setRunningGame] = useState<string | null>(null);

  // Al montar el plugin, obtener estado del toggle y juego activo
  useEffect(() => {
    const fetchInitialState = async () => {
      try {
        const state = await call<[], boolean>("get_state");
        setEnabled(state);

        const game = await call<[], {
          running: boolean;
          name: string | null;
          appid: number | null;
        }>("get_running_game");
        if (game.running) {
          setRunningGame(`${game.name} (AppID: ${game.appid})`);
        } else {
          setRunningGame("Ningún juego en ejecución");
        }
      } catch (error) {
        console.error("Error al obtener estado inicial:", error);
        setRunningGame("Error al consultar juego");
      }
    };

    fetchInitialState();
  }, []);

  useEffect(() => {
    const fetchState = async () => {
      try {
        const state = await call<[], boolean>("get_state");
        setEnabled(state);
      } catch (error) {
        console.error("Error al obtener el estado:", error);
      }
    };
    fetchState();
  }, []);

  const toggleOn = async () => {
    console.log("Desactivando Trackpad...");
    // aquí tu lógica de encendido
    try {
      await call("activate");
      setEnabled(true);
      console.log("Trackpad Desactivado!");
    } catch (error) {
      console.error("Error al deshabilitar el trackpad:", error);
    }

  };

  const toggleOff = async () => {
    console.log("Restaurando Trackpads...");
    // aquí tu lógica de apagado
    try {
      await call("restore");
      setEnabled(false);
      console.log("Trackpads Restaurandos!!!");
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

export default PluginContent;
