// import * as DeckyUI from "@decky/ui/dist/globals/steam-client/User";
import "@decky/ui";


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
