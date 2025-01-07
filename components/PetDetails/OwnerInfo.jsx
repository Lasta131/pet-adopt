import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function OwnerInfo({ pet }) {
    return (
        <View style={styles.container}>
            <View style={styles.rowContainer}>
                <Image 
                    source={{ uri: pet?.userImage }}
                    style={styles.image}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.userName}>
                        {pet?.userName}
                    </Text>
                    <Text style={styles.role}>
                        Pet Owner
                    </Text>
                </View>
            </View>
            <Ionicons name="send-sharp" size={24} color="black" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
        borderWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        justifyContent: 'space-between',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    textContainer: {
        marginLeft: 15,
    },
    userName: {
        fontFamily: 'outfit-bold',
        fontSize: 16,
    },
    role: {
        fontFamily: 'outfit',
        color: 'grey',
        marginTop: 2,
    },
});
