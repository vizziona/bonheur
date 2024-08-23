import React, { useState, useEffect } from 'react';
import { Modal, View, TextInput, TouchableOpacity, StyleSheet, FlatList, Text, Image } from 'react-native';
import axios from 'axios';

export default function SearchPopup({ showSearchPopup, setShowSearchPopup }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState({ users: [], videos: [] });
  const [loading, setLoading] = useState(false);

  // Function to handle search input change
  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.length > 2) { 
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3005/api/search/query`, {
          params: { query }
        });
        setResults(response.data);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setResults({ users: [], videos: [] });
    }
  };

  // Function to render video items
  const renderVideoItem = ({ item }) => (
    <View style={styles.resultItem}>
      <Text style={styles.resultTitle}>{item._source.description}</Text>
      {/* Display a thumbnail or other video info if available */}
    </View>
  );

  // Function to render user items
  const renderUserItem = ({ item }) => (
    <View style={styles.resultItem}>
      <Image source={{ uri: item._source.avatar }} style={styles.avatar} />
      <Text style={styles.resultTitle}>{item._source.username}</Text>
      <Text style={styles.resultDescription}>{item._source.description}</Text>
    </View>
  );

  return (
    <Modal
      visible={showSearchPopup}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowSearchPopup(false)}
    >
      <TouchableOpacity 
        style={styles.modalOverlay} 
        activeOpacity={1} 
        onPress={() => setShowSearchPopup(false)}
      >
        <View style={styles.searchPopup}>
          <TextInput 
            placeholder="Search..." 
            placeholderTextColor="rgba(255,255,255,0.7)"
            style={styles.searchInput} 
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {loading ? (
            <Text style={styles.loadingText}>Loading...</Text>
          ) : (
            <FlatList
              data={results.videos}
              renderItem={renderVideoItem}
              keyExtractor={(item) => item._id}
              ListHeaderComponent={<Text style={styles.header}>Videos</Text>}
              ListFooterComponent={<Text style={styles.header}>Users</Text>}
            />
          )}
          <FlatList
            data={results.users}
            renderItem={renderUserItem}
            keyExtractor={(item) => item._id}
          />
        </View>
      </TouchableOpacity>
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
  searchPopup: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 20,
    width: '80%',
  },
  searchInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 15,
    padding: 10,
    color: 'white',
  },
  resultItem: {
    marginBottom: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  resultTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  resultDescription: {
    color: 'white',
    fontSize: 14,
    opacity: 0.8,
  },
  header: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  loadingText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});
