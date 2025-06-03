from dataclasses import dataclass

@dataclass
class UserPreferences:
    year_of_birth: int
    city: str
    country: str
    radius_in_km: int
    insurer_name: str
    notifications: bool
    activities: list[str]

@dataclass
class AiPreferences:
    content: str

@dataclass
class ChatMessage:
    question: str
    answer: str

@dataclass
class User:
    first_name: str
    last_name: str
    username: str
    email: str
    basic_preferences: UserPreferences
    ai_preferences: AiPreferences
    chat_history: list[ChatMessage]

