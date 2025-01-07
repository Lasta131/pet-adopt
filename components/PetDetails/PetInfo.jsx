import { View, Text, Image } from 'react-native';
import React from 'react';
import MarkFav from '@/components/MarkFav';


export default function PetInfo({ pet }) {
  return (
    <View>
      {/* Display Pet Image */}
      <Image
        source={{ uri: pet?.image }}
        style={{
          width: '100%',
          height: 300,
          borderRadius: 10,
        }}
      />

      {/* Display Pet Info */}
      <View
        style={{
          padding: 20,
          flexDirection: 'row', // Properly use flexDirection
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View>
          {/* Pet Name */}
          <Text
            style={{
              fontFamily: 'outfit-bold', // Ensure the font is loaded
              fontSize: 27,
            }}
          >
            {pet?.name || 'Unknown Pet'}
          </Text>

          {/* Pet Address */}
          <Text
            style={{
              fontFamily: 'outfit', // Fix font spelling mistake
              fontSize: 16,
              color: 'black',
            }}
          >
            {pet?.address || 'Unknown Address'}
          </Text>
        </View>

        {/* Favorite Icon */}
       <MarkFav pet={pet}/>
      </View>
    </View>
  );
}
