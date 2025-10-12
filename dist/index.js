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

const formatGameLabel = (game) => {
    if (!game)
        return "No game running";
    const { appid, display_name } = game;
    if (appid != null)
        return `${display_name ?? "Unknown"} (AppID: ${appid})`;
    return "Game running but not correctly identified";
};
const PluginContent = () => {
    const [toggleState, setToggleState] = SP_REACT.useState(false);
    const [accountId, setAccountId] = SP_REACT.useState(null);
    const [language, setLanguage] = SP_REACT.useState(null);
    const [game, setGame] = SP_REACT.useState(null);
    // Fetch Steam info and current game
    SP_REACT.useEffect(() => {
        const fetchSteamInfo = async () => {
            try {
                const id = await SteamClient.WebChat.GetCurrentUserAccountID();
                const lang = await SteamClient.Settings.GetCurrentLanguage();
                setAccountId(id.toString());
                setLanguage(lang);
            }
            catch (err) {
                console.error("Error fetching SteamClient data:", err);
            }
            const app = DFL.Router.MainRunningApp;
            if (app?.appid && app?.display_name) {
                setGame(app);
            }
        };
        fetchSteamInfo();
    }, []);
    // Fetch plugin state when game changes
    SP_REACT.useEffect(() => {
        if (!game)
            return;
        const fetchState = async () => {
            try {
                const state = await call("get_state", game);
                setToggleState(state.state);
            }
            catch (error) {
                console.error("[Toggle Trackpad] Error fetching state:", error);
                setToggleState(false);
            }
        };
        fetchState();
    }, [game]);
    const handleToggle = async (val) => {
        try {
            const toggleState = await call("toggle_trackpad", accountId, game, val);
            console.log('toggleState');
            console.log(toggleState);
            // console.log("DuplicateControllerConfigurationSourceMode");
            // console.log(SteamClient.Input.DuplicateControllerConfigurationSourceMode(0,"Default"));
            console.log("ExportCurrentControllerConfiguration");
            console.log(SteamClient.Input.ExportCurrentControllerConfiguration(0, 606150, 0, "Default", "Duplicated from console", "Default"));
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
                formatGameLabel(game))),
        window.SP_REACT.createElement(DFL.PanelSectionRow, null,
            window.SP_REACT.createElement(DFL.ToggleField, { label: "Disable Trackpad", checked: toggleState, onChange: handleToggle, disabled: !game })),
        window.SP_REACT.createElement(DFL.PanelSectionRow, null,
            window.SP_REACT.createElement("div", { style: { fontSize: "0.9em", opacity: 0.7 } },
                window.SP_REACT.createElement("div", null,
                    "Account ID: ",
                    accountId ?? "Loading..."),
                window.SP_REACT.createElement("div", null,
                    "Language: ",
                    language ?? "Loading...")))));
};

var index = DFL.definePlugin(() => {
    return {
        title: window.SP_REACT.createElement("div", null, "Toggle Trackpad"),
        content: window.SP_REACT.createElement(PluginContent, null),
        icon: window.SP_REACT.createElement(FaGamepad, null),
    };
});

export { index as default };
//# sourceMappingURL=index.js.map
