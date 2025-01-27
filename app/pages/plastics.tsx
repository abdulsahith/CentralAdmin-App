import React, { useEffect,useState } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, ScrollView,TextInput } from 'react-native';
import { useNavigation } from 'expo-router';
import axios from 'axios';
import { Domain } from './Domain';
  
const Plastic = () => {
    const { width, height } = Dimensions.get('window');
    const navigation = useNavigation();
     
    useEffect(() => {
        navigation.setOptions({
            title: 'Plastic Page',
        });
    }, [navigation]);


    const [pyro, setPyro] = useState(''); // State for PYRO input
    const [pro,setPro]=useState('');
    const [con,setCon]=useState('');
    const [responseMessage, setResponseMessage] = useState(''); // State for server response
    const [refresh, setRefresh] = useState(false); // State to track refresh
    
    


        

     

    const handlerec = async () => {
      try {
           
          
          const payload = { received:"OK",pyro}; 

          const response = await axios.post(`${Domain}/pyro/`,payload);
          setResponseMessage(response.data.message || 'Data submitted successfully!');
        setPyro('');
         
      } catch (error) {
          console.error('Error posting data:', error);
          setResponseMessage('Error submitting data. Please try again.');
      }
  };

  useEffect(() => {
    
    if (refresh) {
       
        setRefresh(false); // Reset refresh state after actions
    }
}, [refresh]);

  const handlepro = async () => {
    try {
         
        const payload = { processing:"OK",pro}; 

        const response = await axios.post(`${Domain}/pyro/`,payload);
        setResponseMessage(response.data.message || 'Data submitted successfully!');
        setPro('');
         
       
    } catch (error) {
        console.error('Error posting data:', error);
        setResponseMessage('Error submitting data. Please try again.');
    }
};


 

const handledis= async () => {
  try {
       
      
      const payload = { dispatched:"OK",con}; 

      const response = await axios.post(`${Domain}/pyro/`,payload);
      setResponseMessage(response.data.message || 'Data submitted successfully!');
      setCon('');
       
     
  } catch (error) {
      console.error('Error posting data:', error);
      setResponseMessage('Error submitting data. Please try again.');
  }
};
  
const handleEmergency = () => {
    // Trigger refresh by toggling the state
    setRefresh(true);
    setResponseMessage('Emergency action triggered! Refreshing...');
};


    return (
        <ScrollView style={{ width: width * 1 ,height:height*1}}>
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
                    <Text style={[styles.btnText, { color: '#50B498' }]}>PYROLYSIS</Text>

                    <View style={styles.row}>
                    <TextInput
                        style={styles.input}
                        placeholder="value"
                        value={pyro}
                        onChangeText={(text) => setPyro(text)}
                        
                    />
                        <TouchableOpacity style={[styles.btn, { backgroundColor: 'lightgreen', width: '30%' }]} onPress={handlerec} >
                            <Text style={styles.btnText}>Received</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.row}>
                    <TextInput
                        style={styles.input}
                        placeholder="value"
                        value={pro}
                        onChangeText={(text) => setPro(text)}
                    />
                        <TouchableOpacity style={[styles.btn, { backgroundColor: 'lightgreen', width: '30%' }]}  onPress={handlepro} >
                            <Text style={[styles.btnText,{fontSize:15}]}> Processing  </Text>
                        </TouchableOpacity>
                    </View>

                   

                    <View style={styles.row}>
                    <TextInput
                        style={styles.input}
                        placeholder="value"
                        value={con}
                        onChangeText={(text) => setCon(text)}
                    />
                        <TouchableOpacity style={[styles.btn, { backgroundColor: 'lightgreen', width: '30%' }]} onPress={handledis}>
                            <Text style={styles.btnText}> Converted </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                 
            </View>
        </ScrollView>
    );
};

export default Plastic;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 20,
         
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
        fontSize: 18,
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
