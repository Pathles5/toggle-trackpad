import { FC } from "react";
import { ButtonItem } from "@decky/ui";
import { call } from "@decky/api";

interface ToggleButtonProps {
  label: string;
  backendMethod: string;
}

const ToggleButton: FC<ToggleButtonProps> = ({ label, backendMethod }) => {
  const handleClick = async () => {
    try {
      await call(backendMethod, {});
    } catch (err) {
      console.error(`Error llamando a ${backendMethod}:`, err);
    }
  };

  return (
    <>
      <ButtonItem layout="below" onClick={handleClick} label={label} />
    </>
  );
};

export default ToggleButton;
