import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import Tts from 'react-native-tts';

const useTts = ({onSpeakEnd} = {}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [speed, setSpeed] = useState(0.5);
  const [pitch, setDefaultPitch] = useState(1.0);

  useEffect(() => {
    Tts.getInitStatus().then(() => {
      Tts.setDefaultRate(speed);
      Tts.setDefaultPitch(pitch);
      Tts.voices().then(setVoices);
    });
  }, []);

  const handleSpeakEnd = useCallback(() => {
    setIsSpeaking(false);
    onSpeakEnd && onSpeakEnd();
  }, [onSpeakEnd]);

  useEffect(() => {
    Tts.getInitStatus().then(() => {
      Tts.addEventListener('tts-finish', handleSpeakEnd);
    });
    return () => {
      Tts.getInitStatus().then(() => {
        Tts.removeEventListener('tts-finish', handleSpeakEnd);
      }); 
    };
  }, [handleSpeakEnd]);

  const speak = useCallback(async text => {
    setIsSpeaking(true);
    await Tts.speak(text);
  }, []);

  const stop = useCallback(async () => {
    setIsSpeaking(false);
    await Tts.stop();
  }, []);

  const pause = useCallback(async () => {
    setIsSpeaking(false);
    await Tts.pause();
  }, []);

  const resume = useCallback(async () => {
    setIsSpeaking(true);
    await Tts.resume();
  }, []);

  const setVoice = useCallback(voice => {
    setSelectedVoice(voice);
    Tts.setDefaultVoice(voice.id);
  }, []);

  const setRate = useCallback(rate => {
    setSpeed(rate);
    Tts.setDefaultRate(rate);
  }, []);

  const setPitch = useCallback(pitch => {
    setDefaultPitch(pitch);
    Tts.setDefaultPitch(pitch);
  }, []);

  return {
    isSpeaking,
    voices,
    selectedVoice,
    speed,
    pitch,
    speak,
    stop,
    pause,
    resume,
    setVoice,
    setRate,
    setPitch,
  };
};
export default useTts;
