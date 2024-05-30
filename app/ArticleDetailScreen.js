import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Image, Modal, KeyboardAvoidingView, SafeAreaView, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Link } from 'expo-router';
import { supabase } from '../lib/supabase';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';

const ArticleDetailScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { article } = route.params;
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('ArticleScreen')} style={styles.iconButton}>
                    <MaterialIcons name='arrow-back' size={28} color='white' />
                </TouchableOpacity>
                <Text style={styles.headerText}>Artikel</Text>
                <View style={styles.headerIcons}>
                    <TouchableOpacity onPress={() => {}} style={styles.iconButton}>
                        <MaterialIcons name='search' size={28} color='white' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {}} style={styles.iconButton}>
                        <MaterialIcons name='bookmark' size={28} color='white' />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.imageContainer}>
                    <Image source={{uri: article.image_url}} style={styles.image} />
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{article.title}</Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <View style={styles.descriptionTextContainer}>
                        <Text style={styles.descriptionText}>{article.author}</Text>
                        <Text style={styles.descriptionText}>{article.category}</Text>
                        <Text style={styles.descriptionText}>{article.published_date.toLocaleString()}</Text>
                    </View>
                    <View style={styles.articleButton}>
                        <TouchableOpacity onPress={() => {}} style={styles.iconButton}>
                            <MaterialIcons name='bookmark' size={36} color='#B0CFFF' />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {}} style={styles.iconButton}>
                            <MaterialIcons name='share' size={36} color='#B0CFFF' />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.articleContainer}>
                    <Text style={styles.articleText}>{article.content}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
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
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'left',
        flex: 1,
        marginLeft: 25,
    },
    headerIcons: {
        flexDirection: 'row',
        position: 'absolute',
        right: 10,
    },
    imageContainer: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: 225,
        resizeMode: 'cover',
    },
    contentContainer: {
        marginBottom: 25,
    },
    titleText: {
        color: '#000',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
    },
    titleContainer: {
        flex: 1,
        padding: 10,
        marginBottom: 25,
    },
    iconButton: {
        marginLeft: 10,
    },
    descriptionContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    descriptionText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'semibold',
        textAlign: 'left',
        flex: 1,
        marginLeft: 5,
    },
    descriptionTextContainer: {
        padding: 5,
    },
    articleButton: {
        flexDirection: 'row',
        position: 'absolute',
        right: 20,
    },
    articleContainer: {
        flex:1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 25,
        padding: 15,
    },
    articleText: {
        textAlign: 'justify',
        fontSize: 16,
        color: '#000',
        fontWeight: 'normal',
        flex: 1
    }
});

export default ArticleDetailScreen;