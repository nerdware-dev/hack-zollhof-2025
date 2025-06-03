from dynamo import User
from ki import Ki

def test_user():
    user = User()
    user.put_item('a3cd0312-dfa4-42a7-806e-9164b5b9215c',{"chat": {"L": [
        {"M": {"p": {"S": "Hallo"}, "a": {"S": "Auch hallo"}}}
    ]}})

def test_ki():
    #question = "Gibt es im Umkreis von ca 30 km um Roth herum in den nächsten Wochen Events, die ich von Roth aus gut mit dem Fahrrad erreichen kann?"
    #question = "welche sport verein aktivitäten finden diese Woche in Roth statt"
    #question = "hat die SBK geförderte präventions programme? Falls ja, nenne mir einige sprortliche Beispiele."
    question = "Gib mir eine Liste von Kursen mit diesen Aktivitäten, die in Roth stattfinden"
    ki = Ki()
    #ki.chat_with_user_data(question)
    ki.ask_question(question)



