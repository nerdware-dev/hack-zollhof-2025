import json

from google import genai
from mistralai import Mistral
import os

from User import ChatMessage
from secrets import load_secrets
from dynamo import UserTable
from smolagents import (
    CodeAgent,
    DuckDuckGoSearchTool,
    FinalAnswerTool,
    LiteLLMModel,
    VisitWebpageTool,
)

TABLE = "nw-hack-2025-user"
USER_ID = 'user_12345'

class Ki:
    def __init__(self):
        load_secrets()
        self.db = UserTable(TABLE)
        self.user = self.db.get_item(USER_ID)
        self.gemini_key = os.environ['GEMENAI_API_KEY']
        self.gemini_client = genai.Client(api_key=self.gemini_key)
        print("ki init")

    def append_chat(self, question: str, answer: str):
        chat_message = ChatMessage(question,answer)
        self.user.chat_history.append(chat_message)

    def new_chat(self, question: str) -> str:
        return "ANWENDER-FRAGE: " + question + "\nAntworte auf deutsch!"

    def get_chat_history(self):
        chat_history = "Chat Verlauf:\n"
        p_chats = self.user.chat_history
        if len(p_chats) > 5:
            p_chats = p_chats[-5:]
        for chat in p_chats:
            chat_history += "ANWENDER-FRAGE: " + chat.question + "\n"
            chat_history += "KI-ANTWORT: " + chat.answer + "\n"
        return chat_history

    def chat_ki(self, chat_with_history):
        gemini_model = "gemini-2.0-flash"
        genai_response = self.gemini_client.models.generate_content(
            model=gemini_model, contents=chat_with_history.replace("\n", ";")
        )
        gemini_response_text = genai_response.text
        return gemini_response_text

    def chat_mistral(self, next_question):
        messages = []
        messages.append({
            "role": "system",
            "content": """Du bist eine freundliche KI in einer App. 
            Durch die App sollen die Nutzer dazu motiviert werden sich mehr zu bewegen.
            Du führst nun ein Interview um die sportlichen Vorlieben des Anwenders zu erfahren. 
            Fasse dich in Deinen Antworten kurz. Um die 4 Sätze reichen.
            """
        })
        for i in self.user.chat_history:
            messages.append({
                "role": "user",
                "content": i.question
            })
            messages.append({
                "role": "assistant",
                "content": i.answer
            })
        question = next_question
        if len(question) == 0:
            question = f"""Ich bin {self.user.basic_preferences.year_of_birth} geboren, {self.user.basic_preferences.gender} und bewege mich zu wenig. Kannst 
            Du mir helfen einige Aktivitäten zu finden, durch die ich mich mehr bewege?"""
        messages.append({
            "role": "user",
            "content": question
        })

        print(messages)

        mistral_model = "mistral-large-latest"
        client = Mistral(api_key=os.environ['MISTRAL_API_KEY'])
        chat_response = client.chat.complete(
            model=mistral_model,
            messages=messages
        )
        ki_response = chat_response.choices[0].message.content
        print(ki_response)
        self.append_chat(question,ki_response)

        return ki_response

    def end_interview(self) -> str:
        answer = self.chat_mistral("Gib eine Liste der Aktivitäten, die der Anwender genannt hat, als String Liste im JSON Format zurück. Die Antwort darf nur aus dieser JSON Liste bestehen.")
        answer = answer.strip(" `\n")
        if answer.startswith('json'):
            answer = answer[4:]
        answer = answer.strip(" `\n")
        print(answer)
        self.user.ai_preferences = answer
        self.user.chat_history = []
        self.update_user()
        return answer

    def chat_with_user_data(self, question):
        chat = self.get_chat_history()
        chat += self.new_chat(question)
        response = self.chat_ki(chat)
        self.append_chat(question, response)
        self.update_user()
        print(response)
        return response

    def update_user(self):
        self.db.put_item(USER_ID, self.user)

    def summarize_interview(self):
        chat = self.get_chat_history()
        chat += self.new_chat("Fasse die bisherige Kommunikation nach den Nutzer-Interessen zusammen und ergänze diese mit der Liste: " + json.dumps(self.user.ai_preferences) + ". Antworte nur mit der Liste")
        response = self.chat_ki(chat)
        self.user.chat_history = []
        self.user.ai_preferences = response
        self.update_user()

    def ask_question(self, question: str):
        chat_history = self.get_chat_history()
        chat_history += self.new_chat(question)

        mistral_model = "mistral-large-latest"
        # client = Mistral(api_key=os.environ['MISTRAL_API_KEY'])
        # chat_response = client.chat.complete(
        #    model=mistral_model,
        #    messages=messages
        # )
        # ki_response = chat_response.choices[0].message.content

        model = LiteLLMModel(model_id="mistral/" + mistral_model,
                             api_key=os.environ['MISTRAL_API_KEY'], )
        # model = OpenAIServerModel(model_id="gemini-2.0-flash",
        #                          api_key=self.gemini_key,
        #                          api_base="https://generativelanguage.googleapis.com/v1beta/openai/", )
        agent = CodeAgent(
            tools=[
                DuckDuckGoSearchTool(),
                # WebSearchTool(),
                VisitWebpageTool(),
                FinalAnswerTool(),
            ],
            model=model,
            max_steps=15,
            verbosity_level=1,
        )
        ag_response = agent.run(
            chat_history
        )
        print(ag_response)
        self.append_chat(question, ag_response)
        self.update_user()
        return ag_response


def test():
    #question = "Gibt es im Umkreis von ca 30 km um Roth herum in den nächsten Wochen Events, die ich von Roth aus gut mit dem Fahrrad erreichen kann?"
    #question = "welche sport verein aktivitäten finden diese Woche in Roth statt"
    #question = "hat die SBK geförderte präventions programme? Falls ja, nenne mir einige sprortliche Beispiele."
    question = "Gib mir eine Liste von Kursen mit diesen Aktivitäten, die in Roth stattfinden"
    ki = Ki()
    #ki.chat_with_user_data(question)
    ki.ask_question(question)

#test()
