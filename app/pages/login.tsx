import React, { useState ,useLayoutEffect} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions,Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from 'expo-router';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { Domain } from './Domain'; 
export default function Login() {
  const { width, height } = Dimensions.get('window');
  const router = useRouter();
  const [adname, setAdname] = useState('');
  const [password, setPassword] = useState('');
  const navigation=useNavigation();

  const handleLogin = async () => {
    if (!adname || !password) {
      Alert.alert('Validation Error', 'Please enter both username and password');
      return;
    }

    try {
      // Make a POST request to the Django backend
      const response = await axios.post(`${Domain}/machineadmin/`, {
        adname: adname,
        password: password,
      });

      // Handle successful login
      if (response.data.success) {
        Alert.alert('Login Successful', 'Redirecting to home page...');
        if(response.data.success==='pyro'){
        router.push('/pages/plastics'); }
        else{
          router.push('/pages/natural')
        }
      } else {
        Alert.alert('Login Failed', response.data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login Error:', error.response?.data || error.message);
      Alert.alert('Error', 'Unable to login. Please try again later.');
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'LOGIN PAGE',
      headerTitleStyle: {
        fontWeight: 'bold',
        color:'white',
        fontSize:30,
        
      },
      headerStyle:{
        backgroundColor:'#243642',
        borderBottomColor:'white',
        borderBottomWidth:2,
      }
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
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={[styles.input, { height: 60 }]} // Extended input height
          placeholder="Enter your username"
          placeholderTextColor="#A9A9A9"
          onChangeText={setAdname}
          value={adname}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={[styles.input, { height: 60 }]} // Extended input height
          placeholder="Enter your password"
          placeholderTextColor="#A9A9A9"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
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
  loginButton: {
    width: '100%',
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
});
