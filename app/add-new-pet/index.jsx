import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ToastAndroid
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import { TextInput, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '@/config/FirebaseConfig';
import * as ImagePicker from 'expo-image-picker';

export default function AddNewPet() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    Category: 'Dogs',
    sex: 'Male',
    name: '',
    breed: '',
    age: '',
    weight: '',
    address: '',
    about: '',
  });
  const [gender, setGender] = useState('Male');
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Dogs');
  const [image, setImage] = useState();
  const [isLoading, setIsLoading] = useState(false); // Loading state

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Add New Pet',
    });
    GetCategory();
  }, []);

  // Fetch categories from Firestore
  const GetCategory = async () => {
    const snapshot = await getDocs(collection(db, 'Category'));
    const categories = [];
    snapshot.forEach((doc) => {
      categories.push(doc.data());
    });
    setCategoryList(categories);
  };

  // Handle image selection
  const imagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Handle form input changes
  const handleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  // Submit form data to Firestore
  const onSubmit = async () => {
    if (isLoading) return; // Prevent form submission if already in progress

    const requiredFields = ['name', 'Category', 'breed', 'age', 'sex', 'weight', 'address', 'about'];
    const isFormValid = requiredFields.every((field) => formData[field] && formData[field].trim() !== '');

    if (!isFormValid) {
      ToastAndroid.show('Enter All Details', ToastAndroid.SHORT);
      return;
    }

    setIsLoading(true); // Set loading to true

    try {
      const petsCollectionRef = collection(db, 'Pets');
      const newPet = {
        ...formData,
        image: image || '', // Optional image field
        createdAt: new Date().toISOString(),
      };
      console.log(newPet);
      await addDoc(petsCollectionRef, newPet);

      ToastAndroid.show('Pet added successfully!', ToastAndroid.SHORT);

      // Navigate back or to a specific screen
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        navigation.navigate('PetsList'); // Replace 'PetsList' with the route of your pets list
      }
    } catch (error) {
      console.error('Error adding document:', error);
      ToastAndroid.show('Failed to add pet. Try again.', ToastAndroid.SHORT);
    } finally {
      setIsLoading(false); // Reset loading state after the operation
    }
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={styles.title}>Add New Pet for Adoption</Text>
      <Pressable onPress={imagePicker}>
        {!image ? (
          <Image
            source={require('@/assets/images/paw.jpeg')}
            style={styles.imagePlaceholder}
          />
        ) : (
          <Image
            source={{ uri: image }}
            style={styles.imageSelected}
          />
        )}
      </Pressable>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Name *</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleInputChange('name', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Category *</Text>
        <Picker
          selectedValue={selectedCategory}
          style={styles.input}
          onValueChange={(itemValue) => {
            setSelectedCategory(itemValue);
            handleInputChange('category', itemValue);
          }}
        >
          <Picker.Item label="Select a category" value="" />
          {categoryList.map((category, index) => (
            <Picker.Item key={index} label={category.name} value={category.name} />
          ))}
        </Picker>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Breed *</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleInputChange('breed', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Age *</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          onChangeText={(value) => handleInputChange('age', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Gender *</Text>
        <Picker
          selectedValue={gender}
          style={styles.input}
          onValueChange={(itemValue) => {
            setGender(itemValue);
            handleInputChange('sex', itemValue);
          }}
        >
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Weight *</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          onChangeText={(value) => handleInputChange('weight', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address *</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleInputChange('address', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>About *</Text>
        <TextInput
          style={[styles.input, { height: 120, textAlignVertical: 'top' }]}
          numberOfLines={5}
          multiline
          onChangeText={(value) => handleInputChange('about', value)}
        />
      </View>
      {/* Disable button while loading */}
      <TouchableOpacity 
        style={[styles.button, isLoading && { backgroundColor: '#B5B5B5' }]} 
        onPress={onSubmit}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>{isLoading ? 'Submitting...' : 'Submit'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'outfit-medium',
    fontSize: 20,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#8F8E8D',
  },
  imageSelected: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  inputContainer: {
    marginVertical: 5,
  },
  input: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 7,
    fontFamily: 'outfit',
  },
  label: {
    marginVertical: 5,
    fontFamily: 'outfit',
  },
  button: {
    padding: 15,
    backgroundColor: '#E8B20E',
    borderRadius: 7,
    marginVertical: 10,
    marginBottom: 50,
  },
  buttonText: {
    fontFamily: 'outfit-medium',
    textAlign: 'center',
  },
});
