import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Shared from '@/Shared/Shared'
import { useUser } from '@clerk/clerk-expo';
import { FlatList } from 'react-native';
import PetListItem from '@/components/Home/PetListItem'

export default function Favorite() {
  const { user } = useUser();
  const [favIds, setFavIds] = useState([]);
  const [favPetList, setFavPetList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (user) {
      GetFavPetIds();
    }
  }, [user]);

  // Get Favorite IDs
  const GetFavPetIds = async () => {
    setLoader(true);
    const result = await Shared.GetFavList(user);
    setFavIds(result?.favorites);
    setLoader(false);
    GetFavPetList(result?.favorites);
  }

  // Fetch Related Pet List
  const GetFavPetList = async (favId_) => {
    setLoader(true);
    setFavPetList([]);
    try {
      const q = query(collection(db, 'Pets'), where('id', 'in', favId_));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        setFavPetList(prev => [...prev, doc.data()]);
      });
    } catch (error) {
      // console.error("Error fetching favorite pets: ", error);
    }
    setLoader(false);
  }

  return (
    <View style={{
      padding: 20,
      marginTop: 20
    }}>
      <Text style={{
        fontFamily: 'outfit-medium',
        fontSize: 30
      }}>Favorites</Text>
      <FlatList
        data={favPetList}
        numColumns={2}
        onRefresh={GetFavPetIds}
        refreshing={loader} // Corrected this line
        renderItem={({ item }) => (
          <View>
            <PetListItem pet={item} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()} // Add a keyExtractor to avoid warnings
      />
    </View>
  );
}
