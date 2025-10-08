import { definePlugin, PanelSection, PanelSectionRow, ToggleField } from "decky-frontend-lib";
import { FaGamepad } from "react-icons/fa";
import { useState } from "react";

export default definePlugin(() => {
  const [enabled, setEnabled] = useState(false);

  return {
    title: <div className="title">Toggle Trackpad</div>,
    content: (
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
    ),
    icon: <FaGamepad />,
  };
});
