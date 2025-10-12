import { definePlugin } from "@decky/ui";
import { FaGamepad } from "react-icons/fa";
import PluginContent from "./components/PluginContent";

import * as DeckyUI from "@decky/ui/dist/globals/steam-client/User";
import "@decky/ui";

console.log("[Decky UI] Available exports:", DeckyUI);
// console.log("[Decky UI] Available exports:", AppOverview);
console.log("SteamClient.Apps.StreamGame:"+SteamClient.Apps.StreamGame)
console.log("SteamClient.Apps.ShowControllerConfigurator:"+SteamClient.Apps.ShowControllerConfigurator)
console.log("SteamClient.Auth.GetMachineID:"+SteamClient.Auth.GetMachineID)
console.log("SteamClient.Input.DuplicateControllerConfigurationSourceMode:"+SteamClient.Input.DuplicateControllerConfigurationSourceMode)
console.log("SteamClient.Input.ExportCurrentControllerConfiguration:"+SteamClient.Input.ExportCurrentControllerConfiguration)
console.log("SteamClient.Input.PreviewConfigForAppAndController:"+SteamClient.Input.PreviewConfigForAppAndController)
console.log("SteamClient.Input.RegisterForShowControllerLayoutPreviewMessages:"+SteamClient.Input.RegisterForShowControllerLayoutPreviewMessages)
console.log("SteamClient.Input.RegisterForUnboundControllerListChanges:"+SteamClient.Input.RegisterForUnboundControllerListChanges)
console.log("SteamClient.Input.ResetControllerBindings:"+SteamClient.Input.ResetControllerBindings)
console.log("SteamClient.Input.SaveEditingControllerConfiguration:"+SteamClient.Input.SaveEditingControllerConfiguration)
console.log("SteamClient.Input.SetControllerPersonalizationSetting:"+SteamClient.Input.SetControllerPersonalizationSetting)
console.log("SteamClient.Input.SetEditingControllerConfigurationActionSet:"+SteamClient.Input.SetEditingControllerConfigurationActionSet)
console.log("SteamClient.Input.SetEditingControllerConfigurationInputBinding:"+SteamClient.Input.SetEditingControllerConfigurationInputBinding)
console.log("SteamClient.Input.ShowControllerSettings:"+SteamClient.Input.ShowControllerSettings)

console.log("SteamClient.Settings.GetAccountSettings:"+SteamClient.Settings.GetAccountSettings)
console.log("SteamClient.Settings.GetCurrentLanguage:"+SteamClient.Settings.GetCurrentLanguage)
console.log("SteamClient.System.GetSystemInfo:"+SteamClient.System.GetSystemInfo)
console.log("SteamClient.User:"+SteamClient.User)
console.log("SteamClient.WebChat.GetCurrentUserAccountID:"+SteamClient.WebChat.GetCurrentUserAccountID)

export default definePlugin(() => {

  return {
    title: <div>Toggle Trackpad</div>,
    content: <PluginContent />,
    icon: <FaGamepad />,
  }
})
