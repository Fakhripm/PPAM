import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, ScrollView, Alert, Modal, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const weeks = Array.from({ length: 42 }, (_, i) => `Minggu ${i + 1}`);

const initialActivities = [
  ["Yoga", "Kontrol Mingguan", "Konsumsi Jus Buah"],
  ["Meditasi", "Olahraga Ringan", "Makan Buah"],
  ["Pemeriksaan Rutin", "Pijat Kehamilan", "Berenang"],
  ["Yoga", "Kontrol Mingguan", "Konsumsi Jus Buah"],
  ["Meditasi", "Olahraga Ringan", "Makan Buah"],
  ["Pemeriksaan Rutin", "Pijat Kehamilan", "Berenang"],
  ["Yoga", "Kontrol Mingguan", "Konsumsi Jus Buah"]
];

const getWeekDescriptionAndImage = (week) => {
  if (week >= 0 && week <= 2) {
    return { image: require('../assets/watermelon.png'), description: "Janinmu sudah sebesar biji semangka!" };
  } else if (week >= 3 && week <= 5) {
    return { image: require('../assets/kelengkeng.jpg'), description: "Janinmu sudah sebesar biji kelengkeng!" };
  } else {
    return { image: require('../assets/alpukat.jpg'), description: "Janinmu sudah sebesar biji alpukat!" };
  }
};

const initialWeeklyActivities = Object.fromEntries(
  weeks.map((week, weekIndex) => [
    weekIndex,
    Object.fromEntries(
      Array.from({ length: 7 }, (_, dayIndex) => [
        dayIndex,
        [...initialActivities[dayIndex]],
      ])
    ),
  ])
);

const TrackerScreen = () => {
  const navigation = useNavigation();
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [expandedDay, setExpandedDay] = useState(null);
  const [completedActivities, setCompletedActivities] = useState({});
  const [editing, setEditing] = useState(false);
  const [weeklyActivities, setWeeklyActivities] = useState(
    initialWeeklyActivities
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newActivityDay, setNewActivityDay] = useState('');
  const [newActivityName, setNewActivityName] = useState('');

  const toggleDay = (dayIndex) => {
    setExpandedDay(expandedDay === dayIndex ? null : dayIndex);
  };

  const toggleActivity = (weekIndex, dayIndex, activityIndex) => {
    setCompletedActivities((prev) => {
      const weekActivities = prev[weekIndex] || {};
      const dayActivities = weekActivities[dayIndex] || [];

      if (dayActivities.includes(activityIndex)) {
        return {
          ...prev,
          [weekIndex]: {
            ...weekActivities,
            [dayIndex]: dayActivities.filter((index) => index !== activityIndex),
          },
        };
      } else {
        return {
          ...prev,
          [weekIndex]: {
            ...weekActivities,
            [dayIndex]: [...dayActivities, activityIndex],
          },
        };
      }
    });
  };

  const deleteActivity = (weekIndex, dayIndex, activityIndex) => {
    Alert.alert(
      "Hapus Aktivitas",
      "Apakah Anda yakin ingin menghapus aktivitas ini?",
      [
        {
          text: "Tidak",
          style: "cancel"
        },
        {
          text: "Ya",
          onPress: () => {
            setWeeklyActivities((prev) => {
              const updatedWeekActivities = { ...prev };
              updatedWeekActivities[weekIndex] = {
                ...updatedWeekActivities[weekIndex],
                [dayIndex]: [
                  ...updatedWeekActivities[weekIndex][dayIndex].filter(
                    (_, index) => index !== activityIndex
                  ),
                ],
              };
              return updatedWeekActivities;
            });
            setEditing(false);
          }
        }
      ]
    );
  };

  const addActivity = () => {
    const dayIndex = parseInt(newActivityDay, 10) - 1;
    if (dayIndex >= 0 && dayIndex < 7 && newActivityName.trim()) {
      setWeeklyActivities((prev) => {
        const updatedWeekActivities = { ...prev };
        updatedWeekActivities[selectedWeek] = {
          ...updatedWeekActivities[selectedWeek],
          [dayIndex]: [
            ...updatedWeekActivities[selectedWeek][dayIndex],
            newActivityName.trim(),
          ],
        };
        return updatedWeekActivities;
      });
      setIsModalVisible(false);
      setNewActivityDay('');
      setNewActivityName('');
    } else {
      Alert.alert("Input Tidak Valid", "Pastikan hari antara 1 dan 7 dan nama aktivitas tidak kosong.");
    }
  };

  const { image, description } = getWeekDescriptionAndImage(selectedWeek);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
  <TouchableOpacity style={[styles.headerButton, { position: 'absolute', left: 10 }]} onPress={() => navigation.goBack()}>
    <MaterialIcons name="arrow-back" size={32} color="white" />
  </TouchableOpacity>
  <Text style={[styles.headerTitle, { marginLeft: 32 }]}>Tracker Kehamilan</Text>
  <TouchableOpacity style={[styles.headerButton, { position: 'absolute', right: 10 }]} onPress={() => setIsModalVisible(true)}>
    <MaterialIcons name="add" size={32} color="white" />
  </TouchableOpacity>
</View>

      <View style={styles.weekSelector}>
        <TouchableOpacity onPress={() => setSelectedWeek(selectedWeek > 0 ? selectedWeek - 1 : 0)}>
          <MaterialIcons name="chevron-left" size={32} color="black" />
        </TouchableOpacity>
        <Text style={styles.weekText}>{weeks[selectedWeek]}</Text>
        <TouchableOpacity onPress={() => setSelectedWeek(selectedWeek < weeks.length - 1 ? selectedWeek + 1 : weeks.length - 1)}>
          <MaterialIcons name="chevron-right" size={32} color="black" />
        </TouchableOpacity>
      </View>

      <Image source={image} style={styles.image} />

      <Text style={styles.description}>{description}</Text>

      <View style={styles.activitiesContainer}>
        {Array.from({ length: 7 }, (_, dayIndex) => (
          <View key={dayIndex}>
            <TouchableOpacity style={styles.dayButton} onPress={() => toggleDay(dayIndex)}>
              <Text style={styles.dayText}>Hari ke-{dayIndex + 1}</Text>
              <MaterialIcons name={expandedDay === dayIndex ? "expand-less" : "expand-more"} size={24} color="black" />
            </TouchableOpacity>
            {expandedDay === dayIndex && (
              <View style={styles.activityList}>
                {weeklyActivities[selectedWeek][dayIndex].map((activity, activityIndex) => (
                  <View key={activityIndex} style={styles.activityItem}>
                    <Text style={styles.activityText}>{activity}</Text>
                    <View style={styles.activityActions}>
                    <TouchableOpacity onPress={() => toggleActivity(selectedWeek, dayIndex, activityIndex)}>
                        <MaterialIcons name={completedActivities[selectedWeek]?.[dayIndex]?.includes(activityIndex) ? "check-circle" : "radio-button-unchecked"} size={24} color="green" />
                      </TouchableOpacity>
                      {editing && (
                        <TouchableOpacity onPress={() => deleteActivity(selectedWeek, dayIndex, activityIndex)}>
                          <MaterialIcons name="delete" size={24} color="red" />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.editButton} onPress={() => setEditing(!editing)}>
        <Text style={styles.editButtonText}>{editing ? "Selesai" : "Edit"}</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Tambahkan Aktivitas Baru</Text>
            <TextInput
              style={styles.input}
              placeholder="Hari (1-7)"
              keyboardType="numeric"
              value={newActivityDay}
              onChangeText={setNewActivityDay}
            />
            <TextInput
              style={styles.input}
              placeholder="Nama Aktivitas"
              value={newActivityName}
              onChangeText={setNewActivityName}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={addActivity}>
                <Text style={styles.modalButtonText}>Tambahkan</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setIsModalVisible(false)}>
                <Text style={[styles.modalButtonText, styles.cancelButtonText]}>Batal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8b',
    padding: 16,
    position: 'relative',
  },
  headerButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  weekSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
  },
  weekText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginVertical: 16,
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 16,
  },
  activitiesContainer: {
    paddingHorizontal: 16,
  },
  dayButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffccda',
    marginVertical: 4,
    borderRadius: 8,
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  activityList: {
    backgroundColor: '#ffebf0',
    borderRadius: 8,
    marginVertical: 4,
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ffccda',
  },
  activityText: {
    fontSize: 16,
  },
  activityActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#f8b',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    margin: 16,
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#8f8',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    margin: 16,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#8f8',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#f88',
  },
  cancelButtonText: {
    color: 'white',
  },
});

export default TrackerScreen;
