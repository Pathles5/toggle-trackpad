import { definePlugin, PanelSection } from "decky-frontend-lib";
import { FaGamepad } from "react-icons/fa";
import ToggleButton from "./components/ToggleButton";

export default definePlugin(() => {
  return {
    title: <div className="title">Controller Preset Manager</div>,
    content: (
      <PanelSection title="Controller Preset">
        <ToggleButton label="Activar Backup" backendMethod="activate" />
        <ToggleButton label="Restaurar Default" backendMethod="restore" />
      </PanelSection>
    ),
    icon: <FaGamepad />,
  };
});
