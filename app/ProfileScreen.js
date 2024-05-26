import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Profil</Text>
      </View>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/128x128' }} 
          style={styles.profileImage}
        />
        <View style={styles.profileTextContainer}>
          <Text style={styles.username}>UserXV16708249</Text>
          <TouchableOpacity style={styles.cameraIconContainer}>
            <FontAwesome name="camera" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.updateProfileButton} onPress={handleEditProfile}>
        <Text style={styles.updateProfileButtonText}>Ubah Profil</Text>
      </TouchableOpacity>
      <View style={styles.optionsWrapper}>
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionButton}>
            <MaterialIcons name="phone" size={24} color="dodgerblue" />
            <Text style={styles.optionText}>Hubungi Kami</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <MaterialIcons name="description" size={24} color="dodgerblue" />
            <Text style={styles.optionText}>Syarat & Ketentuan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <MaterialIcons name="lock" size={24} color="dodgerblue" />
            <Text style={styles.optionText}>Kebijakan Privasi</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <MaterialIcons name="info" size={24} color="dodgerblue" />
            <Text style={styles.optionText}>Tentang Kami</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <TouchableOpacity>
          <MaterialIcons name="home" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="shopping-cart" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="person" size={28} color="pink" />
        </TouchableOpacity>
      </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 128,
    height: 128,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#fff',
    marginRight: 20,
  },
  profileTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cameraIconContainer: {
    marginTop: 5,
    backgroundColor: 'dodgerblue',
    padding: 5,
    borderRadius: 20,
    alignItems: 'center',
    width: 40,
  },
  updateProfileButton: {
    backgroundColor: '#B0CFFF',
    width: 343,
    height: 36.47,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 34,
    marginTop: 20,
  },
  updateProfileButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionsWrapper: {
    alignItems: 'center',
    marginTop: 20,
  },
  optionsContainer: {
    width: 343,
    height: 202,
    borderWidth: 2,
    borderColor: '#FDB6DB',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'space-around',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    marginTop: 10,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
  },
  logoutButton: {
    width: 343,
    height: 38.59,
    borderWidth: 2,
    borderColor: '#FDB6DB',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 110,
  },
  logoutButtonText: {
    color: '#FDB6DB',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#eaeaea',
  },
});

export default ProfileScreen;
