import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const HistoryScreen = () => {
  const [selectedTab, setSelectedTab] = useState('Belum Bayar');

  const history = [
    {
      id: 'KS29022401',
      time: '10.00 - 11.00 29/02/2024',
      type: 'Konsultasi Kesehatan',
    },
    {
      id: 'KS29022402',
      time: '12.00 - 13.00 01/03/2024',
      type: 'Konsultasi Kesehatan',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Riwayat Konsultasi</Text>
      </View>
      <View style={styles.tabContainer}>
      <TouchableOpacity onPress={() => setSelectedTab('Belum Bayar')} style={selectedTab === 'Belum Bayar' ? styles.activeTab : styles.tab}>
          <Text>Belum Bayar</Text>
        </TouchableOpacity>
      <TouchableOpacity onPress={() => setSelectedTab('Selesai')} style={selectedTab === 'Selesai' ? styles.activeTab : styles.tab}>
          <Text>Selesai</Text>
        </TouchableOpacity>
      </View>
      {selectedTab === 'Selesai' ? (
        <View style={styles.noConsultation}>
          <Text>Anda belum melakukan konsultasi</Text>
        </View>
      ) : (
        <ScrollView>
          {history.map((item) => (
            <TouchableOpacity key={item.id} style={styles.historyItem}>
              <Text>{item.type}</Text>
              <Text>Kode Konsultasi: {item.id}</Text>
              <Text>Waktu Konsultasi: {item.time}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#f8bbd0',
    padding: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  tab: {
    marginHorizontal: 20,
    paddingVertical: 10,
  },
  activeTab: {
    marginHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  noConsultation: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyItem: {
    backgroundColor: '#e3f2fd',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
  },
});

export default HistoryScreen;