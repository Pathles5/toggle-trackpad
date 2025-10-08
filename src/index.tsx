import { definePlugin } from "@decky/ui";
import { PanelSection, PanelSectionRow } from "@decky/ui";
import { FaGamepad } from "react-icons/fa";

export default definePlugin(() => {
  return {
    title: <div className="title">Toggle Trackpad</div>,
    content: 
    <PanelSection title="Demo">
      <PanelSectionRow>
        PANeL
      </PanelSectionRow>
    </PanelSection>,
    icon: <FaGamepad />,
  };
});
