import { Image, StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';
export default function HomeScreen() {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const router=useRouter();

  return (
    <View style={[styles.main, { width: width, height: height }]}>
      {/* Navigation */}
      <View style={styles.nav}>
        <Text style={styles.text}>GreenGuardians</Text>
        <View style={styles.logo}><Ionicons size={28} name="person" color={'#37B7C3'} /></View>
      </View>
        

      {/* Content */}
      <View style={styles.con}>
        <TouchableOpacity style={styles.box} onPress={()=>{router.push('./pages/login')}}>
          <Text style={styles.boxText}>Plastics Proccess    <Ionicons size={28} name="arrow-forward-circle" color={'white'} />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={()=>{router.push('./pages/waste')}}>
          <Text style={styles.boxText}>BSFL Proccess      <Ionicons size={28} name="arrow-forward-circle" color={'white'} />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#243642',
    flex: 1,
  },
  nav: {
    width: '100%',
    height: 90,
    backgroundColor: '#243642',
    borderRadius:10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    marginTop:20,
    flexDirection:'row',
    borderBottomColor:'lightgrey',
    borderBottomWidth:1,
  },
  text: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFF',
    fontStyle: 'italic',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderColor: '#37B7C3',
    opacity:2,
    borderWidth: 2,
    marginLeft: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  con: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  box: {
    width: '100%',
    height: 200,
    backgroundColor: '#3C5B6F',
    borderRadius: 15,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
  },
  boxText: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: '600',
  },
}); 