import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function BackButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.backButton} onPress={onPress}>
      <Icon name="chevron-left" size={30} color="white" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
});
