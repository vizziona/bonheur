import React, { useState, useEffect } from 'react';
import { View, FlatList, Dimensions, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { Video } from 'expo-av';
import axios from 'axios';

const SCREEN_HEIGHT = Dimensions.get('screen').height;

const VideoPlayer = ({ videoId, isActive }) => {
  const [video, setVideo] = useState(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(isActive);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(`http://video-service/video/${videoId}`);
        setVideo(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchVideo();
  }, [videoId]);

  useEffect(() => {
    if (isActive) {
      setIsPlaying(true);
      videoRef.current?.playAsync();
    } else {
      setIsPlaying(false);
      videoRef.current?.pauseAsync();
    }
  }, [isActive]);

  const handleVideoPress = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        await videoRef.current.pauseAsync();
      } else {
        await videoRef.current.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (!video) return null;

  return (
    <TouchableOpacity 
      style={styles.videoContainer} 
      onPress={handleVideoPress}
      activeOpacity={1}
    >
      <Video
        ref={videoRef}
        source={{ uri: video.mediaUrl }}
        style={styles.video}
        resizeMode="cover"
        isLooping
        shouldPlay={isPlaying}
        isMuted={false}
      />
    </TouchableOpacity>
  );
};

export default function ScrollableVideoFeed() {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const flatListRef = useRef(null);

  // Fetch video IDs from video-service or other source
  const videoIds = ['1', '2', '3', '4', '5', '6'];

  const renderItem = ({ item, index }) => (
    <VideoPlayer videoId={item} isActive={index === activeVideoIndex} />
  );

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveVideoIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50
  }).current;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <FlatList
        ref={flatListRef}
        data={videoIds}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        pagingEnabled
        vertical
        showsVerticalScrollIndicator={false}
        snapToInterval={SCREEN_HEIGHT}
        snapToAlignment="start"
        decelerationRate="fast"
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  videoContainer: {
    width: '100%',
    height: SCREEN_HEIGHT,
  },
  video: {
    width: '100%',
    height: '100%',
  },
});
