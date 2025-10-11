import { useEffect, useState } from "react";
import { PanelSection, PanelSectionRow, ToggleField } from "@decky/ui";
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
    </PanelSection>
  );
};

export default PluginContent;
