import { definePlugin } from "@decky/ui";
import { FaGamepad } from "react-icons/fa";
import PluginContent from "./components/PluginContent";

import * as DeckyUI from "@decky/ui/dist/globals/steam-client/User";
import "@decky/ui";

console.log("[Decky UI] Available exports:", DeckyUI);
// console.log("[Decky UI] Available exports:", AppOverview);
// console.log("SteamClient.Apps.StreamGame:"+SteamClient.Apps.StreamGame) //Stremear game:     (appId: number, clientId: string, param2: number): void;?
// console.log("SteamClient.Apps.ShowControllerConfigurator:"+SteamClient.Apps.ShowControllerConfigurator) // (appId: number): void;
// console.log("SteamClient.Input.DuplicateControllerConfigurationSourceMode:"+SteamClient.Input.DuplicateControllerConfigurationSourceMode) // ??
// console.log("SteamClient.Input.ExportCurrentControllerConfiguration:"+SteamClient.Input.ExportCurrentControllerConfiguration) // depend appId
// console.log("SteamClient.Input.PreviewConfigForAppAndController:"+SteamClient.Input.PreviewConfigForAppAndController) // depend appId
// console.log("SteamClient.Input.RegisterForShowControllerLayoutPreviewMessages:"+SteamClient.Input.RegisterForShowControllerLayoutPreviewMessages)
// console.log("SteamClient.Input.RegisterForUnboundControllerListChanges:"+SteamClient.Input.RegisterForUnboundControllerListChanges)
// console.log("SteamClient.Input.ResetControllerBindings:"+SteamClient.Input.ResetControllerBindings)
// console.log("SteamClient.Input.SaveEditingControllerConfiguration:"+SteamClient.Input.SaveEditingControllerConfiguration)
// console.log("SteamClient.Input.SetControllerPersonalizationSetting:"+SteamClient.Input.SetControllerPersonalizationSetting)
// console.log("SteamClient.Input.SetEditingControllerConfigurationActionSet:"+SteamClient.Input.SetEditingControllerConfigurationActionSet)
// console.log("SteamClient.Input.SetEditingControllerConfigurationInputBinding:"+SteamClient.Input.SetEditingControllerConfigurationInputBinding)

console.log("SteamClient.Input.ShowControllerSettings:")
console.log(SteamClient.Input.ShowControllerSettings())

console.log("SteamClient.Auth.GetMachineID:" )
console.log(await SteamClient.Auth.GetMachineID())
console.log("SteamClient.Settings.GetAccountSettings:")
console.log(await SteamClient.Settings.GetAccountSettings()) //Promise<AccountSettings>
console.log("SteamClient.System.GetSystemInfo:")
console.log(await SteamClient.System.GetSystemInfo()) // Promise<SystemInfo>
console.log("await SteamClient.User.GetLoginUsers():")
console.log(await SteamClient.User.GetLoginUsers()) //  Promise<LoginUser[]>;

//Get current user account ID:
console.log("SteamClient.WebChat.GetCurrentUserAccountID:"+await SteamClient.WebChat.GetCurrentUserAccountID())
//Get current language: spanish
console.log("SteamClient.Settings.GetCurrentLanguage:"+await SteamClient.Settings.GetCurrentLanguage())

export default definePlugin(() => {

  return {
    title: <div>Toggle Trackpad</div>,
    content: <PluginContent />,
    icon: <FaGamepad />,
  }
})
