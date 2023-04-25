import { StyleSheet, Text, View, TouchableOpacity, Image, useWindowDimensions, NativeEventEmitter, LogBox, ImageBackground, TextInput ,  } from 'react-native'
import React, { useState, useEffect } from 'react'
import Voice from '@react-native-community/voice';
import { ScrollView } from 'react-native-gesture-handler';
import Tts from 'react-native-tts';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import { GiftedChat } from 'react-native-gifted-chat'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon1 from 'react-native-vector-icons/dist/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";

export default function AI() {

  LogBox.ignoreLogs(['new NativeEventEmitter']);  // Ignore log notification by message
  LogBox.ignoreAllLogs();  // Ignore all log notifications

  const { width, height } = useWindowDimensions()
  const [result, setResult] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [recognized, setRecognized] = useState('');
  const [message, setMessage] = useState([]);
  const [started, setStarted] = useState(false);
  const [error, setError] = useState()
  const [IsRecording, setIsRecording] = useState('')
  const [IsSpeak, setIsSpeak] = useState('')
  const [IsTriger, setIsTriger] = useState(false)
  const [subTrigger, setSubtrigger] = useState(false)
  const [inputMessage, setInputMessage] = useState("");
  const [outputMessage, setOutputMessage] = useState("The output message");
  const [IsOrNot , setIsOrNot] = useState(false)
  const [StartT , setStartT] = useState(false)
  const [WelcomSp , setWelcomSp] = useState('')
  useEffect(() => {

// Voice.onSpeechEnd()
console.log(Voice);

  },[])

  const setRecodingResult = (data)=>{
    
    setResult(data)
  }
  

  Voice.onSpeechEnd = () => setIsRecording(false)
  Voice.onSpeechError = err => setError(err.error)
  Voice.onSpeechResults = (result) => setRecodingResult(result.value[0])
  

  const handleTextInputMessage = (text) => {
    console.log(text);
    setInputMessage(text);
  };


useEffect(()=>{
  setInterval(() => {
    setStartT(true)
    
  }, 2500);
})




  const startRecording = async () => {
    // Voice.onSpeechRecognized((res)=>console.log(res))

    await Voice.start('en-Us')

  };


  const stopRecording = async () => {
console.log("stpo recoding*****");
    setStarted(false)
    setLoading(false) 
    setIsOrNot(true)
     await Voice.stop()

  }

  function stop() {
    Tts.stop();
  }
  

  // jestin xavier

  useEffect(() => {
 if(!IsTriger){
  console.log("trigger startted******");
   startRecording()
 }
 else{
  stopRecording()
 }

 
  }, [IsTriger,startRecording])




  const TextToSpeech = (data)=>{
    // console.log(IsTriger,'text to speech');
// if(IsTriger){
  return(  Tts.speak(data, {
      androidParams: {
        KEY_PARAM_PAN: -1,
        KEY_PARAM_VOLUME: 0.3,
        KEY_PARAM_STREAM: 'STREAM_MUSIC',
      },
    })
 )
//  }
  }



const triggerGenerate =(data)=>{
  console.log("****trigger");
  setIsTriger(data)
}
const initialSetResult = ()=>{
  setResult("")
}


  useEffect(() => {

    console.log(result, result === "Alexa" || result === "hi Alexa" || result === "hey Alexa", "******hey dana*****");


 

    // if (result === "Dana" || result === "hi Dana" || result === "hey Dana" || result == "hi Dyna" || result === "hi Diana"  ) {
    if (result === "Alexa" || result === "hi Alexa" || result === "hey Alexa") {


      // setInterval(()=>{
      //   console.log("Triggger after 7000");
      //   return triggerGenerate(false)
      // },7000)
      triggerGenerate(true)
      initialSetResult()
      stopRecording().then(()=>{
        TextToSpeech("HI i am Alexa ")
       
        .then(async()=>{
          Voice.cancel((res)=>console.log('voice cancel',res))              
        })
 
      }).then(()=>startRecording())
      console.log(result.length > 0 && IsTriger);

    } 
  }, [result])

const VoiceController =  (data)=>{
  setIsTriger(data)
  
}

  useEffect(() => {
    console.log(result.length > 0, IsTriger,"********IsTriger",result);
    
    if (result.length > 0 ) {
      VoiceController(true)
      // if(IsTriger){
      //   console.log(IsTriger,+"+++++++++++++++++++++++++++++++++++++++++++++++");

      // fetch("https://api.openai.com/v1/chat/completions", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization:
      //       "Bearer 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",
      //   },
      //   body: JSON.stringify({
      //     // "prompt": inputMessage,
      //     messages: [{ role: "user", content: result }],
      //     // "model": "text-davinci-003",
      //     model: "gpt-3.5-turbo",
      //   }),
      // })
      //   .then((res) => res.json())
      //   .then((data) => {
      //     console.log(data);
      //     console.log(data?.choices[0].message?.content);
      //     setIsSpeak(data?.choices[0].message?.content)
      //     TextToSpeech(data?.choices[0].message?.content)

      //     // Tts.speak(data?.choices[0].message?.content, {
      //     //   androidParams: {
      //     //     KEY_PARAM_PAN: -1,
      //     //     KEY_PARAM_VOLUME: 0.5,
      //     //     KEY_PARAM_STREAM: 'STREAM_MUSIC',
      //     //   },
      //     // });

        

      //   }).then(()=>VoiceController(false))
      // }
    }
  }, [result])

  useEffect(() => {
    console.log(IsTriger,"trigger*****");
    if(IsTriger){
    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer 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",
      },
      body: JSON.stringify({
        // "prompt": inputMessage,
        messages: [{ role: "user", content: result }],
        // "model": "text-davinci-003",
        model: "gpt-3.5-turbo",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(data?.choices[0].message?.content);
        setIsSpeak(data?.choices[0].message?.content)
        TextToSpeech(data?.choices[0].message?.content)

        // Tts.speak(data?.choices[0].message?.content, {
        //   androidParams: {
        //     KEY_PARAM_PAN: -1,
        //     KEY_PARAM_VOLUME: 0.5,
        //     KEY_PARAM_STREAM: 'STREAM_MUSIC',
        //   },
        // });

      

      })  
      setTimeout(function (){
        VoiceController(false)
      }
        , 5000);
      
    }

  }, [IsTriger])
  
  





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



  useEffect(() => {
    console.log(result);
  })




  return (
    <View style={styles.container}>


   
   

  <View style={{flex : 1 , backgroundColor:'#000' , alignItems:'center' , justifyContent:'space-between' }}>

    

  <View style={{top:40 , alignItems:'center'}}>

    <ImageBackground style={{height:235 , width:235  }} imageStyle={{borderRadius:200}} source={require('../assets/Siri.gif')}>

    </ImageBackground>



    <View style={{alignItems:'center' ,}}>

      <View style={{ width:responsiveWidth(90) , height:responsiveHeight(30) , backgroundColor:'#000'  , alignItems:'center'}}>

      <Text style={{color:'#fff' , fontSize:25 , fontWeight:'200'}}>{result}</Text>

      </View>

    </View>
   

    </View>
    


     
        <TouchableOpacity onPress={() => startRecording()} style={styles.floatingButton}>
          <View style={styles.buttonContainer}>
            {result == false ?



              <ImageBackground  style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }} imageStyle={{ borderRadius: 200, elevation: 4, }} source={{ uri: 'https://img.freepik.com/free-photo/gradient-blue-abstract-background-smooth-dark-blue-with-black-vignette-studio_1258-66994.jpg' }}>

                <Image style={{ width: 30, height: 30 }} source={require('../assets/Mic.png')} />

              </ImageBackground>



              :

              <TouchableOpacity style={{alignItems:'center' , justifyContent:'center'}} onPress={() => stop()}>

                <ImageBackground style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }} imageStyle={{ borderRadius: 200, elevation: 4, }} source={require('../assets/But.png')}>


                </ImageBackground>
              </TouchableOpacity>
            }
          </View>
        </TouchableOpacity>

        </View>



    </View>
  )
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