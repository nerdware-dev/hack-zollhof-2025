from be10.datamodels.User import ChatMessage, User
from dynamo import UserTable
from dacite import from_dict, Config
from dataclasses import asdict

# Tell dacite to convert Decimal to float (or int, if you prefer)
config = Config(type_hooks={
    float: float,
    int: int  # This maps Decimal to int where needed
})

TABLE = "nw-hack-2025-user"
USER_ID = "user_12345"

def get_chat_history(self):
    chat_history = "Chat Verlauf:\n"
    p_chats = self.user.chat_history
    if len(p_chats) > 5:
        p_chats = p_chats[-5:]
    for chat in p_chats:
        chat_history += "ANWENDER-FRAGE: " + chat.question + "\n"
        chat_history += "KI-ANTWORT: " + chat.answer + "\n"
    return chat_history

def append_chat(question: str, answer: str):
    chat_message = ChatMessage(question, answer)
    user.chat_history.append(chat_message)

db = UserTable(TABLE)
user = db.get_item(USER_ID)
append_chat("yet another question", "yet another answer")
print(user)
db.put_item(USER_ID, user)

