import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import useSpeechToText from './useSpeechToText';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import axios from 'axios';
import useTts from './useTts';
import LetterAnimation from './LetterAnimation';

export default function SpeechToText() {
  const [bot, setBot] = useState(" ");
  const onSpeakEnd = useCallback(() => {
    startRecording();
  }, [startRecording]);
  const {speak} = useTts({
    onSpeakEnd,
  });

  const {
    error,
    isRecording,
    partialResults,
    results,
    startRecording,
    stopRecording,
    transcription,
  } = useSpeechToText({
    onSpeechEnd: result => {
      console.log(result, 'bj');
      axios
        .post(
          'https://api.openai.com/v1/completions',
          {
            prompt: `User: ${result}\nChatbot:`,
            model: 'text-davinci-003',
            max_tokens: 10,
            temperature: 0.7,
          },
          {
            headers: {
              Authorization: `Bearer <API-KEY>`,
              'Content-Type': 'application/json',
            },
          },
        )
        .then(response => {
          setBot(response.data.choices[0].text)
          speak(response.data.choices[0].text)
          console.log(response.data.choices[0].text);
        })
        .catch(error => {
          console.log(error);
          console.log(error.response);
        });
    },
  });
  useEffect(() => {
    startRecording();

    return () => {
      stopRecording();
    };
  }, []);
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#000',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{top: 40, alignItems: 'center'}}>
          <ImageBackground
            style={{height: 235, width: 235}}
            imageStyle={{borderRadius: 200}}
            source={require('../assets/Siri.gif')}></ImageBackground>

          <View style={{alignItems: 'center'}}>
            <View>
              <Text>{isRecording ? 'Recording' : 'Not recording'}</Text>
            </View>
            <View
              style={{
                width: responsiveWidth(90),
                height: responsiveHeight(30),
                backgroundColor: '#000',
                alignItems: 'center',
              }}>
              <Text style={{color: '#fff', fontSize: 25, fontWeight: '200'}}>
                {transcription}
              </Text>
              <LetterAnimation
                style={{
                  color: '#fff',
                  marginTop: 10,
                  fontSize: 25,
                  fontWeight: '200',
                }}
                text={bot}
              />
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => (!isRecording ? startRecording() : stopRecording())}
          style={styles.floatingButton}>
          <View style={styles.buttonContainer}>
            <ImageBackground
              style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              imageStyle={{borderRadius: 200, elevation: 4}}
              source={{
                uri: 'https://img.freepik.com/free-photo/gradient-blue-abstract-background-smooth-dark-blue-with-black-vignette-studio_1258-66994.jpg',
              }}>
              <Image
                style={{width: 30, height: 30}}
                source={require('../assets/Mic.png')}
              />
            </ImageBackground>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#5a40ad',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // for android shadow effect
    shadowColor: '#000', // for ios shadow effect
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  buttonContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
