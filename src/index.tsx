import { definePlugin, Router } from "@decky/ui";
import { FaGamepad } from "react-icons/fa";
import PluginContent from "./components/PluginContent";

import "@decky/ui";

console.log("Router.MainRunningApp")
console.log(Router.MainRunningApp)
console.log("Router.RunningApps")
console.log(Router.RunningApps)
console.log("await SteamClient.InstallFolder.GetInstallFolders()")
console.log(await SteamClient.InstallFolder.GetInstallFolders())

export default definePlugin(() => {

  return {
    title: <div>Toggle Trackpad</div>,
    content: <PluginContent />,
    icon: <FaGamepad />,
  }
})
