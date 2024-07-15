import React, { useState, useRef } from 'react';
import { View, ScrollView, StyleSheet,Text } from 'react-native';
import { Video } from 'expo-av';
import { useNavigation } from '@react-navigation/native';

const videoFiles = [
  require('../../../assets/vedios/crying.mp4'),
  require('../../../assets/vedios/squat.mp4'),
];

const Videos = () => {
  const [playingVideo, setPlayingVideo] = useState(null);
  const videoRefs = useRef([]);

  const navigation = useNavigation();

  const handleFullScreen = (index) => {
    if (playingVideo !== index) {
      videoRefs.current[index]?.presentFullscreenPlayer();
      setPlayingVideo(index);
    } else {
      videoRefs.current[index]?.dismissFullscreenPlayer();
      setPlayingVideo(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Videos</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {videoFiles.map((videoSource, index) => {
          const isPlaying = playingVideo === index;
          return (
            <View key={index} style={styles.videoContainer}>
              <Video
                ref={(ref) => (videoRefs.current[index] = ref)}
                source={videoSource}
                style={styles.video}
                shouldPlay={isPlaying}
                resizeMode="contain"
                isLooping
                useNativeControls
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  videoContainer: {
    marginBottom: 20,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000', // Black shadow color
    shadowOffset: { width: 0, height: 4 }, // Offset of the shadow
    shadowOpacity: 0.3, // Opacity of the shadow
    shadowRadius: 4.65, // Radius of the shadow
    elevation: 8, // Elevation for Android
    backgroundColor: 'white', // Background color for shadow effect
    borderRadius: 10, // Rounded corners
  },
  video: {
    width: '100%',
    height: 280,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default Videos;
