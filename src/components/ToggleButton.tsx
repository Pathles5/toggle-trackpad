import { FC } from "react";
import { ButtonItem, PanelSectionRow, ServerAPI } from "decky-frontend-lib";

interface ToggleButtonProps {
  label: string;
  backendMethod: string;
  serverAPI: ServerAPI;
}

const ToggleButton: FC<ToggleButtonProps> = ({ label, backendMethod, serverAPI }) => {
  const handleClick = async () => {
    try {
      await serverAPI.callPluginMethod(backendMethod, {});
    } catch (err) {
      console.error(`Error llamando a ${backendMethod}:`, err);
    }
  };

  return (
    <PanelSectionRow>
      <ButtonItem layout="below" onClick={handleClick} label={label} />
    </PanelSectionRow>
  );
};

export default ToggleButton;
