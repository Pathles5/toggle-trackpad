import { definePlugin, PanelSection } from "decky-frontend-lib";
import { FaGamepad } from "react-icons/fa";
import ToggleButton from "./components/ToggleButton";

export default definePlugin((serverAPI) => {
  return {
    title: <div className="title">Controller Preset Manager</div>,
    content: (
      <PanelSection title="Controller Preset">
        {/* 👇 Aquí el cambio: pasamos serverAPI como prop */}
        <ToggleButton label="Activar Backup" backendMethod="activate" serverAPI={serverAPI} />
        <ToggleButton label="Restaurar Default" backendMethod="restore" serverAPI={serverAPI} />
      </PanelSection>
    ),
    icon: <FaGamepad />,
  };
});
