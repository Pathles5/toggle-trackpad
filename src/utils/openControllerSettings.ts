// utils/openControllerSettings.ts
import { toaster } from "@decky/api";
import { EUIComposition } from "@decky/ui";

export function openControllerSettings(appId: string) {
  const ov = SteamClient.Overlay;
  if (!ov) {
    toaster.toast({
      title: "Overlay no disponible",
      body: "No se encontró la API de Steam Overlay.",
      duration: 3000,
      critical: true,
    });
    return;
  }

  // 1) Abrir el configurador de Steam Input para el juego activo
  ov.HandleProtocolForOverlayBrowser(
    Number(appId),
    "steam://open/controller_configuration"
  );

  // 2) Forzar la superposición en primer plano usando el enum ‘Overlay’
  ov.SetOverlayState(appId, EUIComposition.Overlay);
}
