import React from 'react';
import { Modal, View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function GridPopup({ showGridPopup, setShowGridPopup }) {
  const categories = [
    'All', 'Romance', 'Sports', 'Dance', 'Music', 'Art', 'Fashion',
    'Food', 'Travel', 'Technology', 'Science', 'Education', 'Fitness',
    'Gaming', 'Beauty', 'Lifestyle', 'Nature', 'Pets', 'Comedy'
  ];

  return (
    <Modal
      visible={showGridPopup}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowGridPopup(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.gridPopup}>
          <TouchableOpacity style={styles.closeGrid} onPress={() => setShowGridPopup(false)}>
            <Icon name="times" size={30} color="white" />
          </TouchableOpacity>
          <ScrollView contentContainerStyle={styles.gridContent}>
            {categories.map((category, index) => (
              <TouchableOpacity key={index} style={styles.gridItem}>
                <Text style={styles.gridItemText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridPopup: {
    backgroundColor: 'rgba(0, 0, 0, 0.934)',
    borderRadius: 20,
    width: '90%',
    height: '80%',
    maxHeight: 600,
  },
  closeGrid: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  gridContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 20,
    paddingTop: 50,
  },
  gridItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 20,
    width: '45%',
    marginBottom: 20,
  },
  gridItemText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});