import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const EmergencyRegistrationScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [streetName, setStreetName] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [subdistrict, setSubdistrict] = useState('');
  const [complaint, setComplaint] = useState('');

  const handleSubmit = () => {
    if (
      !name ||
      !phoneNumber ||
      !streetName ||
      !province ||
      !city ||
      !district ||
      !subdistrict ||
      !complaint
    ) {
      Alert.alert('Form Tidak Lengkap', 'Harap lengkapi semua kolom yang diperlukan.');
    } else if (!/^\d+$/.test(phoneNumber)) {
      Alert.alert('Nomor Telepon Tidak Valid', 'Harap masukkan hanya angka untuk nomor telepon.');
    } else {
      navigation.navigate('TrackLocationScreen');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Layanan Darurat</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Layanan Darurat</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Nama
            <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            placeholder="Masukkan Nama"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Nomor Telepon
            <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.phoneInputContainer}>
            <Text style={styles.countryCode}>+62</Text>
            <TextInput
              placeholder="Masukkan Nomor Telepon"
              style={[styles.input, styles.phoneInput]}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </View>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Nama Jalan
            <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            placeholder="Masukkan Nama Jalan"
            style={styles.input}
            value={streetName}
            onChangeText={setStreetName}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Provinsi
            <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            placeholder="Masukkan Provinsi"
            style={styles.input}
            value={province}
            onChangeText={setProvince}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Kabupaten/Kota
            <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            placeholder="Masukkan Kabupaten/Kota"
            style={styles.input}
            value={city}
            onChangeText={setCity}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Kecamatan
            <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            placeholder="Masukkan Kecamatan"
            style={styles.input}
            value={district}
            onChangeText={setDistrict}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Kelurahan
            <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            placeholder="Masukkan Kelurahan"
            style={styles.input}
            value={subdistrict}
            onChangeText={setSubdistrict}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Keluhan/Kebutuhan
            <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            placeholder="Masukkan Keluhan/Kebutuhan"
            style={styles.input}
            value={complaint}
            onChangeText={setComplaint}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButtonText}>Batalkan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Kirim</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  backButton: {
    marginLeft: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    marginRight: 30,
  },
  formContainer: {
    backgroundColor: '#B0CFFF',
    borderRadius: 10,
    padding: 20,
    margin: 20,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 5,
  },
  label: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000',
  },
  required: {
    color: '#FF3528',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryCode: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  phoneInput: {
    flex: 1,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  cancelButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#FDB6DB',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    paddingVertical: 10,
  },
  cancelButtonText: {
    color: '#FDB6DB',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#B0CFFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EmergencyRegistrationScreen;
