import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SOSTypes = [
  {
    id: 1,
    name: 'Ambulans',
    icon: require('../assets/ambulans.png'),
    screen: 'EmergencyRegistrationScreen', 
  },
  {
    id: 2,
    name: 'Dokter / Bidan',
    icon: require('../assets/doctor.png'), 
    screen: 'EmergencyRegistrationScreen', 
  },
];

const SOSScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Layanan Darurat</Text>
      </View>
      <Text style={styles.title}>Jenis Layanan Darurat</Text>
      <View style={styles.sosContainer}>
        {SOSTypes.map((type) => (
          <View key={type.id} style={styles.sosItem}>
            <Image source={type.icon} style={styles.sosIcon} />
            <TouchableOpacity
              style={styles.sosButton}
              onPress={() => navigation.navigate(type.screen)}
            >
              <Text style={styles.sosButtonText}>{type.name}</Text>
              <MaterialIcons name="arrow-forward" size={24} color="white" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.helpButton}>
        <View style={styles.helpButtonTextContainer}>
          <Text style={styles.helpButtonText}>Butuh Bantuan?</Text>
        </View>
        <View style={styles.helpButtonIconContainer}>
          <MaterialIcons name="call" size={28} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#FDB6DB',
    height: 96,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  backButton: {
    marginLeft: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    marginRight: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 30,
    paddingHorizontal: 20,
  },
  sosContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 30,
  },
  sosItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  sosIcon: {
    width: 83,
    height: 83,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FDB6DB',
    marginRight: 10,
  },
  sosButton: {
    width: 238,
    height: 83,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B0CFFF',
    padding: 20,
    borderRadius: 5,
    flex: 1,
    justifyContent: 'space-between',
  },
  sosButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  helpButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    height: 60,
    width: 187,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#139510',
  },
  helpButtonTextContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  helpButtonText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  helpButtonIconContainer: {
    flex: 1,
    backgroundColor: '#139510',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 60,
  },
});

export default SOSScreen;