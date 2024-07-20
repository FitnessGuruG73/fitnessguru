




// import React, { useEffect, useRef, useState } from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';
// import { Camera } from 'expo-camera/legacy';
// import * as Speech from 'expo-speech';
// import config from '../../../config';
// const startedUrl = `${config.SERVER_URL}/video_feed`; 

// const Started= () => {
//   const cameraRef = useRef(null);
//   const [hasPermission, setHasPermission] = useState(null);
//   const [exerciseStatus, setExerciseStatus] = useState('');
//   const [recording, setRecording] = useState(false);
//   const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
//   const [intervalId, setIntervalId] = useState(null);
//   const [incorrectCount, setIncorrectCount] = useState(0);
//   const [noPoseCount, setNoPoseCount] = useState(0);
//   const [correctCount, setCorrectCount] = useState(0);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === 'granted'); 
//     })();
//   }, []);

//   const speakFeedback = (message) => {
//     Speech.speak(message, {
//       language: 'en',
//     });
//   };

//   const startStreaming = async () => {  
//     if (cameraRef.current && !recording) {
//       setRecording(true);
//       const id = setInterval(async () => {
//         if (cameraRef.current) {
//           const photo = await cameraRef.current.takePictureAsync({ base64: true, isAudioEnabled: false });
//           const response = await fetch(startedUrl, {
//             method: 'POST',
//             body: JSON.stringify({ image: photo.base64 }),
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           });
//           const data = await response.json();
//           setExerciseStatus(data.status || 'Error fetching status');  

//           // Speak feedback based on exercise status
//           if (data.status === "Incorrect") {
//             console.log("Incorrect")
//             setIncorrectCount(prevCount => {
//               const newCount = prevCount + 1;
//               if (newCount % 1 === 0) {  
//                 console.log("Incorrect frm") 
//                 speakFeedback("Your form is incorrect. Please correct it.");
//               } 
//               return newCount;
//             });
//             setNoPoseCount(0); // Reset no pose count
//             setCorrectCount(0); // Reset correct count
//           } else if (data.status === "Correct") {
//             setCorrectCount(prevCount => {
//               const newCount = prevCount + 1;
//               if (newCount % 1 === 0) {
//                 speakFeedback("Great, keep doing");  
//               }
//               return newCount;
//             });
//             setIncorrectCount(0); // Reset incorrect count
//             setNoPoseCount(0); // Reset no pose count
//           } else if (data.status === "No pose detected") {
//             setNoPoseCount(prevCount => {
//               const newCount = prevCount + 1;
//               if (newCount % 3 === 0) {
//                 speakFeedback("No pose detected. Please assume the correct position."); 
//               }
//               return newCount;
//             });
//             setIncorrectCount(0); // Reset incorrect count
//             setCorrectCount(0); // Reset correct count
//           } else {
//             speakFeedback("Error fetching status");
//           }
//         }
//       }, 1000); // Send a frame every second

//       setIntervalId(id); // Store the interval ID for clearing later
//     }
//   };

//   const stopStreaming = () => {
//     if (recording) {
//       setRecording(false);
//       if (intervalId) {
//         clearInterval(intervalId);
//         setIntervalId(null); // Clear the stored interval ID
//       }
//     }
//   };

//   const toggleCameraType = () => {
//     setCameraType(prevType =>
//       prevType === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back
//     );
//   };

//   const getStatusStyle = () => {
//     return exerciseStatus === "Correct" ? styles.correct : exerciseStatus === "Incorrect" ? styles.incorrect : styles.default;
//   };

//   if (hasPermission === null) {
//     return <View />;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <Camera ref={cameraRef} style={styles.camera} type={cameraType} />
//       <View style={styles.buttonContainer}>
//         <Button
//           title={recording ? "Stop Streaming" : "Start Streaming"}
//           onPress={recording ? stopStreaming : startStreaming}
//           color="#841584"
//         />
//         <Button title={`Switch to ${cameraType === Camera.Constants.Type.back ? 'Front' : 'Back'} Camera`} onPress={toggleCameraType} />
//       </View>
//       <Text style={[styles.statusText, getStatusStyle()]}>Status: {exerciseStatus}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   camera: {
//     flex: 1,
//     width: '100%',
//     justifyContent: 'flex-end',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     padding: 10,
//   },
//   statusText: {
//     fontSize: 20,
//     marginTop: 20,
//   },
//   correct: {
//     color: 'green',
//   },
//   incorrect: {
//     color: 'red',
//   },
//   default: {
//     color: 'black',
//   },
// });

// export default Started;


// import React, { useEffect, useRef, useState } from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';
// import { Camera } from 'expo-camera/legacy';
// import * as Speech from 'expo-speech';
// import config from '../../../config';
// const startedUrl = `${config.SERVER_URL}/video_feed`;

// const Started= () => {
//   const cameraRef = useRef(null);
//   const [hasPermission, setHasPermission] = useState(null);
//   const [exerciseStatus, setExerciseStatus] = useState('');
//   const [recording, setRecording] = useState(false);
//   const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
//   const [intervalId, setIntervalId] = useState(null);
//   const [incorrectCount, setIncorrectCount] = useState(0);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

//   const speakFeedback = (message) => {
//     Speech.speak(message, {
//       language: 'en',
//     });
//   };

//   const startStreaming = async () => {
//     if (cameraRef.current && !recording) {
//       setRecording(true);
//       const id = setInterval(async () => {
//         if (cameraRef.current) {
//           const photo = await cameraRef.current.takePictureAsync({ base64: true, isAudioEnabled: false });
//           const response = await fetch(startedUrl, {
//             method: 'POST',
//             body: JSON.stringify({ image: photo.base64 }),
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           });
//           const data = await response.json();
//           setExerciseStatus(data.status || 'Error fetching status');  

//           // Speak feedback based on exercise status
//           if (data.status === "Incorrect") {
//             setIncorrectCount(prevCount => {
//               const newCount = prevCount + 1;
//               if (newCount % 7=== 0) {
//                 speakFeedback("Your form is incorrect. Please correct it.");
//               }
//               return newCount;
//             });
//           } else if (data.status === "Correct") {
//             speakFeedback("Great, keep doing");
//             setIncorrectCount(0); // Reset incorrect count
//           }
//         }
//       }, 1000); // Send a frame every second

//       setIntervalId(id); // Store the interval ID for clearing later
//     }
//   };

//   const stopStreaming = () => {
//     if (recording) {
//       setRecording(false);
//       if (intervalId) {
//         clearInterval(intervalId);
//         setIntervalId(null); // Clear the stored interval ID
//       }
//     }
//   };

//   const toggleCameraType = () => {
//     setCameraType(prevType =>
//       prevType === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back
//     );
//   };

//   const getStatusStyle = () => {
//     return exerciseStatus === "Correct" ? styles.correct : exerciseStatus === "Incorrect" ? styles.incorrect : styles.default;
//   };

//   if (hasPermission === null) {
//     return <View />;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <Camera ref={cameraRef} style={styles.camera} type={cameraType} />
//       <View style={styles.buttonContainer}>
//         <Button
//           title={recording ? "Stop Streaming" : "Start Streaming"}
//           onPress={recording ? stopStreaming : startStreaming}
//           color="#841584"
//         />
//         <Button title={`Switch to ${cameraType === Camera.Constants.Type.back ? 'Front' : 'Back'} Camera`} onPress={toggleCameraType} />
//       </View>
//       <Text style={[styles.statusText, getStatusStyle()]}>Status: {exerciseStatus}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   camera: {
//     flex: 1,
//     width: '100%',
//     justifyContent: 'flex-end',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     padding: 10,
//   },
//   statusText: {
//     fontSize: 20,
//     marginTop: 20,
//   },
//   correct: {
//     color: 'green',
//   },
//   incorrect: {
//     color: 'red',
//   },
//   default: {
//     color: 'black',
//   },
// });

// export default Started;




// import React, { useEffect, useRef, useState } from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';
// import { Camera } from 'expo-camera/legacy';
// import * as Speech from 'expo-speech';
// import config from '../../../config';
// const startedUrl = `${config.SERVER_URL}/video_feed`;  

// const Started = () => {
//   const cameraRef = useRef(null);
//   const [hasPermission, setHasPermission] = useState(null);
//   const [exerciseStatus, setExerciseStatus] = useState('');
//   const [recording, setRecording] = useState(false);
//   const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
//   const [intervalId, setIntervalId] = useState(null);
//   const [incorrectCount, setIncorrectCount] = useState(0);
//   const [noPoseCount, setNoPoseCount] = useState(0);
//   const [correctCount, setCorrectCount] = useState(0);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === 'granted'); 
//     })();
//   }, []);

//   const speakFeedback = (message) => {
//     Speech.speak(message, {
//       language: 'en',
//     });
//   };

//   const startStreaming = async () => {
//     if (cameraRef.current && !recording) {
//       setRecording(true);
//       const id = setInterval(async () => {
//         try {
//           if (cameraRef.current) {
//             const photo = await cameraRef.current.takePictureAsync({ base64: true, isAudioEnabled: false });
//             const response = await fetch(startedUrl, {
//               method: 'POST',
//               body: JSON.stringify({ image: photo.base64 }),
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//             });
//             const data = await response.json();
//             const newStatus = data.status || 'Error fetching status';
//             setExerciseStatus(newStatus);

//             // Speak feedback based on exercise status
//             if (newStatus === "Incorrect") {
//               setIncorrectCount(prevCount => {
//                 const newCount = prevCount + 1;
//                 if (newCount % 3 === 0) {
//                   speakFeedback("Your form is incorrect. Please correct it.");
//                 }
//                 return newCount;
//               });
//               setNoPoseCount(0); // Reset no pose count
//               setCorrectCount(0); // Reset correct count
//             } else if (newStatus === "Correct") {
//               setCorrectCount(prevCount => {
//                 const newCount = prevCount + 1;
//                 if (newCount === 1) {
//                   speakFeedback("Great, keep doing");
//                 }
//                 return newCount;
//               });
//               setIncorrectCount(0); // Reset incorrect count
//               setNoPoseCount(0); // Reset no pose count
//             } else if (newStatus === "No pose detected") {
//               setNoPoseCount(prevCount => {
//                 const newCount = prevCount + 1;
//                 if (newCount % 5 === 0) {
//                   speakFeedback("No pose detected. Please assume the correct position.");
//                 }
//                 return newCount;
//               });
//               setIncorrectCount(0); // Reset incorrect count
//               setCorrectCount(0); // Reset correct count
//             } else {
//               setIncorrectCount(0);
//               setCorrectCount(0);
//               setNoPoseCount(0);
//             }
//           }
//         } catch (error) {
//           console.error('Error during streaming:', error);
//           setRecording(false);
//           if (intervalId) {
//             clearInterval(intervalId);
//             setIntervalId(null); // Clear the stored interval ID
//           }
//         }
//       }, 1000); // Send a frame every second

//       setIntervalId(id); // Store the interval ID for clearing later
//     }
//   };

//   const stopStreaming = () => {
//     if (recording) {
//       setRecording(false);
//       if (intervalId) {
//         clearInterval(intervalId);
//         setIntervalId(null); // Clear the stored interval ID
//       }
//     }
//   };

//   const toggleCameraType = () => {
//     setCameraType(prevType =>
//       prevType === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back
//     );
//   };

//   const getStatusStyle = () => {
//     return exerciseStatus === "Correct" ? styles.correct : exerciseStatus === "Incorrect" ? styles.incorrect : styles.default;
//   };

//   if (hasPermission === null) {
//     return <View />;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <Camera ref={cameraRef} style={styles.camera} type={cameraType} />
//       <View style={styles.buttonContainer}>
//         <Button
//           title={recording ? "Stop Streaming" : "Start Streaming"}
//           onPress={recording ? stopStreaming : startStreaming}
//           color="#841584"
//         />
//         <Button title={`Switch to ${cameraType === Camera.Constants.Type.back ? 'Front' : 'Back'} Camera`} onPress={toggleCameraType} />
//       </View>
//       <Text style={[styles.statusText, getStatusStyle()]}>Status: {exerciseStatus}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   camera: {
//     flex: 1,
//     width: '100%',
//     justifyContent: 'flex-end',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     padding: 10,
//   },
//   statusText: {
//     fontSize: 20,
//     marginTop: 20,
//   },
//   correct: {
//     color: 'green',
//   },
//   incorrect: {
//     color: 'red',
//   },
//   default: {
//     color: 'black',
//   },
// });

// export default Started;





import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera/legacy';
import * as Speech from 'expo-speech';
import config from '../../../config';
const startedUrl = `${config.SERVER_URL}/video_feed`; 

const Started = () => {
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null); 
  const [exerciseStatus, setExerciseStatus] = useState('');
  const [recording, setRecording] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [intervalId, setIntervalId] = useState(null);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [noPoseCount, setNoPoseCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted'); 
    })();
  }, []);

 const speakIncorrectFeedback = () => {
    console.log("incorrect");
    Speech.speak("Your form is incorrect. Please correct it.", {
      language: 'en',
      pitch: 1.0,
      rate: 1.0,
      onError: (error) => console.log('Error in Speech:', error),
    });
  };

  const speakCorrectFeedback = () => {
    console.log("correct form");
    Speech.speak("Great, keep doing", {
      language: 'en',
      pitch: 1.0,
      rate: 1.0,
      onError: (error) => console.log('Error in Speech:', error),
    });
  };
  const speaknopose = () => {
    console.log("no pose detected")
    Speech.speak("No pose detected ensure camera is correctly placed ",{
      language:'en',
      pitch: 1.0,
      rate:1.0,
      onError: (error) => console.log("error in pose",error),
    })
  }

  const startStreaming = async () => {  
    if (cameraRef.current && !recording) {
      setRecording(true);
      const id = setInterval(async () => {
        if (cameraRef.current) {
          const photo = await cameraRef.current.takePictureAsync({ base64: true, isAudioEnabled: false });
          const response = await fetch(startedUrl, {
            method: 'POST',
            body: JSON.stringify({ image: photo.base64 }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
          console.log(data);
          setExerciseStatus(data.status || 'Error fetching status');  

        if (data.message === "INCORRECT FORM") {
            speakIncorrectFeedback();
          } 
          else if (data.status === "Correct") {
            
            speakCorrectFeedback();
          }
          else if (data.message === "No pose detected")
          {
            speaknopose();
          }
        }
      }, 5000); // Send a frame every second

      setIntervalId(id); // Store the interval ID for clearing later
    }
  };

  const stopStreaming = () => {
    if (recording) {
      setRecording(false);
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null); // Clear the stored interval ID
      }
    }
  };

  const toggleCameraType = () => {
    setCameraType(prevType =>
      prevType === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back
    );
  };

  const getStatusStyle = () => {
    return exerciseStatus === "Correct" ? styles.correct : exerciseStatus === "Incorrect" ? styles.incorrect : styles.default;
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera ref={cameraRef} style={styles.camera} type={cameraType} />
      <View style={styles.buttonContainer}>
        <Button
          title={recording ? "Stop Streaming" : "Start Streaming"}
          onPress={recording ? stopStreaming : startStreaming}
          color="#841584"
        />
        <Button title={`Switch to ${cameraType === Camera.Constants.Type.back ? 'Front' : 'Back'} Camera`} onPress={toggleCameraType} />
      </View>
      <Text style={[styles.statusText, getStatusStyle()]}>Status: {exerciseStatus}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  statusText: {
    fontSize: 20,
    marginTop: 20,
  },
  correct: {
    color: 'green',
  },
  incorrect: {
    color: 'red',
  },
  default: {
    color: 'black',
  },
});

export default Started;





