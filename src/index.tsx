import { definePlugin } from "@decky/api";
import { PanelSection, PanelSectionRow, ToggleField } from "@decky/ui";
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
    name: "Toggle Trackpad",
    title: <div className="title">Toggle Trackpad</div>,
    content: <ToggleDemo />,
    icon: <FaGamepad />,
  };
});
