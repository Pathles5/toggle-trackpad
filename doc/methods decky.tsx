// import * as DeckyUI from "@decky/ui/dist/globals/steam-client/User";
import "@decky/ui";
import { EDisplayStatus } from "@decky/ui/dist/globals/steam-client/App";


console.log("SteamClient.Input.ShowControllerSettings:")
console.log(SteamClient.Input.ShowControllerSettings())

console.log("SteamClient.Auth.GetMachineID:" )
console.log(await SteamClient.Auth.GetMachineID())

// Nombre de la cuenta
console.log("await SteamClient.User.GetLoginUsers():")
console.log(await SteamClient.User.GetLoginUsers()) //  Promise<LoginUser[]>;
// Datos de la cuenta como correo y otrascosas pero useless
console.log("SteamClient.Settings.GetAccountSettings:")
console.log(await SteamClient.Settings.GetAccountSettings()) //Promise<AccountSettings>
// eSTO NETAMENTE DATOS DEL SISTEMA: os, RAM VIDEO...
console.log("SteamClient.System.GetSystemInfo:")
console.log(await SteamClient.System.GetSystemInfo()) // Promise<SystemInfo>
//Get current user account ID:
console.log("SteamClient.WebChat.GetCurrentUserAccountID:"+await SteamClient.WebChat.GetCurrentUserAccountID())
//Get current language: spanish
console.log("SteamClient.Settings.GetCurrentLanguage:"+await SteamClient.Settings.GetCurrentLanguage())

import { Router } from "@decky/ui";
export type AppOverview = {
    appid: string;
    display_name: string;
    display_status: EDisplayStatus;
    sort_as: string;
}
console.log("Router.MainRunningApp")
console.log(Router.MainRunningApp) // AppOverview
console.log("Router.RunningApps")
console.log(Router.RunningApps) // AppOverview[]
