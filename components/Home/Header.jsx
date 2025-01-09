import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

export default function Header() {
  const { user } = useUser();
  const router = useRouter();

  // Function to navigate to profile
  const navigateToProfile = () => {
    router.push('/profile'); // Ensure '/profile' is a valid route in your app
  };

  return (
    <View style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <View>
        <Text style={{
          fontFamily: 'outfit',
          fontSize: 18
        }}>
          Welcome
        </Text>
        <Text style={{
          fontFamily: 'outfit-medium',
          fontSize: 25
        }}>
          {user?.fullName}
        </Text>
      </View>
      
      {/* Make Profile Image Clickable */}
      <TouchableOpacity onPress={navigateToProfile}>
        <Image 
          source={{ uri: user?.imageUrl }} 
          style={{
            width: 40,
            height: 40,
            borderRadius: 99
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
