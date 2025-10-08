import { FC } from "react";
import { ButtonItem, PanelSectionRow } from "decky-frontend-lib";

interface ToggleButtonProps {
  label: string;
  backendMethod: string;
}

const ToggleButton: FC<ToggleButtonProps> = ({ label, backendMethod }) => {
  const handleClick = async () => {
    try {
      await deckyPlugin.callBackendMethod(backendMethod);
    } catch (err) {
      console.error(`Error llamando a ${backendMethod}:`, err);
    }
  };

  return (
    <PanelSectionRow>
      <ButtonItem layout="below" onClick={handleClick}>
        {label}
      </ButtonItem>
    </PanelSectionRow>
  );
};

export default ToggleButton;
