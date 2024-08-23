import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SvgXml } from 'react-native-svg';
import axios from 'axios';
import { messageSvg, shareSvg } from './Svgs.jsx';

export default function SideActions({ videoId, userId }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [shareCount, setShareCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    // Fetch video data from backend
    axios.get(`/api/videos/${videoId}`)
      .then(response => {
        const { likes, shares, comments } = response.data;
        setLikeCount(likes.length);
        setShareCount(shares);
        setCommentCount(comments.length);
        setIsLiked(likes.includes(userId));
      })
      .catch(error => {
        console.error('Error fetching video data:', error);
      });
  }, [videoId, userId]);

  const handleLike = async () => {
    try {
      if (isLiked) {
        await axios.post(`/api/videos/${videoId}/unlike`, { userId });
        setLikeCount(prevCount => prevCount - 1);
      } else {
        await axios.post(`/api/videos/${videoId}/like`, { userId });
        setLikeCount(prevCount => prevCount + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error liking/unliking video:', error);
    }
  };

  return (
    <View style={styles.sideActions}>
      <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
        <LinearGradient 
          colors={isLiked ? ['#ff4d4d', '#ff8080'] : ['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.3)']} 
          style={styles.actionIcon}
        >
          <Icon name="heart" size={28} color="white" />
        </LinearGradient>
        <Text style={styles.actionCount}>{likeCount}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton}>
        <LinearGradient 
          colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.3)']} 
          style={styles.actionIcon}
        >
          <SvgXml xml={messageSvg} width={28} height={28} fill="white" />
        </LinearGradient>
        <Text style={styles.actionCount}>{commentCount}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton}>
        <LinearGradient 
          colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.3)']} 
          style={styles.actionIcon}
        >
          <SvgXml xml={shareSvg} width={28} height={28} fill="white" />
        </LinearGradient>
        <Text style={styles.actionCount}>{shareCount}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sideActions: {
    position: 'absolute',
    right: 20,
    bottom: 120,
    alignItems: 'center',
  },
  actionButton: {
    alignItems: 'center',
    marginBottom: 15,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionCount: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
    fontWeight: '600',
  },
});
