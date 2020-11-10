import React, { useState, useCallback, useEffect } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GiftedChat } from "react-native-gifted-chat";
import * as Permissions from "expo-permissions";
import { Audio } from "expo-av";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
const { containerBootstrap } = require("@nlpjs/core");
const { Nlp } = require("@nlpjs/nlp");
const { LangEn, LangDe } = require("@nlpjs/lang-de");


//CHANGE TO LOCAL IP HERE  (FOR TESTING ON DEVICES IN SAME NETWORK)
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
  nlp.addDocument("de", "Temperatur", "temperatur");
  nlp.addDocument("de", "Wieviel Grad ist es", "temperatur");
  nlp.addDocument("de", "Was ist der Wert der Temperatur", "temperatur");
  nlp.addDocument("de", "Temperatur bitte", "temperatur");
  nlp.addDocument("de", "Wieviel Grad beträgt die Temperatur", "temperatur");

 // intent kohlenstoffmonoxid
 nlp.addDocument("de", "Was ist der Kohlenstoffmonoxidgehalt?", "kohlenstoffmonoxid");
 nlp.addDocument("de", "Wie hoch ist der Kohlenstoffmonoxidgehalt?", "kohlenstoffmonoxid");
 nlp.addDocument("de", "Gebe mir bitte den Kohlenstoffmonoxidgehalt an. ", "kohlenstoffmonoxid");
 nlp.addDocument("de", "Kohlenstoffmonoxidgehalt bitte", "kohlenstoffmonoxid");
 nlp.addDocument("de", "Wie ist der Kohlenmonoxidgehalt", "kohlenstoffmonoxid");
 nlp.addDocument("de", "Kohlenmonoxidgehalt", "kohlenstoffmonoxid");


 // intent Luftfeuchtigkeit
 nlp.addDocument("de", "Wie hoch ist die Luftfeuchtigkeit?", "luftfeuchtigkeit");
 nlp.addDocument("de", "Was ist die Luftfeuchtigkeit", "luftfeuchtigkeit");
 nlp.addDocument("de", "Welchen Betrag hat die Luftfeuchtigkeit", "luftfeuchtigkeit");
 nlp.addDocument("de", "Luftfeuchtigkeit bitte", "luftfeuchtigkeit");
 nlp.addDocument("de", "Luftfeuchtigkeit", "luftfeuchtigkeit");

 // intent Licht
 nlp.addDocument("de", "Funktioniert das Licht?", "licht");
 nlp.addDocument("de", "Ist das Licht an", "licht");
 nlp.addDocument("de", "Ist das Licht aus", "licht");
 nlp.addDocument("de", "Wie ist der Status vom Licht", "licht");
 nlp.addDocument("de", "Licht", "licht");

 //intent Flüssiggas
 nlp.addDocument("de", "Was ist der Flüssiggasgehalt?", "fluessiggas");
 nlp.addDocument("de", "Wie hoch ist der Flüssiggasgehalt", "fluessiggas");
 nlp.addDocument("de", "Flüssiggasgehalt", "fluessiggas");
 nlp.addDocument("de", "Flüssiggasgehalt bitte", "fluessiggas");
 nlp.addDocument("de", "Gebe mir bitte denFlüssiggasgehalt bitte", "fluessiggas");
 nlp.addDocument("de", "Welchen Wert hat das Flüssiggas", "fluessiggas");
 nlp.addDocument("de", "Flüssiggas", "fluessiggas");

 //intent bewegung
 nlp.addDocument("de", "Funktioniert der Bewegungssensor?", "bewegung");
 nlp.addDocument("de", "Ist der Bewegungssensor an", "bewegung");
 nlp.addDocument("de", "Ist der Bewegungssensor aus", "bewegung");
 nlp.addDocument("de", "Wie ist der Status des Bewegungssensors", "bewegung");

 //intent rauch
 nlp.addDocument("de", "Wie groß ist die Rauchentwicklung?", "rauch");
 nlp.addDocument("de", "Welche Rauchentwicklung wird erwartet?", "rauch");
 nlp.addDocument("de", "Wie ist die Rauchentwicklung?", "rauch");
 nlp.addDocument("de", "Rauchentwicklung", "rauch");
 nlp.addDocument("de", "Rauchentwicklung bitte", "rauch");

  // Train also the NLG
  // nlp.addAction("greetings.hello", "getWeather", "", weatherinfo);
  //nlp.addAction("temperatur", "get_request", "", send_request);
  nlp.addAnswer(
    "de",
    "temperatur",
    "Die Temperatur der Maschine in Grad beträgt: "
  );
  nlp.addAnswer("de", "kohlenstoffmonoxid", "Der voraussichtliche Kohlenstoffmonoxidgehalt beträgt(absolut): ");
  nlp.addAnswer("de", "luftfeuchtigkeit", "Die Luftfeuchtigkeit in Prozent beträgt: ");
  nlp.addAnswer("de", "licht", "Das Licht ist: ");
  nlp.addAnswer("de", "fluessiggas", "Der voraussichtliche Flüssiggasgehalt beträgt(absolut): ");
  nlp.addAnswer("de", "bewegung", "Der Bewegungssensor ist: ");
  nlp.addAnswer("de", "rauch", "Die voraussichtliche Rauchentwicklung beträgt(absolut): ");

  await nlp.train();
  nlp_model = nlp;
  console.log(nlp_model == null);

  //console.log(response);
  //console.log(response.intent);
}
train_model();

//async function to process string with trained model
async function get_intent(s) {
  const response = await nlp_model.process("de", s);
  return [response.intent, response.answer];
}

async function process_speech_text(msg) {
  //process string with model to get intent
  var intent = await get_intent(msg);
  //check if no intent found
  if (intent[0] == "None") {
    alert("Ich konnte dich leider nicht verstehen");
    return;
  }
  console.log(intent[0]);
  console.log(intent[1]);

  //BASE URL+intent matches the API Route at the webserver
  const api_route = url.concat(String(intent[0]));
  //send request and build up message
  fetch(api_route)
    .then((response) => response.text())
    .then((res) => alert(intent[1] + res))
    .catch((error) => console.error(error));
}

async function uploadAudioAsync(uri) {
  //uploading audio to server for speech to text
  console.log("Uploading " + uri);
  let apiUrl = url + "/voice";
  let uriParts = uri.split(".");
  let fileType = uriParts[uriParts.length - 1];

  let formData = new FormData();
  formData.append("file", {
    uri,
    name: `recording.${fileType}`,
    type: `audio/x-${fileType}`,
  });

  let options = {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  };

  console.log("POSTing " + uri + " to " + apiUrl);
  fetch(apiUrl, options)
    .then((response) => response.json())
    .then((data) => {
      process_speech_text(data);
      console.log(data); // JSON data parsed by `data.json()` call
    })
    .catch((error) => console.error(error));
}

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

  //Erhalte Daten von Server muss String sein da man sonst nicht auf die Daten zugreifen kann
  async function getData(messages) {
    //extract message from array
    var string_message = messages[0].text;
    console.log(messages[0].text);
    //process string with model to get intent
    var intent = await get_intent(string_message);
    //check if no intent found
    if (intent[0] == "None") {
      return buildMessage(null, null);
    }

    console.log(intent[0]);
    console.log(intent[1]);
    //BASE URL+intent matches the API Route at the webserver
    const api_route = url.concat(String(intent[0]));
    //send request and build up message
    fetch(api_route)
      .then((response) => response.text())
      .then((res) => buildMessage(res, intent[1]))
      .catch((error) => console.error(error));
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
  var haveRecordingPermissions = false;
  var recording2 = null;

  async function record() {
    if (recording2 != null) {
      console.log("There is still a recording");
      return;
    }
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });
    const recording = new Audio.Recording();
    try {
      console.log(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      const settings = {
        android: {
          audioEncoder: 3,
          bitRate: 128000,
          extension: ".m4a",
          numberOfChannels: 2,
          outputFormat: 2,
          sampleRate: 44100,
        },
        ios: {
          extension: ".wav",
          outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_LINEARPCM,
          audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MIN,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
      };
      await recording.prepareToRecordAsync(settings);
      recording2 = recording;
      await recording.startAsync();
      console.log("You are now recording!");
      // You are now recording!
    } catch (error) {
      // An error occurred!
      console.log(error);
    }
  }
  async function stop_recording() {
    if (recording2 == null) {
      console.log("There is no recording to stop");
      return;
    }
    try {
      await recording2.stopAndUnloadAsync();
      console.log("recording stopped");
      await uploadAudioAsync(recording2.getURI());
      recording2 = null;
    } catch (error) {
      // On Android, calling stop before any data has been collected results in
      // an E_AUDIO_NODATA error. This means no audio data has been written to
      // the output file is invalid.
      if (error.code === "E_AUDIO_NODATA") {
        console.log(
          `Stop was called too quickly, no data has yet been received (${error.message})`
        );
      } else {
        console.log("STOP ERROR: ", error.code, error.name, error.message);
      }
    }
  }

  async function askForPermissions() {
    const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    haveRecordingPermissions = response.status === "granted";
  }
  askForPermissions();
  const styles = StyleSheet.create({
    baseText: {
      fontFamily: "Cochin",
    },
    titleText: {
      fontSize: 20,
      fontWeight: "bold",
    },
  });
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableWithoutFeedback onPressIn={record} onPressOut={stop_recording}>
        <View>
          <Text style={styles.titleText}>Press And Hold Me</Text>
        </View>
      </TouchableWithoutFeedback>
      {/* <Button
        onPress={record}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <Button
        onPress={stop_recording}
        title="STOP"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      /> */}
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
