import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';

const ProfileScreen = () => {

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Profil</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.profileContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: 'https://via.placeholder.com/128x128' }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.cameraIconContainer}>
              <FontAwesome name="camera" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.profileTextContainer}>
            <Text style={styles.username}>UserXV16708249</Text>
          </View>
        </View>
        <Link href="/EditProfileScreen" style={styles.updateProfileButton}>
          <FontAwesome name="pencil" size={16} color="white" style={styles.pencilIcon} />
          <Text style={styles.updateProfileButtonText}>Ubah Profil</Text>
        </Link>
        <View style={styles.optionsWrapper}>
          <View style={styles.optionsContainer}>
            <View style={styles.optionRow}>
              <TouchableOpacity style={styles.optionButton}>
                <MaterialIcons name="phone" size={24} color="#B0CFFF" />
                <Text style={styles.optionText}>Hubungi Kami</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionButton}>
                <MaterialIcons name="description" size={24} color="#B0CFFF" />
                <Text style={styles.optionText}>Syarat & Ketentuan</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.optionRow}>
              <TouchableOpacity style={styles.optionButton}>
                <MaterialIcons name="lock" size={24} color="#B0CFFF" />
                <Text style={styles.optionText}>Kebijakan Privasi</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionButton}>
                <MaterialIcons name="info" size={24} color="#B0CFFF" />
                <Text style={styles.optionText}>Tentang Kami</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Link href="/LoginScreen" style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </Link>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <MaterialIcons name="home" size={32} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <MaterialIcons name="shopping-cart" size={32} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <MaterialIcons name="person" size={32} color="pink" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative', 
  },
  header: {
    backgroundColor: '#FDB6DB',
    height: 96,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', 
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    paddingHorizontal: 20, 
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  imageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 128,
    height: 128,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#fff',
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#B0CFFF',
    padding: 5,
    borderRadius: 20,
    alignItems: 'center',
    width: 40,
  },
  profileTextContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  updateProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B0CFFF',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    marginTop: 30,
    textAlign: 'center',
  },
  pencilIcon: {
    marginRight: 15,
  },
  updateProfileButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  optionsWrapper: {
    alignItems: 'center',
    marginTop: 30,
  },
  optionsContainer: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#FDB6DB',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'space-around',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
    width: 160,
    height: 80,
    borderWidth: 2,
    borderColor: '#FFF',
    marginHorizontal: 5,
  },  
  optionText: {
    marginLeft: 10,
    fontSize: 12,
    textAlign: 'left',
  },
  logoutButton: {
    width: '100%',
    height: 38.59,
    borderWidth: 2,
    borderColor: '#FDB6DB',
    borderRadius: 5,
    marginTop: 80,
    textAlign: 'center',
    lineHeight: 38.59
  },
  logoutButtonText: {
    color: '#FDB6DB',
    fontSize: 20,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fff',
  },
  footerButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProfileScreen;
