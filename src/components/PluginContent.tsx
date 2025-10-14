import { useEffect, useState } from "react";
import { PanelSection, PanelSectionRow, ToggleField, Router } from "@decky/ui";
import { call } from "@decky/api";

type Game = {
  appid: string;
  display_name: string;
};

type TogglePayload = [accountId: string | null, game: Game | null, val: boolean];

type PluginState = {
  enabled: boolean;
  state: boolean;
  msg: string;
};

const formatGameLabel = (game?: Game | null): string => {
  if (!game) return "No game running";
  const { appid, display_name } = game;
  if (appid != null) return `${display_name ?? "Unknown"} (AppID: ${appid})`;
  return "Game running but not correctly identified";
};

const PluginContent = () => {
  const [toggleState, setToggleState] = useState(false);
  const [accountId, setAccountId] = useState<string | null>(null);
  const [language, setLanguage] = useState<string | null>(null);
  const [game, setGame] = useState<Game | null>(null);

  // Fetch Steam info, current game, and run controller mapping tests
  useEffect(() => {
    const fetchSteamInfo = async () => {
      try {
        // ——— Aquí empezamos las pruebas ———
        console.log(
          "🔍 Overlay API:",
          Object.entries(SteamClient.Overlay || {}).map(
            ([k, v]) => `${k}: ${typeof v}`
          )
        );

        const controllerIndex = 0;
        console.log(
          `🚀 Testing GetControllerMappingString(${controllerIndex})…`
        );

        if (SteamClient.Input?.GetControllerMappingString) {
          const response = await SteamClient.Input.GetControllerMappingString(
            controllerIndex
          );
          console.log("✅ response (raw):", response);
          console.log("✅ response (object):", { response });
          console.log("✅ typeof response:", typeof response);
        } else {
          console.warn(
            "⚠️ SteamClient.Input.GetControllerMappingString not available"
          );
        }
        // ——— Aquí acaban las pruebas ———

        const id = await SteamClient.WebChat.GetCurrentUserAccountID();
        const lang = await SteamClient.Settings.GetCurrentLanguage();
        setAccountId(id.toString());
        setLanguage(lang);
      } catch (err) {
        console.error("Error fetching SteamClient data:", err);
      }

      const app = Router.MainRunningApp;
      if (app?.appid && app?.display_name) {
        setGame(app);
      }
    };

    fetchSteamInfo();
  }, []);

  // Fetch plugin state when game changes
  useEffect(() => {
    if (!game) return;

    const fetchState = async () => {
      try {
        const state: PluginState = await call<[Game | null], PluginState>(
          "get_state",
          game
        );
        setToggleState(state.state);
      } catch (error) {
        console.error("[Toggle Trackpad] Error fetching state:", error);
        setToggleState(false);
      }
    };

    fetchState();
  }, [game]);

  const handleToggle = async (val: boolean) => {
    try {
      const toggleState = await call<
        TogglePayload,
        { status: string; enabled: boolean }
      >("toggle_trackpad", accountId, game, val);
      console.log("🔄 toggleTrackpad result:", toggleState);
      setToggleState(val);
    } catch (error) {
      console.error(`[Toggle Trackpad] Error toggling:`, error);
      throw error;
    }
  };

  return (
    <PanelSection title="Options">
      <PanelSectionRow>
        <div>
          <strong>Active game:</strong> {formatGameLabel(game)}
        </div>
      </PanelSectionRow>
      <PanelSectionRow>
        <ToggleField
          label="Disable Trackpad"
          checked={toggleState}
          onChange={handleToggle}
          disabled={!game}
        />
      </PanelSectionRow>
      <PanelSectionRow>
        <div style={{ fontSize: "0.9em", opacity: 0.7 }}>
          <div>Account ID: {accountId ?? "Loading..."}</div>
          <div>Language: {language ?? "Loading..."}</div>
        </div>
      </PanelSectionRow>
    </PanelSection>
  );
};

export default PluginContent;
