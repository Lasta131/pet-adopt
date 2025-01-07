import { View, Text, Image } from 'react-native';
import React from 'react';

export default function PetSubInfo({ pet }) {
  return (
    <View
      style={{
        paddingHorizontal: 20,
      }}
    >
      {/* Wrapper for SubInfo */}
      <View
        style={{
          flexDirection: 'row', // Layout boxes in a row
          justifyContent: 'space-between', // Space evenly between boxes
          alignItems: 'center', // Align vertically center
          flexWrap: 'wrap', // Allow wrapping if too many items
        }}
      >
        {/* Age Box 1 */}
        <View
          style={{
            flexDirection: 'row', // Content in a row
            alignItems: 'center',
            backgroundColor: '#E6F7FF', // Light blue background
            padding: 10,
            margin: 5,
            borderRadius: 8,
            flex: 1, // Allows box to flex to take up even space
            gap: 10,
          }}
        >
          {/* Icon */}
          <Image
            source={require('@/assets/images/calendar.png')}
            style={{
              width: 40,
              height: 40,
            }}
          />
          {/* Texts */}
          <View>
            <Text
              style={{
                fontFamily: 'outfit', // Font
                fontSize: 16,
                color: 'blue',
              }}
            >
              Age
            </Text>
            <Text
              style={{
                fontFamily: 'outfit-medium', // Font
                fontSize: 20,
              }}
            >
              {pet?.age ? `${pet.age} years` : 'Unknown Age'}
            </Text>
          </View>
        </View>

        {/* Age Box 2 */}
        <View
          style={{
            flexDirection: 'row', // Content in a row
            alignItems: 'center',
            backgroundColor: '#E6F7FF', // Light blue background
            padding: 10,
            margin: 5,
            borderRadius: 8,
            flex: 1, // Allows box to flex to take up even space
            gap: 10,
          }}
        >
          {/* Icon */}
          <Image
            source={require('@/assets/images/bone.png')}
            style={{
              width: 40,
              height: 40,
            }}
          />
          {/* Texts */}
          <View>
            <Text
              style={{
                fontFamily: 'outfit', // Font
                fontSize: 16,
                color: 'blue',
              }}
            >
              Breed
            </Text>
            <Text
              style={{
                fontFamily: 'outfit-medium', // Font
                fontSize: 15,
              }}
            >
              {pet?.breed ? `${pet.breed} ` : 'Unknown Age'}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row', // Layout boxes in a row
          justifyContent: 'space-between', // Space evenly between boxes
          alignItems: 'center', // Align vertically center
          flexWrap: 'wrap', // Allow wrapping if too many items
        }}
      >
        {/* Age Box 1 */}
        <View
          style={{
            flexDirection: 'row', // Content in a row
            alignItems: 'center',
            backgroundColor: '#E6F7FF', // Light blue background
            padding: 10,
            margin: 5,
            borderRadius: 8,
            flex: 1, // Allows box to flex to take up even space
            gap: 10,
          }}
        >
          {/* Icon */}
          <Image
            source={require('@/assets/images/sex.png')}
            style={{
              width: 40,
              height: 40,
            }}
          />
          {/* Texts */}
          <View>
            <Text
              style={{
                fontFamily: 'outfit', // Font
                fontSize: 16,
                color: 'blue',
              }}
            >
          sex
            </Text>
            <Text
              style={{
                fontFamily: 'outfit-medium', // Font
                fontSize: 20,
              }}
            >
              {pet?.sex ? `${pet.sex} ` : 'Unknown Sex'}
            </Text>
          </View>
        </View>

        {/* Age Box 2 */}
        <View
          style={{
            flexDirection: 'row', // Content in a row
            alignItems: 'center',
            backgroundColor: '#E6F7FF', // Light blue background
            padding: 10,
            margin: 5,
            borderRadius: 8,
            flex: 1, // Allows box to flex to take up even space
            gap: 10,
          }}
        >
          {/* Icon */}
          <Image
            source={require('@/assets/images/weight.png')}
            style={{
              width: 40,
              height: 40,
            }}
          />
          {/* Texts */}
          <View>
            <Text
              style={{
                fontFamily: 'outfit', // Font
                fontSize: 16,
                color: 'blue',
              }}
            >
                Weight
            </Text>
            <Text
              style={{
                fontFamily: 'outfit-medium', // Font
                fontSize: 15,
              }}
            >
              {pet?.weight ? `${pet.weight}  kg` : 'Weight'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
