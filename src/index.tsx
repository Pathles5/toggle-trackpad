import { definePlugin, PanelSection, PanelSectionRow, ToggleField } from "decky-frontend-lib";
import { FaGamepad } from "react-icons/fa";
import { useState } from "react";

const ToggleDemo = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <PanelSection title="Demo">
      <PanelSectionRow>
        <ToggleField
          label="Activar Trackpad"
          checked={enabled}
          onChange={(val: boolean) => {
            setEnabled(val);
            console.log("Toggle cambiado:", val);
          }}
        />
      </PanelSectionRow>
    </PanelSection>
  );
};

export default definePlugin(() => {
  return {
    title: <div className="title">Toggle Trackpad</div>,
    content: <ToggleDemo />,   // 👈 aquí usamos el componente
    icon: <FaGamepad />,
  };
});
