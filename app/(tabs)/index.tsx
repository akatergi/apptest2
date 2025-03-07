import { Image, StyleSheet, Platform, View, Text } from 'react-native';

import { PERMISSIONS, request, check } from 'react-native-permissions';
import Vapi from '@vapi-ai/react-native';
import { useEffect, useState } from 'react';

export default function HomeScreen() {
  const [interactionState, setInteractionState] = useState("inactive");
  const vapi = new Vapi("c7c15505-4302-4668-87be-20697f0fbb50"); // Replace with your actual public token

  useEffect(() => {
    vapi.on("call-end", () => setInteractionState("inactive"));
    vapi.on("speech-start", () => setInteractionState("aiTalking"));
    vapi.on("speech-end", () => setInteractionState("listening"));
    vapi.on("error", (error) => console.log(error));
    vapi.on('call-start', () => setInteractionState("started"));

    // Function calls and transcripts will be sent via messages
    vapi.on('message', (message) => {
      console.log(message);
    });

    vapi.on('error', (e) => {
      console.error(e);
    });

    return () => {
      vapi.removeAllListeners();
    };
  }, []);

  return (
    <View>
      <Text onPress={() => {
        request(PERMISSIONS.IOS.MICROPHONE).then(() => {
          vapi.start("722b4b8f-793d-4740-b61f-7b3921dc6ceb")
            .then((res) => {
              console.log("Vapi started", res);
            })
            .catch((error) => {
              console.error(error);
            });
        })
      }} style={{ top: 100, backgroundColor: 'red', padding: 10, borderRadius: 10, margin: 10, textAlign: 'center' }}>Start Call</Text>
      <Text style={{ top: 110, backgroundColor: 'lightblue', padding: 10, borderRadius: 10, margin: 10, textAlign: 'center' }}>{interactionState}</Text>
    </View>

  );
}