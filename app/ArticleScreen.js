import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Image, Modal, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../lib/supabase';

const ArticleScreen = () => {
    const navigation = useNavigation();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase.from('artikel').select('*');
    
                if (error) {
                    console.error('Error fetching articles:', error);
                    throw error;
                }
                setArticles(data);
            }
            catch (error) {
                console.error('Error fetching articles:', error);
            }
            finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    const renderArticle = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('ArticleDetailScreen', {article : item})}>
            <View style={styles.articleCard}>
                <Image source={{uri: item.image_url}} style={styles.articleImage} />
                <View style={styles.articleInfo}>
                    <Text style={styles.articleTitle}>{item.title}</Text>
                    <Text style={styles.articleInfoText}>{item.category}</Text>
                    <Text style={styles.articleInfoText}>{item.published_date.toLocaleString()}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
          <View style={styles.loadingContainer}>
            <Text>Loading...</Text>
          </View>
        );
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.iconButton}>
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
            <FlatList
                data={articles}
                renderItem={renderArticle}
                keyExtractor={(article) => article.id.toString()}
                contentContainerStyle={styles.articleList}
                ListEmptyComponent={<Text>No Articles Available</Text>}
            />
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
        marginBottom: 25,
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
    articleList: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    articleCard: {
        flexDirection: 'row',
        backgroundColor: '#B0CFFF',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
    },
    articleImage: {
        width: 64,
        height: 64,
        borderRadius: 10,
        marginRight: 10,
    },
    articleInfo: {
        flex: 1,
    },
    articleTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    articleInfoText: {
        fontSize: 16,
        color: '#fff',
    },
    iconButton: {
        marginLeft: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default ArticleScreen;