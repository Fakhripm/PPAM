import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../lib/supabase';

const TransactionHistoryScreen = () => {
  const navigation = useNavigation();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('status', 'completed');

      if (error) {
        console.error('Error fetching transactions:', error);
        throw error;
      }

      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.transactionCard}>
      <Text style={styles.transactionText}>Transaction ID: {item.transaction_id}</Text>
      <Text style={styles.transactionText}>Total Amount: Rp{item.total_amount.toLocaleString()}</Text>
      <Text style={styles.transactionText}>Status: {item.status}</Text>
    </View>
  );

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
        <Text style={styles.headerText}>Transaction History</Text>
      </View>
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={(item) => item.transaction_id.toString()}
        contentContainerStyle={styles.transactionList}
        ListEmptyComponent={<Text>No transactions found</Text>}
      />
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
  transactionList: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  transactionCard: {
    backgroundColor: '#B0CFFF',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  transactionText: {
    fontSize: 16,
    color: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TransactionHistoryScreen;
