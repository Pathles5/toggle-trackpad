import { PanelSection, PanelSectionRow, ToggleField } from "@decky/ui";
import { useState } from "react";
import { call } from "@decky/api";

const PluginContent = () => {
  const [enabled, setEnabled] = useState(false);

  const toggleOn = async () => {
    console.log("Desactivando Trackpad...");
    // aquí tu lógica de encendido
    try {
      await call("activate");
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
      console.log("Trackpads Restaurandos!!!");
    } catch (error) {
      console.error("Error al restaurar el trackpad:", error);
    }
  };

  const handleToggle = (val: boolean) => {
    setEnabled(val);
    if (val) {
      toggleOn();
    } else {
      toggleOff();
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