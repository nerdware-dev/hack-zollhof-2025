from dataclasses import dataclass, asdict
from dacite import from_dict, Config as DaciteConfig

dacite_config = DaciteConfig(type_hooks={
    float: float,
    int: int
})

@dataclass
class UserPreferences:
    year_of_birth: int
    gender: str
    city: str
    country: str
    radius_in_km: int
    insurer_name: str

@dataclass
class ChatMessage:
    question: str
    answer: str

@dataclass
class User:
    first_name: str
    last_name: str
    email: str
    basic_preferences: UserPreferences
    ai_preferences: str
    chat_history: list[ChatMessage]

def user_from_dict(data: dict) -> User:
    return from_dict(data_class=User, data=data, config=dacite_config)

def user_to_dict(user: User) -> dict:
    return asdict(user)