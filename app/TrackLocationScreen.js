import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const TrackLocationScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Lacak Lokasi</Text>
      </View>
      <Text style={styles.title}>
        Lokasi <Text style={styles.liveText}>Live</Text> Ambulans
      </Text>
      <Image source={require('../assets/maps.png')} style={styles.mapImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#FDB6DB',
    height: 96,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
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
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 130,
  },
  liveText: {
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  mapImage: {
    width: '90%',
    height: 300,
    borderRadius: 10,
    marginTop: 20,
  },
});

export default TrackLocationScreen;
