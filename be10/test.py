from dynamo import User
from ki import Ki
from mistralai import Mistral
import os
from secrets import load_secrets


def test_user():
    user = User()
    user.put_item('a3cd0312-dfa4-42a7-806e-9164b5b9215c', {"chat": {"L": [
        {"M": {"p": {"S": "Hallo"}, "a": {"S": "Auch hallo"}}}
    ]}})


def test_ki():
    # question = "Gibt es im Umkreis von ca 30 km um Roth herum in den nächsten Wochen Events, die ich von Roth aus gut mit dem Fahrrad erreichen kann?"
    # question = "welche sport verein aktivitäten finden diese Woche in Roth statt"
    # question = "hat die SBK geförderte präventions programme? Falls ja, nenne mir einige sprortliche Beispiele."
    question = "Gib mir eine Liste von Kursen mit diesen Aktivitäten, die in Roth stattfinden"
    ki = Ki()
    # ki.chat_with_user_data(question)
    ki.ask_question(question)


def mistral(history: []):
    messages = []
    messages.append({
        "role": "system",
        "content": """Du bist eine freundliche KI in einer App. 
        Durch die App sollen die Nutzer dazu motiviert werden sich mehr zu bewegen.
        Du führst nun ein Interview um die sportlichen Vorlieben des Anwenders zu erfahren. 
        Fasse dich in Deinen Antworten kurz. Um die 4 Sätze reichen.
        Nach 8 Frage Antwort Runden ist das Interview beendet und du lieferst dann als Antwort nur eine String Liste mit den Aktivitären im JSON Format. Antworte dann nur um JSON Format 
        """
    })
    for i in history:
        messages.append({
            "role": i["role"],
            "content": i["content"]
        })

    mistral_model = "mistral-large-latest"
    client = Mistral(api_key=os.environ['MISTRAL_API_KEY'])
    chat_response = client.chat.complete(
        model=mistral_model,
        messages=messages
    )
    ki_response = chat_response.choices[0].message.content
    print(ki_response)


def test_interview():
    load_secrets()
    msg = [{"role": "user",
            "content": "Ich bin 52 Jahre, männlich und bewege mich zu wenig. kannst Du mir helfen einige aktivitäten zu finden, durch die ich mich mehr bewege?"},
           {"role": "assistant",
            "content": "Natürlich, ich helfe dir gerne dabei, mehr Bewegung in deinen Alltag zu integrieren! Zunächst einmal: Gibt es sportliche Aktivitäten, die du in der Vergangenheit gerne gemacht hast? Oder hast du bestimmte Vorlieben, wie zum Beispiel Outdoor-Aktivitäten oder lieber Indoor-Sport? Auch deine körperliche Verfassung und eventuelle gesundheitliche Einschränkungen sind wichtig zu wissen."},
           {"role": "user",
            "content": "Wandern, Mit den hunden gassi gehen, schwimmen. ich bin gesund aber nicht sehr fit"},
           {"role": "assistant",
            "content": "Das klingt nach einer guten Grundlage! Wandern und Gassi gehen mit den Hunden sind schon mal tolle Aktivitäten, die du ausbauen kannst. Schwimmen ist ebenfalls eine hervorragende Wahl, da es gelenkschonend ist und die Ausdauer verbessert. Hast du schon mal überlegt, die Dauer oder Intensität dieser Aktivitäten zu steigern? Oder gibt es andere Sportarten, die du vielleicht ausprobieren möchtest?"},
           {"role": "user",
            "content": "Ich würde gerne mehr Fahrrad fahen"},
           {"role": "assistant",
            "content": "Fahrradfahren ist eine großartige Idee! Es ist eine gelenkschonende Aktivität, die deine Ausdauer und Beinmuskulatur stärkt. Hast du ein Fahrrad und möchtest du lieber in der Natur oder in der Stadt fahren? Auch die Dauer und Häufigkeit deiner Fahrten können wir besprechen."},
           {"role": "user",
            "content": "Am Wochende könnte ich mir gut vorstellen durch die natur zu fahren"},
           {"role": "assistant",
            "content": "Das klingt nach einem tollen Plan! Naturradeln am Wochenende ist eine wunderbare Möglichkeit, sich zu bewegen und gleichzeitig die Umgebung zu genießen. Hast du schon einmal darüber nachgedacht, unter der Woche kürzere Fahrradtouren zu machen, vielleicht zur Arbeit oder für Besorgungen?"},
           {"role": "user",
            "content": "Am Wochende könnte ich mir gut vorstellen durch die natur zu fahren"},
           {"role": "assistant",
            "content": "Das klingt nach einem tollen Plan! Naturradeln am Wochenende ist eine wunderbare Möglichkeit, sich zu bewegen und gleichzeitig die Umgebung zu genießen. Hast du schon einmal darüber nachgedacht, unter der Woche kürzere Fahrradtouren zu machen, vielleicht zur Arbeit oder für Besorgungen?"},
           {"role": "user",
            "content": "Das könnte ich mal probieren"},
           {"role": "assistant",
            "content": "Super! Fahrradfahren zur Arbeit oder für Besorgungen ist eine praktische Möglichkeit, mehr Bewegung in deinen Alltag zu integrieren. Hast du auch Interesse an anderen Outdoor-Aktivitäten wie Joggen oder Nordic Walking?"},
           {"role": "user",
            "content": "Nein das interessiert mich nicht so"},
           {"role": "assistant",
            "content": "Verstanden. Wie sieht es mit Indoor-Aktivitäten aus? Hast du Interesse an Fitnessstudios oder Heimtraining?"},
           {"role": "user",
            "content": "Vielleicht Heimtraining. Ich bin kein Fan von Fitness Studios"},
           {"role": "assistant",
            "content": "Heimtraining ist eine flexible und bequeme Option. Hast du schon bestimmte Übungen oder Workouts im Sinn, die du zu Hause machen möchtest? Zum Beispiel Yoga, Krafttraining oder Cardio-Übungen?"},
           {"role": "user",
            "content": "Nein ich habe noch keine solchen Übungen"},
           {"role": "assistant",
            "content": "Kein Problem! Es gibt viele einfache und effektive Übungen, die du zu Hause machen kannst. Wie wäre es mit einfachen Körpergewichtsübungen wie Kniebeugen, Liegestütze oder Bauchmuskeltraining? Hast du schon einmal Yoga oder Pilates ausprobiert?"},
           {"role": "user",
            "content": "Nein ich habe noch keine solchen Übungen"},
           {"role": "assistant",
            "content": "Kein Problem! Es gibt viele einfache und effektive Übungen, die du zu Hause machen kannst. Wie wäre es mit einfachen Körpergewichtsübungen wie Kniebeugen, Liegestütze oder Bauchmuskeltraining? Hast du schon einmal Yoga oder Pilates ausprobiert?"},
           {"role": "user",
            "content": "Gib eine Liste der Aktivitäten als String Liste im JSON Format zurück. Die Antwort darf nur aus dieser JSON Liste bestehen"},

           ]
    mistral(msg)


def close_intrview():
    act = ["Wandern",
           "Mit den Hunden Gassi gehen",
           "Schwimmen",
           "Fahrradfahren in der Natur",
           "Fahrradfahren zur Arbeit oder für Besorgungen",
           "Heimtraining",

           "Yoga"
           ]
    question = f"""Gib mir für jede Aktivität aus der Liste einen Kurs oder ein event das in der Nähe von Roth stattfindet.
    Wenn möglich, gib eienen Link zur Aktivität mit zurück:
    Aktivitäten:
    {', '.join(act)}
    """
    ki = Ki()
    # ki.chat_with_user_data(question)
    ki.ask_question(question)

close_intrview()