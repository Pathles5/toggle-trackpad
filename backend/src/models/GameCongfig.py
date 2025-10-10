from dataclasses import dataclass, asdict
from typing import Optional
import json

@dataclass
class GameConfig:
    appid: int
    name: str
    trackpad_disabled: bool
    last_seen: Optional[str] = None

    def __init__(self, appid, name, trackpad_disabled, last_seen=None):
        self.appid = appid
        self.name = name
        self.trackpad_disabled = trackpad_disabled
        self.last_seen = last_seen

    def __str__(self):
        return self.name
    
    def to_dict(self) -> dict:
        return asdict(self)

    @staticmethod
    def from_dict(data: dict) -> "GameConfig":
        return GameConfig(
            appid=int(data["appid"]),
            name=data["name"],
            trackpad_disabled=bool(data["trackpad_disabled"]),
            last_seen=data.get("last_seen")
        )

    @staticmethod
    def from_json(json_str: str) -> "GameConfig":
        data = json.loads(json_str)
        return GameConfig.from_dict(data)

    def to_json(self) -> str:
        return json.dumps(self.to_dict())
