import { definePlugin } from "@decky/ui";
import { FaGamepad } from "react-icons/fa";
import PluginContent from "./components/PluginContent";
import { DeckyDictationLogic } from "./components/decky-dict-class";

export default definePlugin(() => {

  let logic = new DeckyDictationLogic();
  let input_register = window.SteamClient.Input.RegisterForControllerStateChanges(logic.handleButtonInput);
  console.log("input_register");
  console.log(input_register);
  return {
    title: <div>Toggle Trackpad</div>,
    content: <PluginContent />,
    icon: <FaGamepad />,
  }
})
