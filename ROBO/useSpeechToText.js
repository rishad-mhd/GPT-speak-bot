import {useState, useEffect} from 'react';
import Voice from '@react-native-community/voice';

const useSpeechToText = ({onSpeechEnd} = {}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [error, setError] = useState(null);
  const [partialResults, setPartialResults] = useState([]);
  const [results, setResults] = useState({});

  useEffect(() => {
    Voice.onSpeechStart = () => {
      setIsRecording(true);
      setError(null);
      setPartialResults([]);
      setResults([]);
      console.log('Speech started');
    };

    let partialResultsTimer = null;
    Voice.onSpeechPartialResults = partialResults => {
      setPartialResults(partialResults);
      clearTimeout(partialResultsTimer);
      partialResultsTimer = setTimeout(() => {
        setPartialResults([]);
      }, 2000);
    };

    Voice.onSpeechResults = results => {
      setIsRecording(false);
      setResults(results);
      setTranscription(results.value[0]);
      console.log('Final results: ', results);
      onSpeechEnd(results.value[0]);
    };

    Voice.onSpeechError = error => {
      setIsRecording(false);
      setError(error);
      console.error('Speech error: ', error);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startRecording = async (language = 'en-US') => {
    try {
      await Voice.start(language,  );
      setIsRecording(true);
      console.log(`Recording started in ${language} language`);
    } catch (error) {
      setError(error);
      console.error('Recording error: ', error);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
      setIsRecording(false);
      console.log('Recording stopped');
    } catch (error) {
      setError(error);
      console.error('Recording error: ', error);
    }
  };

  return {
    startRecording,
    stopRecording,
    isRecording,
    transcription,
    error,
    partialResults,
    results,
  };
};

export default useSpeechToText;
