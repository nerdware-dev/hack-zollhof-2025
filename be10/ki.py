from mistralai import Mistral
from google import genai
import os
from secrets import load_secrets
from dynamo import User
from smolagents import (
    CodeAgent,
    DuckDuckGoSearchTool,
    GoogleSearchTool,
    WebSearchTool,
    FinalAnswerTool,
    OpenAIServerModel,
    LiteLLMModel,
    Tool,
    tool,
    VisitWebpageTool,
)


class Ki:
    def __init__(self):
        load_secrets()
        self.user = User()
        self.gemini_key = os.environ['GEMENAI_API_KEY']
        self.gemini_client = genai.Client(api_key=self.gemini_key)
        print("ki init")

    def chat_ki(self, question, chats=[]):
        chat_history = "Chat Verlauf:\n"
        p_chats = chats
        if len(p_chats) > 5:
            p_chats = p_chats[-5:]
        for chat in p_chats:
            chat_history += "ANWENDER-FRAGE: " + chat["M"]["p"]["S"] + "\n"
            chat_history += "KI-ANTWORT: " + chat["M"]["a"]["S"] + "\n"
        chat_history += "ANWENDER-FRAG: " + question + "\nAntworte auf deutsch!"

        gemini_model = "gemini-2.0-flash"
        genai_response = self.gemini_client.models.generate_content(
            model=gemini_model, contents=chat_history.replace("\n", ";")
        )
        gemini_response_text = genai_response.text
        return gemini_response_text

    def chat_with_user_data(self, question):
        user_data = self.user.get_item('a3cd0312-dfa4-42a7-806e-9164b5b9215c')
        chats = user_data["Item"]["data"]["M"]["chat"]["L"]
        response = self.chat_ki(question, chats)

        user_data["Item"]["data"]["M"]["chat"]["L"].append({"M": {"p": {"S": question}, "a": {"S": response}}})
        self.user.put_item('a3cd0312-dfa4-42a7-806e-9164b5b9215c', user_data["Item"]["data"]["M"])

        print(response)
        return response

    def ask_question(self, question: str):
        user_data = self.user.get_item('a3cd0312-dfa4-42a7-806e-9164b5b9215c')
        messages = []
        chat_history = "Chat Verlauf:\n"
        chats = user_data["Item"]["data"]["M"]["chat"]["L"]
        if len(chats) > 5:
            chats = chats[-5:]
        for chat in chats:
            messages.append({
                "role": "user",
                "content": chat["M"]["p"]["S"]
            })
            chat_history += "ANWENDER-FRAGE: " + chat["M"]["p"]["S"] + "\n"
            messages.append({
                "role": "assistant",
                "content": chat["M"]["a"]["S"]
            })
            chat_history += "KI-ANTWORT: " + chat["M"]["a"]["S"] + "\n"

        messages.append({
            "role": "user",
            "content": question
        })
        chat_history += "ANWENDER-FRAG: " + question + "\nAntworte auf deutsch!"

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
        ki_response = ag_response
        print(ki_response)

        user_data["Item"]["data"]["M"]["chat"]["L"].append({"M": {"p": {"S": question}, "a": {"S": ki_response}}})
        self.user.put_item('a3cd0312-dfa4-42a7-806e-9164b5b9215c', user_data["Item"]["data"]["M"])


        return ki_response


def test():
    #question = "Gibt es im Umkreis von ca 30 km um Roth herum in den nächsten Wochen Events, die ich von Roth aus gut mit dem Fahrrad erreichen kann?"
    #question = "welche sport verein aktivitäten finden diese Woche in Roth statt"
    #question = "hat die SBK geförderte präventions programme? Falls ja, nenne mir einige sprortliche Beispiele."
    question = "Gib mir eine Liste von Kursen mit diesen Aktivitäten, die in Roth stattfinden"
    ki = Ki()
    #ki.chat_with_user_data(question)
    ki.ask_question(question)


#test()
