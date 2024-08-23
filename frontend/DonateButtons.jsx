import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function DonateButtons() {
  const categories = ['All', 'Romance', 'Sports', 'Dance'];

  return (
    <ScrollView horizontal style={styles.donateButtons}>
      {categories.map((category, index) => (
        <TouchableOpacity key={index} style={styles.donateBtn}>
          <Text style={styles.donateBtnText}>{category}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  donateButtons: {
    position: 'absolute',
    bottom: 55,
    left: 20,
  },
  donateBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  donateBtnText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});