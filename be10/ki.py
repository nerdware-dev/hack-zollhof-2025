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


class Ki:
    def __init__(self):
        load_secrets()
        self.user = User()
        print("ki init")

    def ask_question(self, question: str):
        user_data = self.user.get_item('a3cd0312-dfa4-42a7-806e-9164b5b9215c')
        messages = []
        chat_history = "Chat History:\n"
        for chat in user_data["Item"]["data"]["M"]["chat"]["L"]:
            messages.append({
                    "role": "user",
                    "content": chat["M"]["p"]["S"]
                })
            chat_history += "USER-QUESTION: "+chat["M"]["p"]["S"]+"\n"
            messages.append({
                "role": "assistant",
                "content": chat["M"]["a"]["S"]
            })
            chat_history += "ASSISTNAT-ANSWER: " + chat["M"]["a"]["S"] + "\n"

        messages.append({
                    "role": "user",
                    "content": question
                })
        chat_history += "USER-QUESTION: "+question+"\n"

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