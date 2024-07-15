import React, { useState, useRef } from 'react';
import { View, ScrollView, TouchableOpacity, TextInput, Button, StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const videoFiles = [
  require('../../../assets/vedios/crying.mp4'),
  require('../../../assets/vedios/squat.mp4'),
];

const Search = () => {
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
    <View className="flex-1 bg-white">
      <TouchableOpacity
        onPress={() => navigation.navigate('Search')}
        className="flex-row items-center bg-white rounded-lg p-3 m-3"
        style={styles.shadow}
      >
        <MaterialCommunityIcons name="magnify" size={24} color="#00acc1" />
        <TextInput
          placeholder="Search..."
          className="flex-1 ml-2 border-transparent"
          editable={false}
          pointerEvents="none"
        />
      </TouchableOpacity>
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
              <Button
                color="#00acc1"
                title={isPlaying ? 'Exit Full Screen' : 'Full Screen'}
                onPress={() => handleFullScreen(index)}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    alignItems: 'center',
  },
  videoContainer: {
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
    shadowColor: 'cyan',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  video: {
    width: '80%',
    height: 280,
    borderRadius: 10,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Search;
