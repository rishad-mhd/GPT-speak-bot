import { StyleSheet, Text, View , TouchableOpacity , Image, useWindowDimensions } from 'react-native'
import React , {useState , useEffect} from 'react'
import Voice from '@react-native-community/voice';
import { ScrollView } from 'react-native-gesture-handler';
import Tts from 'react-native-tts';


export default function AI() {
  const {width , height} = useWindowDimensions()
  const [result, setResult] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [recognized, setRecognized] = useState('');
  const [message, setMessage] = useState('');
  const [started, setStarted] = useState(false);
  const [error , setError] = useState()
  const [IsRecording , setIsRecording] = useState('')
  const [IsSpeak , setIsSpeak] = useState('')

useEffect(()=>{



})
  Voice.onSpeechEnd = () => setIsRecording(false)
  Voice.onSpeechError = err => setError(err.error)
  Voice.onSpeechResults = (result) => setResult(result.value[0])







 

  const startRecording = async () => {
    setStarted(true);
    setLoading(true);

      await Voice.start('en-Us');

  };

// jestin xavier
  useEffect(() => {
    startRecording()
  }, [startRecording])
  

  useEffect(()=>{

    console.log(result , result.length > 0);
  if(result.length > 0) {  



    fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer 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",
    },
    body: JSON.stringify({
      // "prompt": inputMessage,
      messages: [{ role: "user", content: result}],
      // "model": "text-davinci-003",
      model: "gpt-3.5-turbo",
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
       console.log(data?.choices[0].message?.content);
       setIsSpeak(data?.choices[0].message?.content)
       Tts.speak(data?.choices[0].message?.content, {
        androidParams: {
          KEY_PARAM_PAN: -1,
          KEY_PARAM_VOLUME: 0.5,
          KEY_PARAM_STREAM: 'STREAM_MUSIC',
        },
      });
      

    });


  }


  }, [result])

  
  // const onSpeechResults = async (e) => {
  //   setRecognized(e.value[0]);
  //   console.log(e.value[0]);
  //   if (recognized === 'start conversation') {
  //     const response = await axios.post("https://api.openai.com/v1/chat/completions", {
  //       prompt: 'start conversation',
  //       max_tokens: 100,
  //       n: 1,
  //       stop: '.',
  //       temperature: 0.5,
  //     }, {
  //       headers: {
  //         'Authorization': 'Bearer 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',
  //         'Content-Type': 'application/json'
  //       }
  //     });
  //     setMessage(response.data.choices[0].text);
  //   } else if (recognized === 'send message') {
  //     const response = await axios.post("https://api.openai.com/v1/chat/completions", {
  //       prompt: 'send message',
  //       max_tokens: 100,
  //       n: 1,
  //       stop: '.',
  //       temperature: 0.5,
  //     }, {
  //       headers: {
  //         'Authorization': 'Bearer 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',
  //         'Content-Type': 'application/json'
  //       }
  //     });
  //     setMessage(response.data.choices[0].text);
  //   } else if (recognized === 'end conversation') {
  //     setMessage('Goodbye!');
  //   }
  // };

  // Voice.onSpeechResults = onSpeechResults;



  useEffect(()=> {
    console.log("+++++++++++",recognized);
    console.log('+++',message);
    console.log(result);
  })


  

  return (
    <View style={styles.container}>

  <ScrollView>
    <View style={{width : width , height : height / 5 , backgroundColor:'#000' }}>

      <View style={{flexDirection:'row' , marginLeft:20 , marginTop:20}} >

        <Text style={{color:'#fff' , fontSize:20}}>Q :</Text>

        <Text style={{color:'#fff' , marginLeft:10 , color:'violet' , fontSize:20 }}>{result}</Text>

      </View>
      <View>
        <Text style={{color:'#fff'}}>{message}</Text>
      </View>

    </View>
  </ScrollView>


<TouchableOpacity onPress={()=> startRecording()} style={styles.floatingButton}>
      <View style={styles.buttonContainer}>
        {started === false ?         <Image style={{height:33 , width:33}} source={require('../assets/O.png')}/>
:          <Image style={{height:33 , width:33}} source={require('../assets/S.png')}/>
}
      </View>
    </TouchableOpacity>

     

    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    flex : 1 ,
    backgroundColor:'#000' ,

  } ,

  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor:  '#7507a8' ,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // for android shadow effect
    shadowColor: '#000', // for ios shadow effect
    shadowOffset: { width: 0, height: 2 },
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


})