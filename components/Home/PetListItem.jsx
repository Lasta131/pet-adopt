import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import MarkFav from '@/components/MarkFav';

export default function PetListItem({ pet }) { 
  const router = useRouter();
  
  // Debug logging
  // console.log('Pet:', pet);

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: '/pet-details',
          params: pet
        })
      }
      style={{
        padding: 10,
        marginRight: 15,
        backgroundColor: '#E6E6FA', // Lavender background
        borderRadius: 10,
      }}
    >
      <View style={{
        position:'absolute',
        zIndex:10,
        right:10,
        top:10
      }}
      >
        <MarkFav pet={pet}/>
      </View>
      {/* Image */}
      <Image
        source={{ uri: pet?.image }} // Ensure image exists
        style={{
          width: 170,
          height: 150,
          borderRadius: 10,
        }}
      />

      {/* Pet Name */}
      <Text
        style={{
          fontFamily: 'outfit-medium',
          fontSize: 18,
          color: 'black',
          marginTop: 5,
        }}
      >
        {pet?.name || 'Unnamed'}
      </Text>

      {/* Breed and Age */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 5,
        }}
      >
        <Text
          style={{
            color: 'blue',
            fontFamily: 'outfit-medium',
            flex: 1, // Allow the text to occupy available space
          }}
        >
          {pet?.breed || 'Unknown Breed'}
        </Text>
        <Text
          style={{
            fontFamily: 'outfit-medium',
            color: 'blue',
            paddingHorizontal: 7,
            borderRadius: 10,
            fontSize: 11,
            backgroundColor: '#ADD8E6', // Light Blue Background
            marginLeft: 10,
          }}
        >
          {pet?.age ? `${pet.age} YRS` : 'Age Unknown'}
        </Text>
      </View>
      
    </TouchableOpacity>
  );
}
