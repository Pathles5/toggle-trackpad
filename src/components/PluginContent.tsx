import { useEffect, useState } from "react";
import { PanelSection, PanelSectionRow, ToggleField } from "@decky/ui";
import { call } from "@decky/api";

const PluginContent = () => {
  const [enabled, setEnabled] = useState(false);
  const [runningGame, setRunningGame] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [state, game] = await Promise.all([
          call<[], boolean>("get_state"),
          call<[], {
            running: boolean;
            name: string | null;
            appid: number | null;
          }>("detect_game")
        ]);

        setEnabled(state);
        log(`Initial game state: ${JSON.stringify(game)}`);

        if (game && game.running) {
          log(`Active game: ${game.name} (AppID: ${game.appid})`);
          if (game.appid) {
            setRunningGame(`${game.name} (AppID: ${game.appid})`);
          } else {
            log("Game is running but not correctly identified");
            setRunningGame("Game running but not correctly identified");
          }
        } else {
          setRunningGame("No game running");
        }
      } catch (error) {
        console.error("Error fetching initial state:", error);
        setRunningGame("Error querying game");
      }
    };

    fetchInitialData();
  }, []);

  const toggleOn = async () => {
    log("Disabling trackpad...");
    try {
      await call("activate");
      setEnabled(true);
      log("Trackpad disabled!");
    } catch (error) {
      console.error("Error disabling the trackpad:", error);
    }
  };

  const toggleOff = async () => {
    log("Restoring trackpads...");
    try {
      await call("restore");
      setEnabled(false);
      log("Trackpads restored!");
    } catch (error) {
      console.error("Error restoring the trackpad:", error);
    }
  };

  const handleToggle = async (val: boolean) => {
    if (val) {
      await toggleOn();
    } else {
      await toggleOff();
    }
  };

  return (
    <PanelSection title="Options">
      <PanelSectionRow>
        <div>
          <strong>Active game:</strong> {runningGame}
        </div>
      </PanelSectionRow>
      <PanelSectionRow>
        <ToggleField
          label="Disable Trackpad"
          checked={enabled}
          onChange={handleToggle}
        />
      </PanelSectionRow>
    </PanelSection>
  );
};

const log = (str: string) => console.log(`[Toggle Trackpad] ${str}`);

export default PluginContent;
