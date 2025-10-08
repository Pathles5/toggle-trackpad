import { definePlugin, PanelSection, PanelSectionRow } from "@decky/ui";
import { FaGamepad } from "react-icons/fa";
import ToggleButton from "./components/ToggleButton";


export default definePlugin(() => {
  return {
    title: <div className="title">Controller Preset Manager</div>,
    content: (
      <PanelSection title="Controller Preset">
        <PanelSectionRow>
          <ToggleButton label="Activar Backup" backendMethod="activate"/>
          <ToggleButton label="Restaurar Default" backendMethod="restore" />
        </PanelSectionRow>
      </PanelSection>
    ),
    icon: <FaGamepad />,
  };
});
