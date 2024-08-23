import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './Header.jsx';
import VideoPlayer from './VideoPlayer.jsx';
import UserInfo from './UserInfo.jsx';
import SideActions from './SideActions.jsx';
import DonateButtons from './DonateButtons.jsx';
import BackButton from './BackButton.jsx';
import SearchPopup from './SearchPopup.jsx';
import GridPopup from './GridPopup.jsx';
import axios from 'axios';

export default function Trends() {
  const [showSearchPopup, setShowSearchPopup] = React.useState(false);
  const [showGridPopup, setShowGridPopup] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [videos, setVideos] = React.useState([]);
  const [userInfo, setUserInfo] = React.useState({});
  const [actionsData, setActionsData] = React.useState({});

  useEffect(() => {
    // Fetch video data
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:80/api/videos');
        setVideos(response.data.videos);
        setUserInfo(response.data.userInfo);
        setActionsData(response.data.actionsData);
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Header 
        setShowSearchPopup={setShowSearchPopup} 
        setShowGridPopup={setShowGridPopup} 
      />
      <VideoPlayer videos={videos} />
      <UserInfo 
        username={userInfo.username}
        description={userInfo.description}
        followerCount={userInfo.followerCount}
        avatar={userInfo.avatar} // Pass avatar URL
        onFollow={userInfo.onFollow}
        isFollowing={userInfo.isFollowing}
      />
      <SideActions 
        likeCount={actionsData.likeCount}
        commentCount={actionsData.commentCount}
        shareCount={actionsData.shareCount}
        onLike={actionsData.onLike}
      />
      <DonateButtons />
      <BackButton />
      <SearchPopup 
        showSearchPopup={showSearchPopup} 
        setShowSearchPopup={setShowSearchPopup} 
      />
      <GridPopup 
        showGridPopup={showGridPopup} 
        setShowGridPopup={setShowGridPopup} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
