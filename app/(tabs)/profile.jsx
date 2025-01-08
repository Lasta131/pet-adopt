import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { useAuth, useUser } from '@clerk/clerk-expo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

export default function Profile() {
  const Menu = [
    {
      id: 1,
      name: 'Add New Pet',
      icon: 'add-circle',
      path: '/add-new-pet',
    },
    {
      id: 2,
      name: 'My Post',
      icon: 'bookmark',
      path: '/User-Post',
    },

    {
      id: 3,
      name: 'Favorite',
      icon: 'heart',
      path: '/(tabs)/favorite',
    },
    {
      id: 4,
      name: 'Inbox',
      icon: 'chatbubble',
      path: '/(tabs)/inbox',
    },
    {
      id: 5,
      name: 'Logout',
      icon: 'exit',

      path: 'logout', // Special handling for logout
    },
    
  ];

  const { user } = useUser();
  const router = useRouter();
  const { signOut } = useAuth(); // Access signOut from Clerk's useAuth hook
  
  // Handle Menu item press
  const onPressMenu = (menu) => {
    if (menu.name === 'Logout') {
      signOut();  // Sign the user out
      router.push('/login'); // Redirect to login page after logout
      return; // Prevent further code execution
    }
    router.push(menu.path); // Regular routing for other menu items
  };

  return (
    <View style={{ padding: 20, marginTop: 20 }}>
      <Text style={{ fontFamily: 'outfit-medium', fontSize: 30 }}>Profile</Text>
      <View
        style={{
          alignItems: 'center',
          marginVertical: 25,
        }}
      >
        <Image
          source={{ uri: user?.imageUrl }}
          style={{
            width: 80,
            height: 80,
            borderRadius: 99,
          }}
        />
        <Text style={{ fontFamily: 'outfit-bold', fontSize: 20, marginTop: 6 }}>
          {user?.fullName}
        </Text>
        <Text
          style={{
            fontFamily: 'outfit-bold',
            fontSize: 16,
            color: '#8F8E8D',
          }}
        >
          {user?.primaryEmailAddress?.emailAddress}
        </Text>
      </View>
      <FlatList
        data={Menu}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onPressMenu(item)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
              backgroundColor: '#FFF9F9',
              marginVertical: 10,
              gap: 10,
            }}
          >
            {/* Icon with Lavender Color */}
            <Ionicons name={item.icon} size={30} color="#A385E4" />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 18,
                fontFamily: 'outfit-regular',
                color: 'black',
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
