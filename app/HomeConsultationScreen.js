import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
import { Link } from 'expo-router';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mulai Konsultasi</Text>
      <View style={styles.cardContainer}>
        <Link href="/ConsultationScreen" style={styles.card}>
          <View style={styles.cardContent}>
            <Image source={require('../assets/health.png')} style={styles.image} />
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>Konsultasi Kesehatan</Text>
              <Text style={styles.cardSubtitle}>Jam Operasional: 07.00 - 23.59</Text>
            </View>
          </View>
        </Link>
        <Link href="/ConsultationScreen" style={styles.card}>
          <View style={styles.cardContent}>
            <Image source={require('../assets/pregnancy.png')} style={styles.image} />
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>Konsultasi Kehamilan</Text>
              <Text style={styles.cardSubtitle}>Jam Operasional: 07.00 - 23.59</Text>
            </View>
          </View>
        </Link>
      </View>
      <Text style={styles.title}>Riwayat Konsultasi</Text>
      <Link href="/HistoryScreen" style={styles.card}>
        <View style={styles.cardContent}>
          <Image source={require('../assets/history.png')} style={styles.image} />
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>Riwayat Konsultasi Kesehatan & Kehamilan</Text>
          </View>
        </View>
      </Link>
      <TouchableOpacity style={styles.helpButton}>
        <Text style={styles.helpButtonText}>Butuh Bantuan?</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#3D3D3D',
  },
  cardContainer: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#E3F2FD',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3D3D3D',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#7D7D7D',
  },
  helpButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginVertical: 20,
  },
  helpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
