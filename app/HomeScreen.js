import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';
import { supabase } from '../lib/supabase';

const HomeScreen = () => {
    const [profile, setProfile] = useState(null);
    const navigation = useNavigation();

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
              }
            }
          } catch (error) {
            console.error('Unexpected error fetching profile:', error);
          }
        }
    
        fetchProfile();
      }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Halo, {profile ? profile.username : 'Loading...'}! </Text>
            </View>
            <View style={styles.babyAgeContainer}>
                <Image source={require('../assets/baby-icon.png')} style={styles.babyIcon} />
                <View>
                    <Text style={styles.babyAgeText}>Umur Bayi</Text>
                    <Text style={styles.babyAgeValue}>1 Minggu 2 Hari</Text>
                </View>
            </View>
            <View style={styles.featuresContainer}>
                <TouchableOpacity style={styles.featureButton} onPress={() => navigation.navigate('SOSScreen')}>
                    <Image source={require('../assets/sos-icon.png')} style={styles.featureIcon} />
                    <Text style={styles.featureText}>SOS Button</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.featureButton} onPress={() => navigation.navigate('HomeConsultationScreen')}>
                    <Image source={require('../assets/consult-icon.png')} style={styles.featureIcon} />
                    <Text style={styles.featureText}>Konsultasi</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.featureButton} onPress={() => navigation.navigate('TrackerScreen')}>
                    <Image source={require('../assets/tracker-icon.png')} style={styles.featureIcon} />
                    <Text style={styles.featureText}>Tracker Kehamilan</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.featureButton} onPress={() => navigation.navigate('ArticleScreen')}>
                    <Image source={require('../assets/article-icon.png')} style={styles.featureIcon} />
                    <Text style={styles.featureText}>Artikel</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.opiniBumilContainer}>
                <Text style={styles.opiniBumilHeader}>Opini Bumil</Text>
                <View style={styles.opiniBumilContent}>
                    <Image source={require('../assets/empty-box.png')} style={styles.opiniBumilIcon} />
                    <Text style={styles.opiniBumilText}>Belum ada survei yang berjalan saat ini. Silakan coba lagi nanti.</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerButton}>
                    <MaterialIcons name="home" size={32} color="pink" />
                </TouchableOpacity>
                <Link href="/BelanjaBumilScreen" style={styles.footerButton}>
                    <MaterialIcons name="shopping-cart" size={32} color="black" />
                </Link>
                <Link href='/ProfileScreen' style={styles.footerButton}>
                    <MaterialIcons name="person" size={32} color="black" />
                </Link>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#F7C7DB',
        paddingVertical: 20,
        alignItems: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    babyAgeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    babyIcon: {
        width: 50,
        height: 50,
        marginRight: 15,
    },
    babyAgeText: {
        color: '#F7C7DB',
        fontSize: 18,
        fontWeight: 'bold',
    },
    babyAgeValue: {
        fontSize: 16,
        color: '#000',
    },
    featuresContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginHorizontal: 20,
        marginVertical: 10,
    },
    featureButton: {
        alignItems: 'center',
        width: '45%',
        marginVertical: 10,
    },
    featureIcon: {
        width: 50,
        height: 50,
        marginBottom: 5,
    },
    featureText: {
        color: '#000',
        fontSize: 14,
        textAlign: 'center',
    },
    opiniBumilContainer: {
        flex: 1,
        backgroundColor: '#F7C7DB',
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
    },
    opiniBumilHeader: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    opiniBumilContent: {
        alignItems: 'center',
    },
    opiniBumilIcon: {
        width: 173,
        height: 109,
        marginBottom: 10,
    },
    opiniBumilText: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
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

export default HomeScreen;