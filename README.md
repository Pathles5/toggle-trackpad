# 🎮 Toggle Trackpad Plugin for Decky

## Overview
This plugin helps Steam Deck users quickly **disable or enable the trackpad** while playing games.  
It also detects whether the Steam Input configuration file (`controller_neptune.vdf`) exists.  
If the file is missing, the plugin provides a convenient **“Open Controller Settings”** button that launches Steam’s controller configuration overlay so you can generate the file without leaving Decky.

The goal is simple: make managing your trackpad behavior painless and integrated into Decky’s UI.

---

## Features
- ✅ Toggle the Steam Deck trackpad on/off per game  
- 🔍 Detect if Steam Input configuration (`controller_neptune.vdf`) is missing  
- 🕹️ One‑click access to Steam’s **Controller Settings** overlay to create or edit your configuration  
- 📊 Shows useful info such as current game, account ID, and language  

---

## Installation
1. Install [Decky Loader](https://decky.xyz/) on your Steam Deck.  
2. Clone or download this plugin into your Decky plugins folder:  
	~/.steam/root/config/decky/plugins/toggle-trackpad
3. Restart Decky Loader or your Steam Deck.  
4. The plugin will appear in Decky’s sidebar.

---

## Usage
1. Launch any game on your Steam Deck.  
2. Open Decky’s sidebar and select **Toggle Trackpad**.  
3. You’ll see:
- **Active game** name and AppID  
- A **Disable Trackpad** toggle switch  
- Account ID and language info  
4. If the Steam Input configuration file is missing:
- A button **Open Controller Settings** will appear  
- Click it to open Steam’s controller overlay  
- Make a minimal change (e.g., assign a button) and save  
- The configuration file will be created automatically  
5. Once the file exists, the toggle switch will be enabled and ready to use.

---

## Notes
- The plugin relies on SteamClient APIs exposed by Decky Loader.  
- Overlay activation may vary depending on Steam version; if the button doesn’t open the overlay, check Decky logs for protocol support.  
- After closing the overlay, the plugin will refresh and detect the new configuration.

---

## Contributing
Pull requests are welcome! If you discover additional overlay protocols or improvements for detecting controller mappings, feel free to contribute.
