import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Image, Modal, KeyboardAvoidingView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';
import { supabase } from '../lib/supabase';
import { Picker } from '@react-native-picker/picker';

const BelanjaBumilScreen = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [sortOption, setSortOption] = useState('Rating');
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [isSortVisible, setSortVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productType, setProductType] = useState('');
  const [location, setLocation] = useState('');
  const [locations, setLocations] = useState([]);
  const [appliedFilters, setAppliedFilters] = useState({ productType: '', location: '' });

  useEffect(() => {
    fetchProducts();
    fetchLocations();
  }, [sortOption, appliedFilters]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let query = supabase.from('BelanjaBumil').select('*');
      if (appliedFilters.productType) {
        query = query.eq('Jenis', appliedFilters.productType);
      }
      if (appliedFilters.location) {
        query = query.eq('lokasi', appliedFilters.location);
      }
      if (sortOption === 'Rating') {
        query = query.order('rating', { ascending: false });
      } else if (sortOption === 'Harga') {
        query = query.order('harga', { ascending: true });
      }
      const { data, error } = await query;
      if (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLocations = async () => {
    try {
      const { data, error } = await supabase
        .from('BelanjaBumil')
        .select('lokasi');

      if (error) {
        console.error('Error fetching locations:', error);
        throw error;
      }

      const uniqueLocations = [...new Set(data.map((item) => item.lokasi))];
      setLocations(uniqueLocations);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('transactions').select('*');

      if (error) {
        console.error('Error fetching transactions:', error);
        throw error;
      }

      console.log('Fetched transactions:', data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    setAppliedFilters({ productType, location });
    setFilterVisible(false);
  };

  const resetFilters = () => {
    setProductType(appliedFilters.productType);
    setLocation(appliedFilters.location);
    setFilterVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ProductDetailsScreen', { product: item })}>
      <View style={styles.productCard}>
        <Image source={{ uri: item.gambar_url }} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.nama_barang}</Text>
          <Text style={styles.productPrice}>Rp{item.harga.toLocaleString()}</Text>
          <Text style={styles.productSeller}>by {item.toko}</Text>
          <View style={styles.productRating}>
            <MaterialIcons name="star" size={16} color="yellow" />
            <Text style={styles.productRatingText}>{item.rating}</Text>
          </View>
          <Text style={styles.productDescription}>{item.deskripsi}</Text>
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
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.header}>
        <Text style={styles.headerText}>List Produk</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={fetchTransactions} style={styles.iconButton}>
            <MaterialIcons name="refresh" size={28} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('CartScreen')} style={styles.iconButton}>
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
        <TouchableOpacity style={styles.sortButton} onPress={() => setSortVisible(true)}>
          <Text style={styles.sortButtonText}>{sortOption}</Text>
          <MaterialIcons name="arrow-drop-down" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={products.filter(product => product.nama_barang.toLowerCase().includes(search.toLowerCase()))}
        renderItem={renderItem}
        keyExtractor={(item) => item.barang_id.toString()}
        contentContainerStyle={styles.productList}
        ListEmptyComponent={<Text>No products available</Text>}
      />
      <TouchableOpacity style={styles.filterButton} onPress={() => setFilterVisible(true)}>
        <MaterialIcons name="filter-list" size={24} color="white" />
        <Text style={styles.filterButtonText}>Filter</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Link href='/HomeScreen' style={styles.footerButton}>
          <MaterialIcons name="home" size={32} color="black" />
        </Link>
        <TouchableOpacity style={styles.footerButton}>
          <MaterialIcons name="shopping-cart" size={32} color="pink" />
        </TouchableOpacity>
        <Link href="/ProfileScreen" style={styles.footerButton}>
          <MaterialIcons name="person" size={32} color="black" />
        </Link>
      </View>
      
      <Modal
        visible={isFilterVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setFilterVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.filterContainer}>
            <Text style={styles.filterModalTitle}>Filter</Text>
            <Text style={styles.filterLabel}>Jenis Produk</Text>
            <View style={styles.filterButtons}>
              <TouchableOpacity
                style={[
                  styles.filterButtonOption,
                  productType === '' && styles.selectedFilterButtonOption,
                ]}
                onPress={() => setProductType('')}
              >
                <Text style={productType === '' ? styles.selectedFilterButtonText : styles.filterButtonText}>
                  Semua
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.filterButtonOption,
                  productType === 'Barang' && styles.selectedFilterButtonOption,
                ]}
                onPress={() => setProductType('Barang')}
              >
                <Text style={productType === 'Barang' ? styles.selectedFilterButtonText : styles.filterButtonText}>
                  Barang
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.filterButtonOption,
                  productType === 'Layanan' && styles.selectedFilterButtonOption,
                ]}
                onPress={() => setProductType('Layanan')}
              >
                <Text style={productType === 'Layanan' ? styles.selectedFilterButtonText : styles.filterButtonText}>
                  Layanan
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.filterLabel}>Lokasi</Text>
            <Picker
              selectedValue={location}
              style={styles.picker}
              onValueChange={(itemValue) => setLocation(itemValue)}
            >
              <Picker.Item label="Pilih Lokasi" value="" />
              {locations.map((loc, index) => (
                <Picker.Item key={index} label={loc} value={loc} />
              ))}
            </Picker>
            <View style={styles.filterActions}>
              <TouchableOpacity style={styles.cancelButton} onPress={resetFilters}>
                <Text style={styles.cancelButtonText}>Batalkan</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={applyFilters}>
                <Text style={styles.saveButtonText}>Simpan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={isSortVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setSortVisible(false)}
      >
        <View style={styles.sortModal}>
          <View style={styles.sortOptions}>
            <TouchableOpacity style={styles.sortOptionButton} onPress={() => { setSortOption('Rating'); setSortVisible(false); }}>
              <Text style={styles.sortOptionText}>Rating</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sortOptionButton} onPress={() => { setSortOption('Harga'); setSortVisible(false); }}>
              <Text style={styles.sortOptionText}>Harga</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
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
    textAlign: 'center',
    flex: 1,
  },
  headerIcons: {
    flexDirection: 'row',
    position: 'absolute',
    right: 10,
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
    paddingBottom: 100,
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
    color: '#FFF',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  productSeller: {
    fontSize: 14,
    color: '#FFF',
  },
  productRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productRatingText: {
    fontSize: 14,
    marginLeft: 5,
    color: '#FFF',
  },
  productDescription: {
    fontSize: 14,
    color: '#FFF',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 80,
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: '#FDB6DB',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    zIndex: 1,
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
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
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  filterContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 338,
  },
  filterModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  filterButtons: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  filterButtonOption: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  selectedFilterButtonOption: {
    backgroundColor: '#B0CFFF',
  },
  filterButtonText: {
    fontSize: 16,
    color: '#000',
  },
  selectedFilterButtonText: {
    fontSize: 16,
    color: '#FFF',
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    marginBottom: 20,
  },
  filterActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#FDB6DB',
    borderWidth: 2,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButtonText: {
    color: '#FDB6DB',
    fontSize: 16,
  },
  saveButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#B0CFFF',
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sortModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sortOptions: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '80%',
    padding: 20,
    alignItems: 'center',
  },
  sortOptionButton: {
    padding: 10,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  sortOptionText: {
    fontSize: 18,
  },
});

export default BelanjaBumilScreen;
