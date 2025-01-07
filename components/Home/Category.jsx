import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/config/FirebaseConfig';

export default function Category({category}) {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Dogs');

  useEffect(() => {
    GetCategory();
  }, []);

  const GetCategory = async () => {
    const snapshot = await getDocs(collection(db, 'Category'));
    const categories = [];
    snapshot.forEach((doc) => {
       categories.push(doc.data());
    });
    setCategoryList(categories);
  };

  // Function to set the selected category when a category is clicked
  const handleSelectCategory = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontFamily: 'outfit-medium', fontSize: 20 }}>Category</Text>
      <FlatList
        data={categoryList}
        numColumns={4}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => {
              setSelectedCategory(item.name);
              category(item.name)
            }}>

              <View
                style={[
                  styles.container,
                  selectedCategory === item.name && styles.selectedCategoryContainer,
                ]}
              >
                <Image
                  source={{ uri: item?.image }}
                  style={{
                    width: 40,
                    height: 40,
                  }}
                />
              </View>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'outfit',
                }}
              >
                {item?.name}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFC080',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'orange',
  },
  itemContainer: {
    margin: 5,
    width: '22%', // Ensures each item has a specific width in the 4-column layout
  },
  selectedCategoryContainer: {
    backgroundColor: '#ADD8E6',
    borderColor:'#ADD8E6'
  },
});
