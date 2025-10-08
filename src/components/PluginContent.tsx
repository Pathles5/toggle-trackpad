import { PanelSection, PanelSectionRow, ToggleField } from "@decky/ui";
import { useState } from "react";

const PluginContent = () => {
  const [enabled, setEnabled] = useState(false);

  const toggleOn = () => {
    console.log("Trackpad activado");
    // aquí tu lógica de encendido
  };

  const toggleOff = () => {
    console.log("Trackpad desactivado");
    // aquí tu lógica de apagado
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