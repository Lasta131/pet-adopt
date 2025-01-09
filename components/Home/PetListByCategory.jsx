import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Category from './Category';
import PetListItem from './PetListItem';
import { db } from '@/config/FirebaseConfig';

export default function PetListByCategory() {
  const [petList, setPetList] = useState([]); // List of pets
  const [loader, setLoader] = useState(false); // Loader state for async operations

  useEffect(() => {
    GetPetList('Dogs'); //  Default category
  }, []);

  const GetPetList = async (category) => {
    try {
      setLoader(true); // Show loader
      setPetList([]); // Clear pet list for fresh data

      //console.log(`Fetching pets for category: ${category}`); // Log the selected category

      const q = query(collection(db, 'Pets'), where('Category', '==', category));
      const querySnapshot = await getDocs(q);

      const pets = [];
      
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        
        const petData = doc.data();
        // console.log('Fetched Pet:', petData); // Log fetched pet data
        pets.push({ id: doc.id, ...petData }); // Add ID and data
      });

      setPetList(pets); // Update state in batch
      // console.log(pets);
      
    } catch (error) {
      console.error('Error fetching pets:', error);
    } finally {
      setLoader(false); // Hide loader
    }
  };

  return (
    <View>
      {/* Category selector */}
      <Category category={(value) => GetPetList(value)} />

      {/* Pet list */}
      <FlatList
        data={petList}
        keyExtractor={(item) => item.id} // Use document ID as key
        style={{ marginTop: 10 }}
        horizontal // Horizontal list
        refreshing={loader} // Show loader during refresh
        onRefresh={() => GetPetList('Dogs')} // Refresh action
        renderItem={({ item }) => (
          <PetListItem pet={item} /> // Pass pet data to PetListItem
        )}
      />
    </View>
  );
}
