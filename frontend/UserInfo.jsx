import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

export default function UserInfo({ userId }) {
  const [user, setUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://video-service/user/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [userId]);

  if (!user) return null;

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <View style={styles.userInfo}>
      <View style={styles.username}>
        <Image
          source={{ uri: user.avatar }}
          style={styles.avatar}
        />
        <Text style={styles.usernameText}>{user.username}</Text>
      </View>
      <Text style={styles.description}>{user.description}</Text>
      <Text style={styles.followers}>{user.followers.length} followers</Text>
      <TouchableOpacity 
        style={[styles.followBtn, isFollowing && styles.followingBtn]} 
        onPress={handleFollow}
      >
        <Text style={[styles.followBtnText, isFollowing && styles.followingBtnText]}>
          {isFollowing ? 'Following' : 'Follow'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  userInfo: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
  },
  username: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  usernameText: {
    fontSize: 18,
    color: 'white',
  },
  description: {
    color: 'white',
    fontSize: 14,
  },
  followers: {
    color: 'white',
    fontSize: 14,
    marginVertical: 5,
  },
  followBtn: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 5,
  },
  followingBtn: {
    backgroundColor: '#4CAF50',
  },
  followBtnText: {
    color: 'white',
    textAlign: 'center',
  },
  followingBtnText: {
    color: '#FFF',
  },
});
