import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from 'expo-router';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { Domain } from './Domain';

export default function WasteCollection() {
  const { width, height } = Dimensions.get('window');
  const router = useRouter();
  const navigation = useNavigation();

  const [userId, setUserId] = useState('');
  const [weight, setWeight] = useState('');
  const [userIds, setUserIds] = useState([]); // List of user IDs for the dropdown

  // Fetch user IDs on component mount
  useEffect(() => {
    const fetchUserIds = async () => {
      try {
        const response = await axios.get(`${Domain}/get_user_ids/`); // Replace with your endpoint
        setUserIds(response.data); // Assuming the API returns an array of user IDs
      } catch (error) {
        console.error('Error fetching user IDs:', error.response?.data || error.message);
        Alert.alert('Error', 'Unable to fetch user IDs. Please try again later.');
      }
    };

    fetchUserIds();
  }, []);

  const handleSubmit = async () => {
    if (!userId || !weight) {
      Alert.alert('Validation Error', 'Please select a User ID and enter weight');
      return;
    }

    try {
      // Make a POST request to submit the data
      const response = await axios.post(`${Domain}/plastic_collect/`, {
        userid: userId,
        weight: weight,
      });
      

      const payload = { received:"OK",weight}; 
      const res = await axios.post(`${Domain}/pyro/`,payload);

   
      if (response.data.message) {
        Alert.alert('Success', response.data.message);
        setWeight(''); // Reset the weight field after submission
      }
    } catch (error) {
      console.error('Submit Error:', error.response?.data || error.message);
      Alert.alert('Error', 'Unable to submit data. Please try again later.');
    }
  };



  const organicSubmit = async () => {
    if (!userId || !weight) {
      Alert.alert('Validation Error', 'Please select a User ID and enter weight');
      return;
    }

    try {
      // Make a POST request to submit the data
      const response = await axios.post(`${Domain}/bsfl_collect/`, {
        userid: userId,
        weight: weight,
      });
      const payload = {bsreceived:"OK",weight}; 
      const res = await axios.post(`${Domain}/bsfl/`,payload);
      Alert.alert('Success', res.data.message);

      if (response.data.message) {
        Alert.alert('Success', response.data.message);
        setWeight(''); // Reset the weight field after submission
      }
    } catch (error) {
      console.error('Submit Error:', error.response?.data || error.message);
      Alert.alert('Error', 'Unable to submit data. Please try again later.');
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Waste Collection',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 30,
      },
      headerStyle: {
        backgroundColor: '#243642',
        borderBottomColor: 'white',
        borderBottomWidth: 2,
      },
    });
  }, [navigation]);

  return (
    <View style={[styles.main, { width: width, height: height }]}>
      {/* GreenGuardians Title */}
      <Text style={styles.title}>GreenGuardians</Text>
      <View style={styles.logo}>
        <Ionicons size={40} name="leaf" color={'#2E8B57'} /> {/* Green Icon */}
      </View>

      {/* Input Section */}
      <View style={styles.form}>
        <Text style={styles.label}>User ID</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={userId}
            onValueChange={(value) => setUserId(value)}
            style={styles.picker}
          >
            <Picker.Item label="Select User ID" value="" />
            {userIds.map((id) => (
              <Picker.Item key={id} label={id} value={id} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Weight</Text>
        <TextInput
          style={[styles.input, { height: 60 }]} // Extended input height
          placeholder="Enter weight"
          placeholderTextColor="#A9A9A9"
          keyboardType="numeric"
          onChangeText={setWeight}
          value={weight}
        />

         <View style={styles.row}>
        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
          <Text style={styles.loginText}>plastic</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={organicSubmit}>
          <Text style={styles.loginText}>organic</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#F5FFFA', // Pale Green background
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2E8B57', // Dark Green
    marginTop: 40,
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderColor: '#2E8B57', // Dark Green
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  form: {
    width: '90%',
    backgroundColor: '#FFFFFF', // White input container
    borderRadius: 15,
    padding: 20,
    shadowColor: '#A9A9A9', // Light Grey shadow
    shadowOffset: { width: 25, height: 25 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    alignItems: 'center',
  },
  label: {
    alignSelf: 'flex-start',
    color: '#2E8B57', // Dark Green
    fontSize: 18,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    backgroundColor: '#F0FFF0', // Pale Green input background
    borderRadius: 10,
    color: '#2E8B57', // Dark Green text
    paddingHorizontal: 15,
    marginBottom: 20,
    borderColor: '#2E8B57', // Dark Green border
    borderWidth: 1,
    fontSize: 16,
  },
  pickerContainer: {
    width: '100%',
    backgroundColor: '#F0FFF0', // Pale Green picker background
    borderRadius: 10,
    borderColor: '#2E8B57',
    borderWidth: 1,
    marginBottom: 20,
  },
  picker: {
    height: 60,
    color: '#2E8B57',
  },
  loginButton: {
    width:'50%',
    height: 50,
    backgroundColor: '#2E8B57', // Dark Green button
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  loginText: {
    color: '#FFFFFF', // White text
    fontSize: 18,
    fontWeight: 'bold',
  },
  row:{
    width:'100%',
    height: 50,
    display:'flex',
    flexDirection:'row',
    gap:10,
  }
});
