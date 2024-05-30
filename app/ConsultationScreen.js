import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'expo-router';

const schema = yup.object().shape({
  name: yup.string().required('Nama is required'),
  phone: yup.string().required('Nomor Telepon is required'),
  pregnancyAge: yup.string().required('Usia Kehamilan is required'),
  complaint: yup.string().required('Keluhan is required'),
  consultationTime: yup.string().required('Waktu Konsultasi is required'),
});

const ConsultationScreen = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Formulir Pendaftaran Konsultasi</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nama*</Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.name && styles.errorInput]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Masukkan Nama"
            />
          )}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nomor Telepon*</Text>
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.phone && styles.errorInput]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Masukkan Nomor Telepon"
              keyboardType="phone-pad"
            />
          )}
        />
        {errors.phone && <Text style={styles.errorText}>{errors.phone.message}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Usia Kehamilan*</Text>
        <Controller
          control={control}
          name="pregnancyAge"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.pregnancyAge && styles.errorInput]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Masukkan Usia Kehamilan"
            />
          )}
        />
        {errors.pregnancyAge && <Text style={styles.errorText}>{errors.pregnancyAge.message}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Keluhan*</Text>
        <Controller
          control={control}
          name="complaint"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.complaint && styles.errorInput]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Masukkan Keluhan"
            />
          )}
        />
        {errors.complaint && <Text style={styles.errorText}>{errors.complaint.message}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Waktu Konsultasi*</Text>
        <Controller
          control={control}
          name="consultationTime"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.consultationTime && styles.errorInput]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Masukkan Waktu Konsultasi"
            />
          )}
        />
        {errors.consultationTime && <Text style={styles.errorText}>{errors.consultationTime.message}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Catatan Tambahan</Text>
        <TouchableOpacity style={styles.uploadButton}>
          <Text style={styles.uploadText}>Unggah Foto/Video (Bila Diperlukan)</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <Link href="/HomeConsultationScreen" style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Batalkan</Text>
        </Link>
        <Link href="/HomeConsultationScreen" style={styles.submitButton}>
          <Text style={styles.cancelButtonText}>Kirim</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}

/*
Untuk Submit Nanti
<TouchableOpacity style={styles.submitButton} onPress={handleSubmit()}>
          <Text style={styles.submitButtonText}>Kirim</Text>
        </TouchableOpacity>
*/


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#3D3D3D',
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3D3D3D',
  },
  input: {
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    backgroundColor: '#F2F2F2',
  },
  errorInput: {
    borderColor: '#FF5A5F',
  },
  errorText: {
    color: '#FF5A5F',
    fontSize: 12,
    marginTop: 5,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    backgroundColor: '#F2F2F2',
    borderStyle: 'dashed',
  },
  uploadIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  uploadText: {
    color: '#7D7D7D',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#FFCDD2',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: '#3D3D3D',
  },
  submitButton: {
    backgroundColor: '#90CAF9',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  submitButtonText: {
    color: '#3D3D3D',
  },
});

export default ConsultationScreen;