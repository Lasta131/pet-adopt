import { View, StyleSheet, Image, FlatList, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/config/FirebaseConfig';

export default function Slider() {
  const [sliderList, setSliderList] = useState([]);

  // Fetch slider data when the component mounts
  useEffect(() => {
    GetSliders();
  }, []);

  const GetSliders = async () => {
    try {
      // Fetch all documents from the "Sliders" collection
      const snapshot = await getDocs(collection(db, 'Sliders'));
      const sliders = [];

      // Loop through each document and store its data
      snapshot.forEach((doc) => {
        // console.log(doc.data());
        sliders.push(doc.data());
      });

      // Update state with the collected slider data
      setSliderList(sliders);
    } catch (error) {
    console.error('Error fetching sliders:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.sliderContainer}>
            <Image source={{ uri: item?.image }} style={styles.sliderImage} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  sliderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderImage: {
    width: Dimensions.get('screen').width * 0.9,
    height: 170,
    borderRadius: 15,
    marginRight: 15,
  },
});
