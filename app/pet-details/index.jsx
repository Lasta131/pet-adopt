import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import PetInfo from '@/components/PetDetails/PetInfo';
import PetSubInfo from '@/components/PetDetails/PetSubInfo';
import AboutPet from '@/components/PetDetails/AboutPet';
import OwnerInfo from '@/components/PetDetails/OwnerInfo';
import { useUser } from '@clerk/clerk-expo';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '@/config/FirebaseConfig';


export default function PetDetails() {
  const pet = useLocalSearchParams();
  const navigation = useNavigation();
  const router = useRouter();
  const { user } = useUser()

  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: '',
    });
  }, []);

  const initiateChat = async () => {
    try {
      const docId1 = `${user?.primaryEmailAddress?.emailAddress}_${pet?.useremail}`;
      const docId2 = `${pet?.useremail}_${user?.primaryEmailAddress?.emailAddress}`;

      const q = query(collection(db, 'Chat'), where('id', 'in', [docId1, docId2]));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          // console.log("Existing chat found:", doc.id);
          router.push({
            pathname: '/chat',
            params: { id: doc.id },
          });
        });
      } else {
        console.log("No existing chat. Creating a new chat document...");
        await setDoc(doc(db, 'Chat', docId1), {
          id: docId1,
          users: [
            {
              email: user?.primaryEmailAddress?.emailAddress,
              imageUrl: user?.imageUrl,
              name: user?.fullName,
            },
            {
              email: pet?.useremail,
              imageUrl: pet?.userImage,
              name: pet?.userName,
            },
          ],
          userIds: [user?.primaryEmailAddress?.emailAddress, pet?.useremail],
          createdAt: new Date(), // Optionally add a timestamp
        });

        router.push({
          pathname: '/chat',
          params: { id: docId1 },
        });
      }
    } catch (error) {
      console.error("Error initiating chat:", error);
      alert("Failed to initiate chat. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Pet Info */}
        <PetInfo pet={pet} />
        {/* Pet SubInfo */}
        <PetSubInfo pet={pet} />
        {/* About */}
        <AboutPet pet={pet} />
        {/* Owner */}
        <OwnerInfo pet={pet} />
      </ScrollView>

      {/* Adopt Me button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          onPress={initiateChat}
          style={styles.adoptBtn}>
          <Text style={styles.adoptBtnText}>Adopt Me</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Optional, can customize
  },
  bottomContainer: {
    padding: 20,
    backgroundColor: 'white', // Ensure contrast for the button
    borderTopWidth: 1,
    borderTopColor: '#ccc', // Subtle divider line
    alignItems: 'center',
  },
  adoptBtn: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: '#FFD700', // A nice yellow color
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 5, // For Android shadow
  },
  adoptBtnText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'outfit-medium', // Use your desired font
  },
});
