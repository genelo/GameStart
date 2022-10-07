import { StatusBar } from 'expo-status-bar';
import {useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TextInput, Image, Button, Alert, ScrollView, FlatList} from 'react-native';
import axios from 'axios';
import Header from './Header.jsx';
import Conversation from './Conversation.jsx';
import ChatInput from './ChatInput.jsx';
import Message from './Message.jsx';
import styles from './MessagingStyles.js';
import io from 'socket.io-client';

export default function Messaging({navigation, route}) {
  const conversationMessages = useRef([]);
  const [conversation, setConversation] = useState(conversationMessages.current);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/messages/conversations/${route.params.conversationId}`)
    .then((response) => {
      if(response.data.length > conversation.length){
        console.log('updated');
        conversationMessages.current = response.data;
        setConversation(response.data);
      }
    });

    (function poll(){
      setTimeout(function(){
        axios.get(`http://localhost:8000/api/messages/conversations/${route.params.conversationId}`)
        .then((response) => {
          console.log(conversation);
          if(response.data.length > conversation.length){
            console.log('updated');
            conversationMessages.current = response.data;
            setConversation(response.data);
          }
          poll();
        });
     }, 300);
   })();
  }, []);

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Header otherUser={route.params.otherUser} trades={route.params.trades} navigation={navigation} item={route.params.item} profilepic={route.params.profilepic}/>
        <Conversation conversation={conversation} username={route.params.user.username}/>
        <ChatInput conversationId={route.params.conversationId} username={route.params.user.username}/>
      </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
