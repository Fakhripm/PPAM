import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../lib/supabase';  

const AddAddressScreen = () => {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    namaPenerima: '',
    nomorTelepon: '',
    namaJalan: '',
    provinsi: '',
    kabupatenKota: '',
    kecamatan: '',
    kelurahan: '',
    kodePos: '',
    catatanTambahan: '',
  });

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      
      const userId = userData.user.id;

      const { error } = await supabase.from('alamat').insert([
        {
          user_id: userId,
          nama_penerima: form.namaPenerima,
          nomor_telepon: form.nomorTelepon,
          nama_jalan: form.namaJalan,
          provinsi: form.provinsi,
          kabupaten_kota: form.kabupatenKota,
          kecamatan: form.kecamatan,
          kelurahan: form.kelurahan,
          kode_pos: form.kodePos,
          catatan_tambahan: form.catatanTambahan,
        },
      ]);

      if (error) throw error;

      navigation.goBack();
    } catch (error) {
      console.error('Error inserting address:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Alamat</Text>
      </View>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <Text style={styles.title}>Tambah Alamat Pengiriman</Text>
        <View style={styles.inputContainer}>
          {[
            { label: 'Nama Penerima', field: 'namaPenerima' },
            { label: 'Nomor Telepon', field: 'nomorTelepon' },
            { label: 'Nama Jalan', field: 'namaJalan' },
            { label: 'Provinsi', field: 'provinsi' },
            { label: 'Kabupaten/Kota', field: 'kabupatenKota' },
            { label: 'Kecamatan', field: 'kecamatan' },
            { label: 'Kelurahan', field: 'kelurahan' },
            { label: 'Kode Pos', field: 'kodePos' },
            { label: 'Catatan Tambahan', field: 'catatanTambahan' },
          ].map((input) => (
            <View key={input.field} style={styles.inputGroup}>
              <Text style={styles.label}>{input.label}</Text>
              <TextInput
                style={styles.input}
                placeholder={input.label}
                value={form[input.field]}
                onChangeText={(value) => handleInputChange(input.field, value)}
              />
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
          <Text style={styles.saveButtonText}>Simpan</Text>
        </TouchableOpacity>
      </ScrollView>
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
  formContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    backgroundColor: '#B0CFFF',
    borderRadius: 10,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#B0CFFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddAddressScreen;
