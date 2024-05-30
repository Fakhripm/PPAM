import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Image, Modal, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';
import { supabase } from '../lib/supabase';

const HomeScreen = () => {
    const navigation = useNavigation();
    
    return (
        <SafeAreaView style={{alignItems:'center', justifyContent:'center', flex:1}}>
            <View style={{alignItems:'center', justifyContent:'center'}}>
                <TouchableOpacity onPress={() => navigation.navigate('ArticleScreen')}>
                    <Text>Go To Article</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('SOSScreen')}>
                    <Text>Go To SOS Service</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('HomeConsultationScreen')}>
                    <Text>Go To Consultation</Text>
                </TouchableOpacity>
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
})

export default HomeScreen;