import React, {useState, useCallback, useEffect} from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {GiftedChat} from 'react-native-gifted-chat';


export function Chat() {
    //State mit Nachrichten
    const [messages, setMessages] = useState([]);
    //State mit Daten
    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hallo du kannst mir jede Frage stellen!!',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'Bot',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ]);
    }, []);
    //Schreibt eigene Nachricht in Chat
    const onSend = useCallback((messages = []) => {
        setMessages(
            (previousMessages) => GiftedChat.append(previousMessages, messages),
            //console.log(messages[0].text),
        );
    }, []);
    //Erhalte Daten von Server muss String sein da man sonst nicht auf die Daten zugreifen kann
    function getData() {
        const r = Math.floor(Math.random() * 4); //Nur zum Testen von verschiedenen Anfragen
        // hier würde ich das nlp ein bauen
        let api = 'http://127.0.0.1:5000/';
        if (r % 2 == 0) {
            api = api + 'v3';
        } else {
            api = api + 'v4';
        }
        fetch(api)
            .then((response) => response.json())
            .then((res) => buildMessage([res]))
            .catch((error) => console.error(error));
    }

    function buildMessage(data) {

        //Nachrichtenformat
        const msg = {
            _id: new Date(), //Erstellet zufällige ID wird benötigt Datum wiederholt sich nie
            text: '',
            createdAt: new Date(),
            user: {
                _id: 2,
                name: 'Bot',
                avatar: 'https://placeimg.com/140/140/any',
            },
        };
        const a = 'Morgen scheint die Sonne und es wird ';
        msg.text = a + data;
        //Schreib Nachricht des Bots in den Chat
        setMessages((previousMessages) => GiftedChat.append(previousMessages, msg));
    }
    const handleSend = (messages) => {
        onSend(messages), getData();
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
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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


