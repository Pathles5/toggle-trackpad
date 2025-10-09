import { useEffect, useState } from "react";
import { PanelSection, PanelSectionRow, ToggleField } from "@decky/ui";
import { call } from "@decky/api";

const PluginContent = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fetchState = async () => {
      try {
        const state = await call<[],boolean>("get_state");
        setEnabled(state);
      } catch (error) {
        console.error("Error al obtener el estado:", error);
      }
    };
    fetchState();
  }, []);

  const toggleOn = async () => {
    await call("activate");
    setEnabled(true);
  };

  const toggleOff = async () => {
    await call("restore");
    setEnabled(false);
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
