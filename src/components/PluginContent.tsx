import { useEffect, useState } from "react";
import { PanelSection, PanelSectionRow, ToggleField, Router } from "@decky/ui";
import { call } from "@decky/api";

type GameDetection = {
  running: boolean;
  name: string | null;
  appid: number | null;
};

type PluginState = {
  enabled: boolean;
  state: boolean;
};

const PluginContent = () => {
  const [toggleEnabled, setToggleEnabled] = useState(false);
  const [toggleState, setToggleState] = useState(false);
  const [gameLabel, setGameLabel] = useState("Checking...");
  const [accountId, setAccountId] = useState<string | null>(null);
  const [language, setLanguage] = useState<string | null>(null);
  const [appId, setAppId] = useState<string | null>(null);
  const [appName, setAppName] = useState<string | null>(null);

  useEffect(() => {
    const fetchState = async () => {
      try {
        const [state, game]: [PluginState, GameDetection] = await Promise.all([
          call<[], PluginState>("get_state"),
          call<[], GameDetection>("detect_game")
        ]);

        setToggleEnabled(state.enabled);
        setToggleState(state.state);

        if (game?.running) {
          setGameLabel(
            game.appid
              ? `${game.name} (AppID: ${game.appid})`
              : "Game running but not correctly identified"
          );
        } else {
          setGameLabel("No game running");
        }
      } catch (error) {
        console.error("[Toggle Trackpad] Error fetching state:", error);
        setGameLabel("Error querying game");
        setToggleEnabled(false);
        setToggleState(false);
      }

      // Nuevos datos desde el frontend
      const app = Router.MainRunningApp;
      console.log("Router.MainRunningApp:", app);
      if (app?.appid && app?.display_name) {
        setAppId(app.appid);
        setAppName(app.display_name);
      }

      try {
        const id = await SteamClient.WebChat.GetCurrentUserAccountID();
        const lang = await SteamClient.Settings.GetCurrentLanguage();
        console.log("SteamClient.WebChat.GetCurrentUserAccountID:", id);
        console.log("SteamClient.Settings.GetCurrentLanguage:", lang);
        setAccountId(id?.toString());
        setLanguage(lang);
      } catch (err) {
        console.error("Error fetching SteamClient data:", err);
      }
    };

    fetchState();
  }, []);

  const handleToggle = async (val: boolean) => {
    try {
      await call<[], { status: string; enabled: boolean }>(val ? "activate" : "restore");
      setToggleState(val);
    } catch (error) {
      console.error(`[Toggle Trackpad] Error toggling:`, error);
    }
  };

  return (
    <PanelSection title="Options">
      <PanelSectionRow>
        <div>
          <strong>Active game:</strong> {gameLabel}
        </div>
      </PanelSectionRow>
      <PanelSectionRow>
        <ToggleField
          label="Disable Trackpad"
          checked={toggleState}
          onChange={handleToggle}
          disabled={!toggleEnabled}
        />
      </PanelSectionRow>
      <PanelSectionRow>
        <div style={{ fontSize: "0.9em", opacity: 0.7 }}>
          <div>AppID (Router): {appId ?? "N/A"}</div>
          <div>App Name: {appName ?? "N/A"}</div>
          <div>Account ID: {accountId ?? "N/A"}</div>
          <div>Language: {language ?? "N/A"}</div>
        </div>
      </PanelSectionRow>
    </PanelSection>
  );
};

export default PluginContent;
