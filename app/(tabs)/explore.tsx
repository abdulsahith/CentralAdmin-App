import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Switch, Alert,TouchableOpacity } from 'react-native';
// import * as Notifications from 'expo-notifications';
// import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
function Settings() {
    const { width, height } = Dimensions.get('window');
    const [isEnabled, setEnable] = useState(false);
    const [locationEnabled, setLocationEnabled] = useState(false);
    const router=useRouter();

    // Function to toggle notifications
    // const toggleSwitch = async () => {
    //     if (!isEnabled) {
    //         const { status } = await Notifications.requestPermissionsAsync();
    //         if (status === 'granted') {
    //             setEnable(true);
    //             Alert.alert('Notification Enabled', 'You will now receive notifications.');
    //         } else {
    //             Alert.alert('Permission Denied', 'Notification permission is required.');
    //         }
    //     } else {
    //         setEnable(false);
    //         Alert.alert('Notification Disabled', 'You will no longer receive notifications.');
    //     }
    // };

    // Function to toggle location access
    // const toggleLocation = async () => {
    //     if (!locationEnabled) {
    //         const { status } = await Location.requestForegroundPermissionsAsync();
    //         if (status === 'granted') {
    //             setLocationEnabled(true);
    //             Alert.alert('Location Enabled', 'You can now access location services.');
    //         } else {
    //             Alert.alert('Permission Denied', 'Location permission is required.');
    //         }
    //     } else {
    //         setLocationEnabled(false);
    //         Alert.alert('Location Disabled', 'Location services have been disabled.');
    //     }
    // };
    const handleLogout = async () => {
        await AsyncStorage.removeItem('userToken');
        Alert.alert('Logged Out', 'You have been logged out.');
        router.push('/pages/login');
      };

    return (
        <View style={[styles.main, { width: width * 1, height: height * 1 }]}>
            {/* box 1 for login */}
            <View style={styles.box1}>
                <Text style={[styles.loginText, { color: 'white', marginLeft: 20, fontSize: 20 }]}>
                    Change your account
                </Text>
                <TouchableOpacity style={styles.loginView} onPress={handleLogout}>
                    <Text style={styles.loginText}>LOGOUT</Text>
                </TouchableOpacity>
            </View>

            {/* box 2 for settings */}
            
            <View style={styles.box2}>
                <View style={styles.lineView}>
                    <Text style={[styles.loginText, { color: 'white', marginLeft: 20, fontSize: 20 }]}>
                        Notifications
                    </Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "lightgreen" }}
                        thumbColor={isEnabled ? "lightgreen" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        // onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>

                <View style={styles.lineView}>
                    <Text style={[styles.loginText, { color: 'white', marginLeft: 20, fontSize: 20 }]}>
                        Enable Location
                    </Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "lightgreen" }}
                        thumbColor={locationEnabled ? "lightgreen" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        // onValueChange={toggleLocation}
                        value={locationEnabled}
                    />
                </View>

                <View style={styles.changeView}>
                    <Text style={[styles.loginText, { color: 'white', marginLeft: 20, fontSize: 20 }]}>
                        Change Community
                    </Text>
                    <View style={styles.changeCom}>
                        <Text style={styles.loginText}>Change</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default Settings;

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#243642',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 40
    },
    box1: {
        width: 350,
        height: 70,
        backgroundColor: '#405D72',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 0.2,
        elevation: 4,
        borderRadius: 10,
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    loginView: {
        width: 100,
        height: 50,
        backgroundColor: '#243642',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20
    },
    loginText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white'
    },
    box2: {
        width: 350,
        height: 350,
        backgroundColor: '#405D72',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
    },
    lineView: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 40
    },
    changeView: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 40
    },
    changeCom: {
        width: 100,
        height: 50,
        backgroundColor: '#243642',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 40
    },
});
