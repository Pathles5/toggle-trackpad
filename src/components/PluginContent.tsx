import { PanelSection, PanelSectionRow, ToggleField } from "@decky/ui";
import { useState } from "react";
import { call } from "@decky/api";

const PluginContent = () => {
  const [enabled, setEnabled] = useState(false);

  const toggleOn = async () => {
    console.log("Desactivando Trackpad...");
    // aquí tu lógica de encendido
    try {
        await call("activate", { enable: true });
        console.log("Trackpad Desactivado!");
    } catch (error) {
        console.error("Error al deshabilitar el trackpad:", error);        
    }
    
};

const toggleOff = async () => {
    console.log("Restaurando Trackpads...");
    // aquí tu lógica de apagado
    try {
        await call("restore", { enable: false });
        console.log("Trackpads Restaurandos!!!");
    } catch (error) {
        console.error("Error al restaurar el trackpad:", error);        
    }
  };

  return (
    <PanelSection title="Opciones">
      <PanelSectionRow>
        <ToggleField
          label="Desactivar Trackpad"
          checked={enabled}
          onChange={(val: boolean) => {
            setEnabled(val);
            if (val) {
              toggleOn();
            } else {
              toggleOff();
            }
          }}
        />
      </PanelSectionRow>
    </PanelSection>
  );
};
export default PluginContent;