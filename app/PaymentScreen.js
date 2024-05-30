import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { supabase } from '../lib/supabase';

const PaymentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { transactionId, totalAmount } = route.params;

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      const { error: updateError } = await supabase
        .from('transactions')
        .update({
          card_number: cardNumber,
          expiry_date: expiryDate,
          cvv: cvv,
          status: 'completed',
        })
        .eq('transaction_id', transactionId);

      if (updateError) throw updateError;

      Alert.alert('Success', 'Payment successful!');
      navigation.goBack();
    } catch (error) {
      console.error('Error processing payment:', error);
      Alert.alert('Error', 'There was an error processing your payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Pembayaran</Text>
      </View>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Payment Summary</Text>
        <View style={styles.summaryDetail}>
          <Text style={styles.summaryDetailText}>Biaya Produk/Layanan</Text>
          <Text style={styles.summaryDetailText}>Rp{totalAmount.toLocaleString()}</Text>
        </View>
        <View style={styles.summaryDetail}>
          <Text style={styles.summaryDetailText}>Biaya Layanan Platform</Text>
          <Text style={styles.summaryDetailText}>Rp5.000</Text>
        </View>
        <View style={styles.summaryDetail}>
          <Text style={styles.summaryDetailText}>Pajak</Text>
          <Text style={styles.summaryDetailText}>Rp1.000</Text>
        </View>
        <View style={styles.summaryDetail}>
          <Text style={styles.summaryDetailText}>Total</Text>
          <Text style={styles.summaryDetailText}>Rp{(totalAmount + 6000).toLocaleString()}</Text>
        </View>
      </View>
      <View style={styles.paymentContainer}>
        <Text style={styles.paymentTitle}>Payment Methods</Text>
        <View style={styles.paymentMethod}>
          <MaterialIcons name="credit-card" size={24} color="black" />
          <Text style={styles.paymentMethodText}>Kartu Kredit</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Nomor Kartu Kredit*"
          value={cardNumber}
          onChangeText={setCardNumber}
        />
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.inputSmall]}
            placeholder="MM/YY"
            value={expiryDate}
            onChangeText={setExpiryDate}
          />
          <TextInput
            style={[styles.input, styles.inputSmall]}
            placeholder="CVV"
            value={cvv}
            onChangeText={setCvv}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.payButton} onPress={handlePayment} disabled={loading}>
        <Text style={styles.payButtonText}>Bayar</Text>
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
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  summaryContainer: {
    backgroundColor: '#B0CFFF',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  summaryDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  summaryDetailText: {
    color: '#fff',
  },
  paymentContainer: {
    backgroundColor: '#B0CFFF',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  paymentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  paymentMethodText: {
    marginLeft: 10,
    color: '#fff',
  },
  input: {
    backgroundColor: '#E6F0FF',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16,
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputSmall: {
    width: '48%',
  },
  payButton: {
    backgroundColor: '#B0CFFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PaymentScreen;
