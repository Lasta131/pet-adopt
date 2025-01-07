import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';

export default function AboutPet({ pet }) {
  const [readMore, setReadMore] = useState(true);

  return (
    <View style={{
      padding: 20,
    }}>
      <Text style={{
        fontFamily: 'outfit-medium',
        fontSize: 20,
      }}
      >About {pet?.name}</Text>
      
      <Text numberOfLines={readMore ? 3 : undefined} style={{
        fontFamily: 'outfit-medium',
        fontSize: 16,
      }}>
        {pet.about}
      </Text>
      
      <Pressable onPress={() => setReadMore(!readMore)}>
        <Text style={{
          fontFamily: 'outfit-medium',
          fontSize: 14,
          color: 'blue',
        }}>
          {readMore ? 'Read More' : 'Read Less'}
        </Text>
      </Pressable>
    </View>
  );
}
