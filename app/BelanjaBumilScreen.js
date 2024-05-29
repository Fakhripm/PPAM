import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Link, router } from 'expo-router';

const products = [
  {
    id: '1',
    name: 'Bedak Bayi J&J',
    price: 'Rp35.600',
    seller: 'Toko Bayi Chuy',
    rating: 4.9,
    image: { uri: 'https://via.placeholder.com/64' },
  },
  {
    id: '2',
    name: 'Minyak Telon Cap Lang',
    price: 'Rp41.300',
    seller: 'Baby UwU',
    rating: 4.9,
    image: { uri: 'https://via.placeholder.com/64' },
  },
  {
    id: '3',
    name: 'Cek USG 4D',
    price: 'Rp214.800',
    seller: 'UnyuBaby',
    rating: 4.8,
    image: { uri: 'https://via.placeholder.com/64' },
  },
  {
    id: '4',
    name: 'Pampers Popok Bayi',
    price: 'Rp77.900',
    seller: 'Toko Bayi Chuy',
    rating: 4.7,
    image: { uri: 'https://via.placeholder.com/64' },
  },
  {
    id: '5',
    name: 'Milna Bubur Bayi',
    price: 'Rp45.100',
    seller: 'ToserBayi',
    rating: 4.5,
    image: { uri: 'https://via.placeholder.com/64' },
  },
];

const BelanjaBumilScreen = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [sortOption, setSortOption] = useState('Rating');

  const renderItem = ({ item }) => (
    <View style={styles.productCard}>
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
        <Text style={styles.productSeller}>by {item.seller}</Text>
        <View style={styles.productRating}>
          <MaterialIcons name="star" size={16} color="yellow" />
          <Text style={styles.productRatingText}>{item.rating}</Text>
        </View>
        <Text style={styles.productDescription}>Lorem ipsum dolor sit amet...</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>List Produk</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
            <MaterialIcons name="refresh" size={28} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="shopping-cart" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <TextInput
        style={styles.searchBar}
        placeholder="Cari Produk Di Sini"
        value={search}
        onChangeText={setSearch}
      />
      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Urutkan Berdasarkan</Text>
        <TouchableOpacity style={styles.sortButton}>
          <Text style={styles.sortButtonText}>{sortOption}</Text>
          <MaterialIcons name="arrow-drop-down" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productList}
      />
      <TouchableOpacity style={styles.filterButton}>
        <Text style={styles.filterButtonText}>Filter</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <MaterialIcons name="home" size={32} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <MaterialIcons name="shopping-cart" size={32} color="pink" />
        </TouchableOpacity>
        <Link href="/ProfileScreen" style={styles.footerButton}>
          <MaterialIcons name="person" size={32} color="black" />
        </Link>
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
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 10,
  },
  searchBar: {
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 20,
    marginVertical: 10,
    fontSize: 16,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  sortLabel: {
    fontSize: 16,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  sortButtonText: {
    fontSize: 16,
    marginRight: 5,
  },
  productList: {
    paddingHorizontal: 20,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#B0CFFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  productImage: {
    width: 64,
    height: 64,
    borderRadius: 10,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  productSeller: {
    fontSize: 14,
    color: '#666',
  },
  productRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productRatingText: {
    fontSize: 14,
    marginLeft: 5,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
  },
  filterButton: {
    position: 'absolute',
    bottom: 80,
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: '#FF1493',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    zIndex: 1,
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 16,
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

export default BelanjaBumilScreen;
