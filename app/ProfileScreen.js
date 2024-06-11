import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../lib/supabase';

const ProfileScreen = () => {
  const [profile, setProfile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState('https://via.placeholder.com/128x128');

  useEffect(() => {
    async function fetchProfile() {
      try {
        const { data: userData, error: userError } = await supabase.auth.getUser();

        if (userError) {
          console.error('Error fetching user:', userError);
          return;
        }

        const user = userData?.user;

        if (user) {
          const { data, error } = await supabase
            .from('profiles')
            .select('username, avatar_url')
            .eq('id', user.id)
            .single();

          if (error) {
            console.error('Error fetching profile:', error);
          } else {
            setProfile(data);
            if (data.avatar_url) {
              setAvatarUrl(data.avatar_url);
            }
          }
        }
      } catch (error) {
        console.error('Unexpected error fetching profile:', error);
      }
    }

    fetchProfile();
  }, []);

  async function handleSignOut() {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('Error signing out:', error);
      } else {
        router.replace('/LoginScreen');
      }
    } catch (error) {
      console.error('Unexpected error during sign out:', error);
    }
  }

  /* const handleUploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      const { uri } = result.assets[0];
      const path = `avatars/${uri.split('/').pop()}`;
      const file = {
        uri,
        name: path,
        type: 'image/jpeg',
      };

      try {
        console.log('Uploading image...');
        const { data, error } = await supabase.storage
          .from('avatars')
          .upload(path, file);

        if (error) {
          console.error('Error uploading image:', error);
          Alert.alert('Upload Error', error.message);
        } else {
          console.log('Image uploaded:', data);

          const { publicUrl, error: publicUrlError } = supabase
            .storage
            .from('avatars')
            .getPublicUrl(data.path);

          if (publicUrlError) {
            console.error('Error getting public URL:', publicUrlError);
          } else {
            console.log('New Public URL:', publicUrl.publicURL);
            setAvatarUrl(publicUrl.publicURL);
            updateProfileAvatar(publicUrl.publicURL);
          }
        }
      } catch (error) {
        console.error('Unexpected error during image upload:', error);
      }
    }
  }; */

  const updateProfileAvatar = async (url) => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;

      if (user) {
        const { error } = await supabase
          .from('profiles')
          .update({ avatar_url: url })
          .eq('id', user.id);

        if (error) {
          console.error('Error updating profile:', error);
        }
      }
    } catch (error) {
      console.error('Unexpected error updating profile:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Profil</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.profileContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: avatarUrl }}
              style={styles.profileImage}
              onError={(e) => console.error('Image loading error:', e.nativeEvent.error)}
            />
            <TouchableOpacity style={styles.cameraIconContainer}>
              <FontAwesome name="camera" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.profileTextContainer}>
            <Text style={styles.username}>{profile ? profile.username : 'Loading...'}</Text>
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
        <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Link href="/HomeScreen" style={styles.footerButton}>
          <MaterialIcons name="home" size={32} color="black" />
        </Link>
        <Link href="/BelanjaBumilScreen" style={styles.footerButton}>
          <MaterialIcons name="shopping-cart" size={32} color="black" />
        </Link>
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
    width: '48%', // Adjusted to fit within container
    height: 80,
    borderWidth: 2,
    borderColor: '#FFF',
    marginHorizontal: 5,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 12,
    textAlign: 'left',
    flexShrink: 1, // Prevents text from overflowing
  },
  logoutButton: {
    width: '100%',
    height: 38.59,
    borderWidth: 2,
    borderColor: '#FDB6DB',
    borderRadius: 5,
    marginTop: 80,
    alignItems: 'center',
    justifyContent: 'center', // Adjusted for proper alignment
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