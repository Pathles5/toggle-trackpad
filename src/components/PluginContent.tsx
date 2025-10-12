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
  const [accountId, setAccountId] = useState<String | null>(null);
  const [language, setLanguage] = useState<String | null>(null);
  const [game, setGame] = useState<AppOverview | null>(null);
  console.log(toggleEnabled);

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
      await call<[accountId: String | null, language: String | null, appid: object | null], { status: string; enabled: boolean }>(
        val ? "activate" : "restore",
        accountId,
        language,
        game
      );
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
          disabled={!game}
        />
      </PanelSectionRow>
    </PanelSection>
  );
};

export default PluginContent;
