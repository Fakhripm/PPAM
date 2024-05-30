import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../lib/supabase';

const CartScreen = () => {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  useEffect(() => {
    fetchCartItems();
    fetchAddresses();
  }, []);

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user.id;

      if (userId) {
        const { data, error } = await supabase
          .from('cart')
          .select(`
            cart_id, 
            quantity,
            barang_id,
            BelanjaBumil:BelanjaBumil!cart_barang_id_fkey (
              nama_barang, 
              gambar_url, 
              harga
            )
          `)
          .eq('id', userId);

        if (error) {
          console.error('Error fetching cart items:', error);
        } else {
          setCartItems(data);
        }
      }
    } catch (error) {
      console.error('Unexpected error fetching cart items:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAddresses = async () => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user.id;

      if (userId) {
        const { data, error } = await supabase
          .from('alamat')
          .select('*')
          .eq('user_id', userId);

        if (error) {
          console.error('Error fetching addresses:', error);
        } else {
          setAddresses(data);
        }
      }
    } catch (error) {
      console.error('Unexpected error fetching addresses:', error);
    }
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.BelanjaBumil.harga * item.quantity, 0);
  };

  const handleCheckout = async () => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user.id;
      const totalAmount = calculateTotalAmount();
      if (userId && selectedAddressId && totalAmount) {
        const { data, error } = await supabase
          .from('transactions')
          .insert({
            user_id: userId,
            address_id: selectedAddressId,
            total_amount: totalAmount + 6000, 
            payment_method: 'Kartu Kredit',
            status: 'pending',
          })
          .select('*')
          .single();

        if (error) {
          console.error('Error during checkout:', error);
          Alert.alert('Error', 'There was an error during checkout');
        } else {
          navigation.navigate('PaymentScreen', { transactionId: data.transaction_id, totalAmount: totalAmount });
        }
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      Alert.alert('Error', 'There was an error during checkout');
    }
  };

  const renderAddressItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.addressContent, selectedAddressId === item.alamat_id && styles.selectedAddress]}
      onPress={() => setSelectedAddressId(item.alamat_id)}
    >
      <MaterialIcons name="location-on" size={30} color="white" />
      <View>
        <Text style={styles.addressText}>{item.nama_penerima}</Text>
        <Text style={styles.addressDetailText}>
          {item.nama_jalan}, {item.kelurahan}, {item.kecamatan}, {item.kabupaten_kota}, {item.provinsi}, {item.kode_pos}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.BelanjaBumil.gambar_url }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.BelanjaBumil.nama_barang}</Text>
        <Text style={styles.productPrice}>Rp{item.BelanjaBumil.harga.toLocaleString()}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => updateQuantity(item.cart_id, item.quantity - 1)}>
            <MaterialIcons name="remove" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.productQuantity}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => updateQuantity(item.cart_id, item.quantity + 1)}>
            <MaterialIcons name="add" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => removeItemsByProduct(item.barang_id)} style={styles.removeButton}>
        <MaterialIcons name="delete" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  const removeItemsByProduct = async (barangId) => {
    try {
      const { error } = await supabase.from('cart').delete().eq('barang_id', barangId);

      if (error) {
        console.error('Error removing items:', error);
      } else {
        fetchCartItems();
      }
    } catch (error) {
      console.error('Unexpected error removing items:', error);
    }
  };

  const updateQuantity = async (cartId, newQuantity) => {
    if (newQuantity <= 0) {
      const item = cartItems.find((item) => item.cart_id === cartId);
      removeItemsByProduct(item.barang_id);
      return;
    }
    try {
      const { error } = await supabase
        .from('cart')
        .update({ quantity: newQuantity })
        .eq('cart_id', cartId);

      if (error) {
        console.error('Error updating quantity:', error);
      } else {
        setCartItems((prevItems) => 
          prevItems.map((item) => 
            item.cart_id === cartId ? { ...item, quantity: newQuantity } : item
          )
        );
      }
    } catch (error) {
      console.error('Unexpected error updating quantity:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Keranjang</Text>
      </View>
      <Text style={styles.addressTitle}>Alamat Pengiriman</Text>
      <View style={styles.addressContainer}>
        <FlatList
          data={addresses}
          renderItem={renderAddressItem}
          keyExtractor={(item) => item.alamat_id}
          contentContainerStyle={styles.addressList}
          ListEmptyComponent={<Text>No addresses found</Text>}
        />
        <TouchableOpacity onPress={() => navigation.navigate('AddAddressScreen')} style={styles.addAddressButton}>
          <MaterialIcons name="add" size={24} color="black" />
          <Text style={styles.addAddressButtonText}>Tambahkan Alamat Baru</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.catalogTitle}>Katalog Belanja</Text>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.barang_id.toString()} 
        contentContainerStyle={styles.cartList}
        ListEmptyComponent={<Text>No items in the cart</Text>}
      />
      <TouchableOpacity 
        style={styles.checkoutButton} 
        onPress={handleCheckout}
      >
        <Text style={styles.checkoutButtonText}>Checkout</Text>
      </TouchableOpacity>
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
  },
  backButton: {
    position: 'absolute',
    left: 10,
    marginLeft: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  addressContainer: {
    padding: 20,
    backgroundColor: '#B0CFFF',
    borderRadius: 10,
    margin: 20,
  },
  addressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
    marginHorizontal: 20,
  },
  addressContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#B0CFFF',
    marginBottom: 10,
  },
  selectedAddress: {
    borderColor: '#000',
    borderWidth: 2,
  },
  addressText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  addressDetailText: {
    fontSize: 14,
    color: '#fff',
  },
  addressList: {
    marginBottom: 20,
  },
  addAddressButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addAddressButtonText: {
    marginLeft: 5,
    color: '#000',
    fontSize: 16,
  },
  catalogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  cartList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#B0CFFF',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  productImage: {
    width: 64,
    height: 64,
    borderRadius: 10,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  productQuantity: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  removeButton: {
    marginLeft: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutButton: {
    backgroundColor: '#B0CFFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartScreen;
