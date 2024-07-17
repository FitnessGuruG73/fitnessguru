import React, { useState, useRef } from 'react';
import { View, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Search = () => {
  const [playingVideo, setPlayingVideo] = useState(null);
  const videoRefs = useRef([]);
  const navigation = useNavigation();


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {/* Add your video components or other content here */}
      </ScrollView>
      <View style={styles.searchContainer}>
          <MaterialCommunityIcons name="chat-processing-outline" size={24} color="#00acc1" />
          <TextInput
            placeholder="Enter your prompt.."
            style={styles.textInput}
            pointerEvents="none"
          />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 70, // Ensure content is not hidden behind the search bar
  },
  searchContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    borderColor: 'transparent',
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
