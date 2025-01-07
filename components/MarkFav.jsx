import { View, Pressable } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Shared from '@/Shared/Shared';
import { useUser } from '@clerk/clerk-expo';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MarkFav({ pet }) {
    const { user } = useUser();
    const [favList, setFavList] = useState([]);

    // Fetch favorites when the screen focuses
    useFocusEffect(
        useCallback(() => {
            if (user) {
                syncFavFromStorage(); // Sync locally cached data
                fetchAndUpdateFavs(); // Update from server
            }
        }, [user])
    );

    // Fetch favorites from the database
    const fetchAndUpdateFavs = async () => {
        try {
            const result = await Shared.GetFavList(user);
            const favorites = result?.favorites || [];
            setFavList(favorites); // Set favorites in state
            await AsyncStorage.setItem('favList', JSON.stringify(favorites)); // Cache favorites locally
        } catch (error) {
            console.error('Error fetching favorites:', error);
        }
    };

    // Sync favorites from AsyncStorage
    const syncFavFromStorage = async () => {
        try {
            const storedFavs = await AsyncStorage.getItem('favList');
            if (storedFavs) {
                setFavList(JSON.parse(storedFavs));
            }
        } catch (error) {
            console.error('Error syncing from storage:', error);
        }
    };

    // Add pet to favorites
    const AddToFav = async () => {
        try {
            if (pet?.id && !favList.includes(pet.id)) {
                const updatedFavList = [...favList, pet.id];
                setFavList(updatedFavList); // Optimistic UI update
                await Shared.UpdateFav(user, updatedFavList);
                await AsyncStorage.setItem('favList', JSON.stringify(updatedFavList)); // Sync with storage
            }
        } catch (error) {
            console.error('Error adding to favorites:', error);
        }
    };

    // Remove pet from favorites
    const removeFromFav = async () => {
        try {
            if (pet?.id && favList.includes(pet.id)) {
                const updatedFavList = favList.filter(item => item !== pet.id);
                setFavList(updatedFavList); // Optimistic UI update
                await Shared.UpdateFav(user, updatedFavList);
                await AsyncStorage.setItem('favList', JSON.stringify(updatedFavList)); // Sync with storage
            }
        } catch (error) {
            console.error('Error removing from favorites:', error);
        }
    };

    // Render heart icon based on the current favorite state
    return (
        <View>
            {favList.includes(pet.id) ? (
                <Pressable onPress={removeFromFav}>
                    <Ionicons name="heart" size={30} color="red" />
                </Pressable>
            ) : (
                <Pressable onPress={AddToFav}>
                    <Ionicons name="heart-outline" size={30} color="black" />
                </Pressable>
            )}
        </View>
    );
}
