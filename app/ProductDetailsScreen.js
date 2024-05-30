import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { supabase } from '../lib/supabase';

const ProductDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params;
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;
        setUserId(userData.user.id);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const addToCart = async () => {
    if (!userId) {
      Alert.alert('User not logged in', 'Please log in to add items to your cart.');
      return;
    }
  
    try {
      const { data: existingCartItems, error: fetchError } = await supabase
        .from('cart')
        .select('*')
        .eq('id', userId)
        .eq('barang_id', product.barang_id);
  
      if (fetchError) throw fetchError;
  
      console.log('Existing cart items:', existingCartItems);
  
      if (existingCartItems.length > 0) {
        const existingItem = existingCartItems[0];
        const { data, error } = await supabase
          .from('cart')
          .update({ quantity: existingItem.quantity + 1 })
          .eq('cart_id', existingItem.cart_id);
  
        if (error) {
          console.error('Error updating cart:', error);
          Alert.alert('Error', 'There was an error adding the product to the cart.');
        } else {
          console.log('Updated cart item:', data);
          Alert.alert('Success', 'Product added to cart successfully!');
        }
      } else {
        const { data, error } = await supabase
          .from('cart')
          .insert([{ id: userId, barang_id: product.barang_id, quantity: 1 }]);
  
        if (error) {
          console.error('Error adding to cart:', error);
          Alert.alert('Error', 'There was an error adding the product to the cart.');
        } else {
          console.log('Inserted cart item:', data);
          Alert.alert('Success', 'Product added to cart successfully!');
        }
      }
    } catch (error) {
      console.error('Unexpected error adding to cart:', error);
      Alert.alert('Error', 'There was an unexpected error adding the product to the cart.');
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>List Produk</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('CartScreen')}>
            <MaterialIcons name="shopping-cart" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.content}>
          <Image source={{ uri: product.gambar_url }} style={styles.productImage} />
          <Text style={styles.productName}>{product.nama_barang}</Text>
          <View style={styles.productRatingContainer}>
            <MaterialIcons name="star" size={24} color="yellow" />
            <Text style={styles.productRating}>{product.rating}</Text>
          </View>
          <Text style={styles.productPrice}>Rp{product.harga.toLocaleString()}</Text>
          <Text style={styles.productDescriptionTitle}>Deskripsi Produk</Text>
          <Text style={styles.productDescription}>{product.deskripsi}</Text>
        </ScrollView>
        <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
          <Text style={styles.addToCartButtonText}>+ Tambahkan ke Keranjang</Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  backButton: {
    marginLeft: 10,
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
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  content: {
    paddingBottom: 20,
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginVertical: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  productRating: {
    fontSize: 18,
    marginLeft: 5,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  productDescriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  addToCartButton: {
    backgroundColor: '#B0CFFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductDetailsScreen;
