import React, { useState, useCallback, useEffect } from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GiftedChat } from "react-native-gifted-chat";
const { containerBootstrap } = require("@nlpjs/core");
const { Nlp } = require("@nlpjs/nlp");
const { LangEn, LangDe } = require("@nlpjs/lang-de");

const url = "http://127.0.0.1:5000/";
var nlp_model = null;
console.log(nlp_model == null);
//NLP Js function to train model
async function train_model() {
  const container = await containerBootstrap();
  container.use(Nlp);
  container.use(LangDe);
  const nlp = container.get("nlp");
  nlp.settings.autoSave = false;
  nlp.addLanguage("de");
  // Adds the utterances and intents for the NLP
  // intent Temperatur
  nlp.addDocument("de", "Wie ist die Temperatur", "temperatur");
  nlp.addDocument("de", "Was ist die Temperatur", "temperatur");
  nlp.addDocument("de", "Wieviel Grad ist es", "temperatur");
  nlp.addDocument("de", "Was ist der Wert der Temperatur", "temperatur");
  nlp.addDocument("de", "Temperatur bitte", "temperatur");
  nlp.addDocument("de", "Wieviel Grad beträgt die Temperatur", "temperatur");

  // intent Wartungszeit
  nlp.addDocument("de", "Um wie viel Uhr ist die Wartung", "wartungszeit");
  nlp.addDocument("de", "Wann ist die Wartung", "wartungszeit");
  nlp.addDocument("de", "Wann ist die Wartungszeit", "wartungszeit");
  nlp.addDocument("de", "Wann wird die Wartung durchgeführt", "wartungszeit");
  nlp.addDocument("de", "Wartungszeit bitte", "wartungszeit");
  nlp.addDocument("de", "Wann ist die Wartung vorgesehen", "wartungszeit");

  // intent Machinennummer
  nlp.addDocument("de", "Wie ist die Machinennummer", "machinennummer");
  nlp.addDocument(
    "de",
    "Welche Machinennummer hat diese Machine",
    "machinennummer"
  );
  nlp.addDocument("de", "Machinennummer bitte", "machinennummer");
  nlp.addDocument("de", "Welche Nummer hat diese Machine", "machinennummer");
  nlp.addDocument("de", "Was ist die Machinennummer", "machinennummer");

  // Train also the NLG
  // nlp.addAction("greetings.hello", "getWeather", "", weatherinfo);
  //nlp.addAction("temperatur", "get_request", "", send_request);
  nlp.addAnswer(
    "de",
    "temperatur",
    "Die Temperatur der Maschine in Grad beträgt: "
  );
  nlp.addAnswer("de", "wartungszeit", "Die Wartung ist um ");
  nlp.addAnswer("de", "machinennummer", "Die Machinennummer ist: ");

  await nlp.train();
  nlp_model = nlp;
  console.log(nlp_model == null);

  //console.log(response);
  //console.log(response.intent);
}
train_model();

export function Chat() {
  //State mit Nachrichten
  const [messages, setMessages] = useState([]);
  //Save NLP model globally

  //State mit Daten
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hallo du kannst mir jede Frage stellen!!",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Bot",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);
  //Schreibt eigene Nachricht in Chat
  const onSend = useCallback((messages = []) => {
    setMessages(
      (previousMessages) => GiftedChat.append(previousMessages, messages)
      //console.log(messages[0].text),
    );
  }, []);

  //async function to process string with trained model
  async function get_intent(s) {
    const response = await nlp_model.process("de", s);
    return [response.intent, response.answer];
  }

  //Erhalte Daten von Server muss String sein da man sonst nicht auf die Daten zugreifen kann
  async function getData(messages) {
    //extract message from array
    var string_message = messages[0].text;
    console.log(messages[0].text);
    //process string with model to get intent
    var intent = await get_intent(string_message);
    console.log(intent[0]);
    if (intent[0] == "None") {
      return buildMessage(null, null);
    }
    console.log(intent[1]);
    //BASE URL+intent matches the API Route at the webserver
    const api_route = url.concat(String(intent[0]));
    //send request and build up message
    fetch(api_route)
      .then((response) => response.text())
      .then((res) => buildMessage(res, intent[1]))
      .catch((error) => console.error(error));
    //Hard code request for now
    //buildMessage("600", intent[1]);
  }

  function buildMessage(data, answer) {
    //Nachrichtenformat
    const msg = {
      _id: new Date(), //Erstellet zufällige ID wird benötigt Datum wiederholt sich nie
      text: "",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "Bot",
        avatar: "https://placeimg.com/140/140/any",
      },
    };
    if ((data || answer) == null) {
      msg.text = "Sorry ich habe dich leider nicht verstanden";
    } else {
      msg.text = answer + data;
    }
    //Schreib Nachricht des Bots in den Chat
    setMessages((previousMessages) => GiftedChat.append(previousMessages, msg));
  }
  const handleSend = (messages) => {
    onSend(messages), getData(messages);
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={{
        _id: 1,
      }}
    />
  );
}

function Voice() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Voice!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Voice" component={Voice} />
      <Tab.Screen name="Chat" component={Chat} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
