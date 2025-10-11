from dataclasses import dataclass, asdict
import json

@dataclass
class GameConfig:
    appid: int
    name: str
    trackpad_disabled: bool

    def to_dict(self) -> dict:
        return asdict(self)

    @staticmethod
    def from_dict(data: dict) -> "GameConfig":
        return GameConfig(
            appid=int(data["appid"]),
            name=data["name"],
            trackpad_disabled=bool(data["trackpad_disabled"]),
        )

    @staticmethod
    def from_json(json_str: str) -> "GameConfig":
        data = json.loads(json_str)
        return GameConfig.from_dict(data)

    def to_json(self) -> str:
        return json.dumps(self.to_dict())
