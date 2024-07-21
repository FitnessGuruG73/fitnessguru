import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, TextInput, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import config from '../../../config'; // Adjust the path as necessary

const modelUrl = `${config.SERVER_URL}/ask_pdf`;

const Prompt = () => {
  const [inputText, setInputText] = useState('');
  const [qaPairs, setQaPairs] = useState([]);
  const [questions, setQuestions] = useState([]);
  const navigation = useNavigation();

  const handleTextInputChange = (text) => {
    setInputText(text);
  };

  const handleSendInput = async () => {
    if (!inputText.trim()) return;
    const currentInput = inputText;
    setInputText('');

    try {
      const response = await fetch(modelUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: currentInput }),
      });
      const data = await response.json();
      console.log('Response from model:', data.answer);

      const newQaPairs = [...qaPairs, { question: currentInput, answer: data.answer }];
      setQaPairs(newQaPairs);
      setQuestions([...questions, currentInput]);

    } catch (error) {
      console.error('Error sending prompt to model:', error);
    }
  };

  const openDrawer = () => {
    navigation.openDrawer(); // Open the drawer
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 70 }}>
        {qaPairs.map((qa, index) => (
          <View key={index} className="w-11/12 my-2 mx-auto">
            <View className="bg-transparent p-2 rounded">
              <Text className="text-gray-500 text-left">{qa.question}</Text>
            </View>
            <View className="bg-gray-200 p-2 mt-2 rounded">
              <Text className="text-gray-700 text-left">{qa.answer}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <View className="absolute bottom-0 w-full bg-white p-3 border-t border-gray-300 flex-row items-center shadow-md">
        <TouchableOpacity onPress={openDrawer}>
          <MaterialCommunityIcons name="menu" size={24} color="#00acc1" />
        </TouchableOpacity>
        <TextInput
          placeholder="Enter your prompt..."
          className="flex-1 ml-2 border-transparent"
          value={inputText}
          onChangeText={handleTextInputChange}
          onSubmitEditing={handleSendInput}
        />
        <TouchableOpacity onPress={handleSendInput}>
          <MaterialCommunityIcons name="send" size={24} color="#00acc1" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Prompt;
