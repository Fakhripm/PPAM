import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function Home({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Mulai Konsultasi</Text>
      </View>
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
      <Link href="/HistoryScreen" style={[styles.card, styles.historyCard]}>
        <View style={styles.cardContent}>
          <Image source={require('../assets/history.png')} style={styles.image} />
          <View style={styles.cardText}>
          <Text style={[styles.cardTitle, styles.wrapText]} numberOfLines={2}>
            Riwayat Konsultasi Kesehatan & Kehamilan
        </Text>
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
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3D3D3D',
  },
  cardContainer: {
    marginBottom: 25,
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
  historyCard: {
    maxWidth: '100%',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
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
    fontSize: 12,
    fontWeight: 'bold',
    color: '#3D3D3D',
    flexWrap : "wrap" 
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#7D7D7D',
  },
  wrapText: {
    flexShrink  : 1,
    flexWrap: 'wrap',
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
