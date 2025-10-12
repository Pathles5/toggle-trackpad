import { useEffect, useState } from "react";
import { PanelSection, PanelSectionRow, ToggleField, Router, AppOverview } from "@decky/ui";
import { call } from "@decky/api";

type PluginState = {
  enabled: boolean;
  state: boolean;
};

const formatGameLabel = (game?: AppOverview | null): String => {
  if (!game) return "No game running";
  const { appid, display_name } = game;
  if (appid != null) return `${display_name ?? "Unknown"} (AppID: ${appid})`;
  return "Game running but not correctly identified";
};

const PluginContent = () => {
  const [toggleEnabled, setToggleEnabled] = useState(false);
  const [toggleState, setToggleState] = useState(false);
  const [accountId, setAccountId] = useState<string | null>(null);
  const [language, setLanguage] = useState<string | null>(null);
  const [game, setGame] = useState<AppOverview | null>(null);

  useEffect(() => {
    const fetchState = async () => {
      try {
        const id = await SteamClient.WebChat.GetCurrentUserAccountID();
        const lang = await SteamClient.Settings.GetCurrentLanguage();
        setAccountId(id?.toString());
        setLanguage(lang);
      } catch (err) {
        console.error("Error fetching SteamClient data:", err);
      }

      const app = Router.MainRunningApp;
      if (app?.appid && app?.display_name) {
        setGame(app);
      }
      // else{ // TODO por evaluar si hace falta al pasar a game > no-sgame
      //   setGame(null);
      // }

      try {
        const state: PluginState = await Promise.resolve(
          call<[], PluginState>("get_state"),
        );
        setToggleEnabled(state.enabled);
        setToggleState(state.state);
      } catch (error) {
        console.error("[Toggle Trackpad] Error fetching state:", error);
        setToggleEnabled(false);
        setToggleState(false);
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
          <strong>Active game:</strong> {formatGameLabel(game)}
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
          <div>AppID (Router): {game?.appid ?? "N/A"}</div>
          <div>App Name: {game?.display_name ?? "N/A"}</div>
          <div>Account ID: {accountId ?? "N/A"}</div>
          <div>Language: {language ?? "N/A"}</div>
        </div>
      </PanelSectionRow>
    </PanelSection>
  );
};

export default PluginContent;
