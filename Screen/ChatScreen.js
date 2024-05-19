import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform, Dimensions, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ChatbotApp = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const screenWidth = Dimensions.get('window').width;

  // Función para hacer la consulta a la API
  const query = async (data) => {
    try {
      const response = await fetch(
        "https://api.stack-ai.com/inference/v0/run/a9ddc144-165b-4f1c-a698-f022a2d8f213/66492283c29b82021e457807",
        {
          headers: {
            'Authorization': 'Bearer 0224f421-ea63-4dba-a9df-103541297bc2',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // Función para manejar el envío de mensajes
  const handleSend = async () => {
    if (input.trim().length > 0) {
      // Agrega el mensaje del usuario a la lista de mensajes
      const userMessage = { id: Date.now().toString(), text: input, user: 'user' };
      setMessages([...messages, userMessage]);
      setInput('');

      // Prepara los datos para la consulta a la API
      const data = { "in-0": input, "user_id": "<USER or Conversation ID>" };
      const apiResponse = await query(data);

      // Maneja la respuesta de la API
      if (apiResponse && apiResponse.outputs && apiResponse.outputs['out-0']) {
        const botMessage = { id: Date.now().toString(), text: apiResponse.outputs['out-0'], user: 'bot' };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } else {
        const errorMessage = { id: Date.now().toString(), text: 'Error al recibir la respuesta', user: 'bot' };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      }
    }
  };

  // Función para renderizar cada mensaje
  const renderMessageItem = ({ item }) => (
    <View style={[styles.messageRow, item.user === 'user' ? styles.userMessageRow : styles.botMessageRow]}>
      <Icon name={item.user === 'user' ? 'person' : 'android'} size={32} color="#007bff" style={styles.profileIcon} />
      <View style={[styles.messageContainer, item.user === 'user' ? styles.userMessage : styles.botMessage, { maxWidth: screenWidth * 0.7 }]}>
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <FlatList
          data={messages}
          renderItem={renderMessageItem}
          keyExtractor={item => item.id}
          style={styles.chatContainer}
          contentContainerStyle={styles.chatContentContainer}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Escribe un mensaje"
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Icon name="send" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  chatContainer: {
    flex: 1,
  },
  chatContentContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: '#007bff',
    borderRadius: 20,
    padding: 10,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  userMessageRow: {
    justifyContent: 'flex-end',
  },
  botMessageRow: {
    justifyContent: 'flex-start',
  },
  profileIcon: {
    marginHorizontal: 8,
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    maxWidth: '70%',
  },
  userMessage: {
    backgroundColor: '#dcf8c6',
  },
  botMessage: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
  },
  messageText: {
    fontSize: 16,
  },
});

export default ChatbotApp;
