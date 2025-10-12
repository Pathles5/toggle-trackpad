var DefaultContext = {
  color: undefined,
  size: undefined,
  className: undefined,
  style: undefined,
  attr: undefined
};
var IconContext = SP_REACT.createContext && /*#__PURE__*/SP_REACT.createContext(DefaultContext);

var _excluded = ["attr", "size", "title"];
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } } return target; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function Tree2Element(tree) {
  return tree && tree.map((node, i) => /*#__PURE__*/SP_REACT.createElement(node.tag, _objectSpread({
    key: i
  }, node.attr), Tree2Element(node.child)));
}
function GenIcon(data) {
  return props => /*#__PURE__*/SP_REACT.createElement(IconBase, _extends({
    attr: _objectSpread({}, data.attr)
  }, props), Tree2Element(data.child));
}
function IconBase(props) {
  var elem = conf => {
    var {
        attr,
        size,
        title
      } = props,
      svgProps = _objectWithoutProperties(props, _excluded);
    var computedSize = size || conf.size || "1em";
    var className;
    if (conf.className) className = conf.className;
    if (props.className) className = (className ? className + " " : "") + props.className;
    return /*#__PURE__*/SP_REACT.createElement("svg", _extends({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, conf.attr, attr, svgProps, {
      className: className,
      style: _objectSpread(_objectSpread({
        color: props.color || conf.color
      }, conf.style), props.style),
      height: computedSize,
      width: computedSize,
      xmlns: "http://www.w3.org/2000/svg"
    }), title && /*#__PURE__*/SP_REACT.createElement("title", null, title), props.children);
  };
  return IconContext !== undefined ? /*#__PURE__*/SP_REACT.createElement(IconContext.Consumer, null, conf => elem(conf)) : elem(DefaultContext);
}

// THIS FILE IS AUTO GENERATED
function FaGamepad (props) {
  return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 640 512"},"child":[{"tag":"path","attr":{"d":"M480.07 96H160a160 160 0 1 0 114.24 272h91.52A160 160 0 1 0 480.07 96zM248 268a12 12 0 0 1-12 12h-52v52a12 12 0 0 1-12 12h-24a12 12 0 0 1-12-12v-52H84a12 12 0 0 1-12-12v-24a12 12 0 0 1 12-12h52v-52a12 12 0 0 1 12-12h24a12 12 0 0 1 12 12v52h52a12 12 0 0 1 12 12zm216 76a40 40 0 1 1 40-40 40 40 0 0 1-40 40zm64-96a40 40 0 1 1 40-40 40 40 0 0 1-40 40z"},"child":[]}]})(props);
}

// Decky Loader will pass this api in, it's versioned to allow for backwards compatibility.
// @ts-ignore

// Prevents it from being duplicated in output.
const manifest = {"name":"Toggle-Trackpad","author":"Apache Vegano","flags":["debug","_root"],"api_version":1,"publish":{"tags":["template","root","trackpad","disable","enable","toggle","backup"],"description":"A simple Decky Plugin to toggle the Steam Deck trackpad on and off.","image":"https://opengraph.githubassets.com/1/SteamDeckHomebrew/PluginLoader"}};
const API_VERSION = 2;
const internalAPIConnection = window.__DECKY_SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_deckyLoaderAPIInit;
// Initialize
if (!internalAPIConnection) {
    throw new Error('[@decky/api]: Failed to connect to the loader as as the loader API was not initialized. This is likely a bug in Decky Loader.');
}
// Version 1 throws on version mismatch so we have to account for that here.
let api;
try {
    api = internalAPIConnection.connect(API_VERSION, manifest.name);
}
catch {
    api = internalAPIConnection.connect(1, manifest.name);
    console.warn(`[@decky/api] Requested API version ${API_VERSION} but the running loader only supports version 1. Some features may not work.`);
}
if (api._version != API_VERSION) {
    console.warn(`[@decky/api] Requested API version ${API_VERSION} but the running loader only supports version ${api._version}. Some features may not work.`);
}
// TODO these could use a lot of JSDoc
const call = api.call;

const PluginContent = () => {
    const [toggleEnabled, setToggleEnabled] = SP_REACT.useState(false);
    const [toggleState, setToggleState] = SP_REACT.useState(false);
    const [gameLabel, setGameLabel] = SP_REACT.useState("Checking...");
    SP_REACT.useEffect(() => {
        const fetchState = async () => {
            try {
                const [state, game] = await Promise.all([
                    call("get_state"),
                    call("detect_game")
                ]);
                setToggleEnabled(state.enabled);
                setToggleState(state.state);
                if (game?.running) {
                    setGameLabel(game.appid
                        ? `${game.name} (AppID: ${game.appid})`
                        : "Game running but not correctly identified");
                }
                else {
                    setGameLabel("No game running");
                }
            }
            catch (error) {
                console.error("[Toggle Trackpad] Error fetching state:", error);
                setGameLabel("Error querying game");
                setToggleEnabled(false);
                setToggleState(false);
            }
        };
        fetchState();
    }, []);
    const handleToggle = async (val) => {
        try {
            await call(val ? "activate" : "restore");
            setToggleState(val);
        }
        catch (error) {
            console.error(`[Toggle Trackpad] Error toggling:`, error);
        }
    };
    return (window.SP_REACT.createElement(DFL.PanelSection, { title: "Options" },
        window.SP_REACT.createElement(DFL.PanelSectionRow, null,
            window.SP_REACT.createElement("div", null,
                window.SP_REACT.createElement("strong", null, "Active game:"),
                " ",
                gameLabel)),
        window.SP_REACT.createElement(DFL.PanelSectionRow, null,
            window.SP_REACT.createElement(DFL.ToggleField, { label: "Disable Trackpad", checked: toggleState, onChange: handleToggle, disabled: !toggleEnabled }))));
};

var ELoginState;
(function (ELoginState) {
    ELoginState[ELoginState["None"] = 0] = "None";
    ELoginState[ELoginState["WelcomeDialog"] = 1] = "WelcomeDialog";
    ELoginState[ELoginState["WaitingForCreateUser"] = 2] = "WaitingForCreateUser";
    ELoginState[ELoginState["WaitingForCredentials"] = 3] = "WaitingForCredentials";
    ELoginState[ELoginState["WaitingForNetwork"] = 4] = "WaitingForNetwork";
    ELoginState[ELoginState["WaitingForServerResponse"] = 5] = "WaitingForServerResponse";
    ELoginState[ELoginState["WaitingForLibraryReady"] = 6] = "WaitingForLibraryReady";
    ELoginState[ELoginState["Success"] = 7] = "Success";
    ELoginState[ELoginState["Quit"] = 8] = "Quit";
})(ELoginState || (ELoginState = {}));
var EShutdownStep;
(function (EShutdownStep) {
    EShutdownStep[EShutdownStep["None"] = 0] = "None";
    EShutdownStep[EShutdownStep["Start"] = 1] = "Start";
    EShutdownStep[EShutdownStep["WaitForGames"] = 2] = "WaitForGames";
    EShutdownStep[EShutdownStep["WaitForCloud"] = 3] = "WaitForCloud";
    EShutdownStep[EShutdownStep["FinishingDownload"] = 4] = "FinishingDownload";
    EShutdownStep[EShutdownStep["WaitForDownload"] = 5] = "WaitForDownload";
    EShutdownStep[EShutdownStep["WaitForServiceApps"] = 6] = "WaitForServiceApps";
    EShutdownStep[EShutdownStep["WaitForLogOff"] = 7] = "WaitForLogOff";
    EShutdownStep[EShutdownStep["Done"] = 8] = "Done";
})(EShutdownStep || (EShutdownStep = {}));
var ESuspendResumeProgressState;
(function (ESuspendResumeProgressState) {
    ESuspendResumeProgressState[ESuspendResumeProgressState["Invalid"] = 0] = "Invalid";
    ESuspendResumeProgressState[ESuspendResumeProgressState["Complete"] = 1] = "Complete";
    ESuspendResumeProgressState[ESuspendResumeProgressState["CloudSync"] = 2] = "CloudSync";
    ESuspendResumeProgressState[ESuspendResumeProgressState["LoggingIn"] = 3] = "LoggingIn";
    ESuspendResumeProgressState[ESuspendResumeProgressState["WaitingForApp"] = 4] = "WaitingForApp";
    ESuspendResumeProgressState[ESuspendResumeProgressState["Working"] = 5] = "Working";
})(ESuspendResumeProgressState || (ESuspendResumeProgressState = {}));

var DeckyUI = /*#__PURE__*/Object.freeze({
  __proto__: null,
  get ELoginState () { return ELoginState; },
  get EShutdownStep () { return EShutdownStep; },
  get ESuspendResumeProgressState () { return ESuspendResumeProgressState; }
});

console.log("[Decky UI] Available exports:", DeckyUI);
// console.log("[Decky UI] Available exports:", AppOverview);
// console.log("SteamClient.Apps.StreamGame:"+SteamClient.Apps.StreamGame) //Stremear game:     (appId: number, clientId: string, param2: number): void;?
// console.log("SteamClient.Apps.ShowControllerConfigurator:"+SteamClient.Apps.ShowControllerConfigurator) // (appId: number): void;
// console.log("SteamClient.Input.DuplicateControllerConfigurationSourceMode:"+SteamClient.Input.DuplicateControllerConfigurationSourceMode) // ??
// console.log("SteamClient.Input.ExportCurrentControllerConfiguration:"+SteamClient.Input.ExportCurrentControllerConfiguration) // depend appId
// console.log("SteamClient.Input.PreviewConfigForAppAndController:"+SteamClient.Input.PreviewConfigForAppAndController) // depend appId
// console.log("SteamClient.Input.RegisterForShowControllerLayoutPreviewMessages:"+SteamClient.Input.RegisterForShowControllerLayoutPreviewMessages)
// console.log("SteamClient.Input.RegisterForUnboundControllerListChanges:"+SteamClient.Input.RegisterForUnboundControllerListChanges)
// console.log("SteamClient.Input.ResetControllerBindings:"+SteamClient.Input.ResetControllerBindings)
// console.log("SteamClient.Input.SaveEditingControllerConfiguration:"+SteamClient.Input.SaveEditingControllerConfiguration)
// console.log("SteamClient.Input.SetControllerPersonalizationSetting:"+SteamClient.Input.SetControllerPersonalizationSetting)
// console.log("SteamClient.Input.SetEditingControllerConfigurationActionSet:"+SteamClient.Input.SetEditingControllerConfigurationActionSet)
// console.log("SteamClient.Input.SetEditingControllerConfigurationInputBinding:"+SteamClient.Input.SetEditingControllerConfigurationInputBinding)
console.log("SteamClient.Auth.GetMachineID:" + await SteamClient.Auth.GetMachineID());
console.log("SteamClient.Input.ShowControllerSettings:" + SteamClient.Input.ShowControllerSettings());
console.log("SteamClient.Settings.GetAccountSettings:" + await SteamClient.Settings.GetAccountSettings());
console.log("SteamClient.Settings.GetCurrentLanguage:" + await SteamClient.Settings.GetCurrentLanguage());
console.log("SteamClient.System.GetSystemInfo:" + await SteamClient.System.GetSystemInfo());
console.log("SteamClient.User:" + await SteamClient.User.GetLoginUsers());
console.log("SteamClient.WebChat.GetCurrentUserAccountID:" + await SteamClient.WebChat.GetCurrentUserAccountID());
var index = DFL.definePlugin(() => {
    return {
        title: window.SP_REACT.createElement("div", null, "Toggle Trackpad"),
        content: window.SP_REACT.createElement(PluginContent, null),
        icon: window.SP_REACT.createElement(FaGamepad, null),
    };
});

export { index as default };
//# sourceMappingURL=index.js.map
