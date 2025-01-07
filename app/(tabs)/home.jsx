import { View, Text, } from 'react-native';
import React from 'react';
import Header from '@/components/Home/Header';
import Slider from '@/components/Home/Slider';
import PetListByCategory from '@/components/Home/PetListByCategory';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';
//import PetListItem from '@components/Home/PetListItem';
export default function Home() {
  return (
    <View style={{
      padding: 20,
      marginTop: 20,
    }}>
      {/* Header */}
      <Header />

      {/* Slider */}
      <Slider />

      {/* PetList + Category */}
      <PetListByCategory/>

      {/* Add New Pet Option */}
      <Link href={'/add-new-pet'}
      style={{
        display: 'flex',
        flexDirection: 'row', // Align icon and text in a row
        alignItems: 'center', // Center vertically
        justifyContent: 'center', // Center horizontally
        padding: 20,
        marginTop: 20,
        backgroundColor: '#E6E6FA', // Lavender color
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 15,
        borderStyle: 'dashed',
        textAlign:'center'
      }}>
        <MaterialIcons name="pets" size={24} color="purple" />
        <Text style={{
          fontFamily: 'outfit-medium', // Ensure this font is loaded
          color: 'purple',
          marginLeft: 10, // Adds spacing between icon and text
          alignItems:'center',
          justifyContent:'center'
        }}>
          Add NEW Pet
        </Text>
      </Link>
    </View>
  );
}

