from mistralai import Mistral
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
from google import genai


class Ki:
    def __init__(self):
        load_secrets()
        self.user = User()
        print("ki init")

    def chat(self):
        print("t")
        #client = genai.Client(api_key=os.environ['GEMENAI_API_KEY'])
        #gemini_model = "gemini-2.0-flash"
        #genai_response = client.models.generate_content(
        #    model=gemini_model, contents=gemini_usr_prompt.replace("\n", ";")
        #)
        #gemini_response_text = genai_response.text

    def ask_question(self, question: str):
        user_data = self.user.get_item('a3cd0312-dfa4-42a7-806e-9164b5b9215c')
        messages = []
        chat_history = "Chat Verlauf:\n"
        chats = user_data["Item"]["data"]["M"]["chat"]["L"]
        if len(chats)>5:
            chats = chats[-5:]
        for chat in chats:
            messages.append({
                    "role": "user",
                    "content": chat["M"]["p"]["S"]
                })
            chat_history += "ANWENDER-FRAGE: "+chat["M"]["p"]["S"]+"\n"
            messages.append({
                "role": "assistant",
                "content": chat["M"]["a"]["S"]
            })
            chat_history += "KI-ANTWORT: " + chat["M"]["a"]["S"] + "\n"

        messages.append({
                    "role": "user",
                    "content": question
                })
        chat_history += "ANWENDER-FRAG: "+question+"\nAntworte auf deutsch!"

        mistral_model = "mistral-large-latest"
        #client = Mistral(api_key=os.environ['MISTRAL_API_KEY'])
        #chat_response = client.chat.complete(
        #    model=mistral_model,
        #    messages=messages
        #)
        #ki_response = chat_response.choices[0].message.content

        model = LiteLLMModel(model_id="mistral/"+mistral_model,
                             api_key=os.environ['MISTRAL_API_KEY'], )
        # model = OpenAIServerModel(model_id="gemini-2.0-flash",
        #                          api_key=GEMINI_API_KEY,
        #                          # Google Gemini OpenAI-compatible API base URL
        #                          api_base="https://generativelanguage.googleapis.com/v1beta/openai/", )
        agent = CodeAgent(
            tools=[
                DuckDuckGoSearchTool(),
                #WebSearchTool(),
                VisitWebpageTool(),
                FinalAnswerTool(),
            ],
            model=model,
            max_steps=10,
            verbosity_level=2,
        )
        ag_response = agent.run(
            chat_history
        )
        print(ag_response)
        ki_response = ag_response





        user_data["Item"]["data"]["M"]["chat"]["L"].append({"M": {"p": {"S": question}, "a": {"S": ki_response}}})
        self.user.put_item('a3cd0312-dfa4-42a7-806e-9164b5b9215c', user_data["Item"]["data"]["M"])

        print(ki_response)
        return ki_response

#ki = Ki()
#ki.ask_question("Und morgen?")