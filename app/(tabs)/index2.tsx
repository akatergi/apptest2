import { Image, StyleSheet, Platform, View, Text } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Vapi from '@vapi-ai/react-native';
import { useEffect, useState } from 'react';
const vapi = new Vapi("c511b347-7f29-4262-aa4d-4c0c44bebca1"); // Replace with your actual public token

export default function HomeScreen() {
  const [interactionState, setInteractionState] = useState("inactive");

  useEffect(() => {
    vapi.on("call-end", () => setInteractionState("inactive"));
    vapi.on("speech-start", () => setInteractionState("aiTalking"));
    vapi.on("speech-end", () => setInteractionState("listening"));
    vapi.on("error", (error) => console.log(error));
    vapi.on('speech-start', () => {
      console.log('Speech has started');
    });

    vapi.on('speech-end', () => {
      console.log('Speech has ended');
    });

    vapi.on('call-start', () => {
      console.log('Call has started');
    });

    vapi.on('call-end', () => {
      console.log('Call has stopped');
    });

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
        vapi.start("fad3fd83-bbba-4934-936d-e80a06b65620")
          .then((res) => {
            console.log("Vapi started", res);
          })
          .catch((error) => {
            console.error(error);
          });
      }} style={{ top: 100, backgroundColor: 'red', padding: 10, borderRadius: 10, margin: 10, textAlign: 'center' }}>Start Call</Text>
      <Text style={{ top: 110, backgroundColor: 'lightblue', padding: 10, borderRadius: 10, margin: 10, textAlign: 'center' }}>{interactionState}</Text>
    </View>

  );
}