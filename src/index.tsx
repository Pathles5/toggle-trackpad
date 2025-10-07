import { definePlugin, ToggleField, PanelSection, PanelSectionRow } from "decky-frontend-lib";
import { useState } from "react";

export default definePlugin(() => {
  const [enabled, setEnabled] = useState(true);

  const toggleTrackpads = async () => {
    setEnabled(!enabled);
    await fetch(`/plugin/toggle-trackpad/toggle`, {
      method: "POST",
      body: JSON.stringify({ enabled: !enabled }),
    });
  };

  return (
    <PanelSection title="Trackpads">
      <PanelSectionRow>
        <ToggleField
          label="Activar trackpads"
          checked={enabled}
          onChange={toggleTrackpads}
        />
      </PanelSectionRow>
    </PanelSection>
  );
});
