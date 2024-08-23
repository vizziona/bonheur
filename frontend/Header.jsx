import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { starSvg, gridSvg } from './Svgs.jsx';
import SearchIcon from './SearchIcon.jsx';

const { width } = Dimensions.get('window');

export default function Header({ setShowSearchPopup, setShowGridPopup }) {
  const [starCount, setStarCount] = React.useState(600);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const scrollAnimation = Animated.loop(
      Animated.timing(scrollX, {
        toValue: -width,
        duration: 20000,
        useNativeDriver: true,
      })
    );
    scrollAnimation.start();
    return () => scrollAnimation.stop();
  }, []);

  const handleStarClick = () => {
    setStarCount(prevCount => prevCount + 1);
  };

  return (
    <View style={styles.header}>
      <View style={styles.earnings}>
        <Animated.Text 
          style={[
            styles.earningsText, 
            { transform: [{ translateX: scrollX }] }
          ]}
        >
          Paypal - Transfer Money Easily safe globally with best payment methods!
        </Animated.Text>
      </View>
      <View style={styles.headerIcons}>
        <TouchableOpacity style={styles.headerIcon} onPress={handleStarClick}>
          <SvgXml xml={starSvg} width={24} height={24} />
          <Text style={styles.starCount}>{starCount}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerIcon} onPress={() => setShowGridPopup(true)}>
          <SvgXml xml={gridSvg} width={24} height={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerIcon} onPress={() => setShowSearchPopup(true)}>
          <SearchIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  earnings: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 11,
    paddingVertical: 8,
    paddingHorizontal: 15,
    width: width * 0.5,
    overflow: 'hidden',
  },
  earningsText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    width: width * 2,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  headerIcon: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 24,
    marginLeft: 8,
  },
  starCount: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#09b557',
    color: 'white',
    borderRadius: 8,
    padding: 2,
    fontSize: 12,
    fontWeight: 'bold',
    minWidth: 20,
    height: 20,
    textAlign: 'center',
  },
});