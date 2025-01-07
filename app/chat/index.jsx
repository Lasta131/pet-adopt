import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { GiftedChat } from 'react-native-gifted-chat';
import { useUser } from '@clerk/clerk-expo';
import { addDoc, collection, getDoc, onSnapshot, doc } from 'firebase/firestore';
import { db } from '@/config/FirebaseConfig';

export default function ChatScreen() {
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  const { user } = useUser();

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!params?.id) {
      console.error('Chat ID is missing.');
      return;
    }

    GetUserDetails();

    const unsubscribe = onSnapshot(
      collection(db, 'Chat', params?.id, 'Messages'),
      (snapshot) => {
        const messageData = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            _id: doc.id,
            ...data,
            createdAt: new Date(), // Ensure createdAt is a Date object
          };
        });

        setMessages(messageData.sort((a, b) => b.createdAt - a.createdAt)); // Sort by newest first
      },
      (error) => {
        console.error('Error fetching messages:', error);
      }
    );

    return () => unsubscribe(); // Clean up listener
  }, [params?.id]);

  const GetUserDetails = async () => {
    try {
      const docRef = doc(db, 'Chat', params?.id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        console.error('Chat document does not exist.');
        return;
      }

      const result = docSnap.data();
      const otherUser = result?.users.find(
        (item) => item.email !== user?.primaryEmailAddress?.emailAddress
      );

      navigation.setOptions({
        headerTitle: otherUser?.name || 'Chat',
      });
    } catch (error) {
      console.error('Error fetching chat details:', error);
    }
  };

  const onSend = async (newMessages = []) => {
    try {
      const messageToSend = {
        ...newMessages[0],
        createdAt: new Date(), // Ensure createdAt is a valid timestamp
      };

      await addDoc(collection(db, 'Chat', params.id, 'Messages'), messageToSend);

      setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages) => onSend(newMessages)}
      showUserAvatar
      user={{
        _id: user?.primaryEmailAddress?.emailAddress || 'unknown_user',
        name: user?.fullName || 'Unknown',
        avatar: user?.imageUrl || '',
      }}
    />
  );
}