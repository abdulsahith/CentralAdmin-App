import React, { useEffect,useState } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, ScrollView,TextInput } from 'react-native';
import { useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { Domain } from './Domain';
const Natural = () => {
    const { width, height } = Dimensions.get('window');
    const navigation = useNavigation();
    
    useEffect(() => {
        navigation.setOptions({
            title: 'BSFL Page',
        });
    }, [navigation]);
  

    const [bsfl,setBsfl] = useState('');  
    const [responseMessage, setResponseMessage] = useState(''); 
    const [com,setCom]=useState('');
    const [man,setMan]=useState('');
    

    


    const handlerec = async () => {
        try {
             
            
            const payload = {bsreceived:"OK",bsfl}; 
            const response = await axios.post(`${Domain}/bsfl/`,payload);
            setResponseMessage(response.data.message || 'Data submitted successfully!');
            setBsfl('');

             
        } catch (error) {
            console.error('Error posting data:', error);
            setResponseMessage('Error submitting data. Please try again.');
        }
    };
  
  
    const handlepro = async () => {
      try {
           
          const payload = { composting:"OK",com}; 
  
          const response = await axios.post(`${Domain}/bsfl/`,payload);
          setResponseMessage(response.data.message || 'Data submitted successfully!');
          setCom('');
           
           
         
      } catch (error) {
          console.error('Error posting data:', error);
          setResponseMessage('Error submitting data. Please try again.');

      }
  };
  
  
  const handlefil= async () => {
    try {
       
        
        const payload = { manure:"OK",man}; 
  
        const response = await axios.post(`${Domain}/bsfl/`,payload);
        setResponseMessage(response.data.message || 'Data submitted successfully!');
        setMan('');
         
    
       
    } catch (error) {
        console.error('Error posting data:', error);
        setResponseMessage('Error submitting data. Please try again.');
    }
  };

    return (
        <ScrollView style={{ width: width * 1 }}>
            <View style={styles.main}>
                <View style={[styles.box,{height:200}]}>
                    <Text style={[styles.btnText, { color: '#50B498' }]}>Stop the process</Text>
                    <TouchableOpacity style={[styles.btn, { backgroundColor: 'red' }]}>
                        <Text style={styles.btnText}>Emergency</Text>
                    </TouchableOpacity>
                </View>
                  
                

                    {responseMessage ? (
                        <Text style={[styles.btnText, { color: '#000', fontSize: 16 }]}>{responseMessage}</Text>
                    ) : null}
            


 
                
                <View style={styles.box}>
                    <Text style={[styles.btnText, { color: '#50B498' }]}>BSFL</Text>

                    <View style={styles.row}>
                    <TextInput
                        style={styles.input}
                        placeholder="value"
                        value={bsfl}
                        onChangeText={(text) => setBsfl(text)}
                    />
                        <TouchableOpacity style={[styles.btn, { backgroundColor: 'lightgreen', width: '30%' }]}  onPress={handlerec}>
                            <Text style={styles.btnText}> Received</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.row}>
                    <TextInput
                        style={styles.input}
                        placeholder="value"
                        value={com}
                        onChangeText={(text) => setCom(text)}
                    />
                        <TouchableOpacity style={[styles.btn, { backgroundColor: 'lightgreen', width: '30%' }]}  onPress={handlepro}>
                            <Text style={[styles.btnText,{fontSize:15}]}> Composting </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.row}>
                    <TextInput
                        style={styles.input}
                        placeholder="value"
                        value={man}
                        onChangeText={(text) => setMan(text)}
                    />
                        <TouchableOpacity style={[styles.btn, { backgroundColor: 'lightgreen', width: '30%' }]}  onPress={handlefil}>
                            <Text style={styles.btnText}> Manure </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default Natural;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 20,
        paddingVertical: 20, // Add padding for scrolling
    },
    box: {
        width: '90%',
        height:500,

        backgroundColor: 'aliceblue',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        marginTop: 20,
        gap: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
    },
    btn: {
        backgroundColor: 'lightgreen',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: 40,
    },
    btnText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
    },

    input: {
      width:100,
      height: 40,
      borderColor: '#50B498',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
      marginBottom: 10,
      fontSize: 16,
  },
  // btn: {
  //     backgroundColor: 'lightgreen',
  //     borderRadius: 20,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     width: '90%',
  //     height: 40,
  // },
  // btnText: {
  //     color: 'white',
  //     fontSize: 20,
  //     fontWeight: 'bold',
  //     justifyContent: 'center',
  //     alignItems: 'center',
  // },
});
