import { definePlugin } from "@decky/ui";
import { FaGamepad } from "react-icons/fa";
import PluginContent from "./components/PluginContent";
import * as DeckyUI from "@decky/ui";

console.log("[Decky UI] Available exports:", DeckyUI);

export default definePlugin(() => {
  return {
    title: <div>Toggle Trackpad</div>,
    content: <PluginContent />,
    icon: <FaGamepad />,
  }
})
