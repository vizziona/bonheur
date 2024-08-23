import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, StyleSheet, ActivityIndicator, Text, Image, Platform } from 'react-native';
import { loadService } from './ServicesLoader/ServiceLoader';

const Tab = createMaterialTopTabNavigator();

function ServiceLoader({ serviceName }) {
  const [Component, setComponent] = React.useState(() => () => (
    <View style={styles.loadingContainer}>
      {Platform.OS === 'ios' ? (
        <>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.loadingText}>Loading...</Text>
        </>
      ) : (
        <Image
          source={require('../assets/images/spin.gif')}
          style={styles.loadingGif}
        />
      )}
    </View>
  ));

  React.useEffect(() => {
    let isMounted = true;

    loadService(serviceName)
      .then((loadedComponent) => {
        if (isMounted) setComponent(() => loadedComponent);
      })
      .catch(() => {
        // Handle error if needed
      });

    return () => { isMounted = false; };
  }, [serviceName]);

  return <Component />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#092020',
  },
  loadingText: {
    color: '#ffffff',
    marginTop: 10,
  },
  loadingGif: {
    width: 300, // Adjust the size as needed
    height: 300, // Adjust the size as needed
  },
});

export default function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="frontend"
      screenOptions={{ tabBarStyle: { display: 'none' } }}
    >
      <Tab.Screen
        name="frontend"
        children={() => <ServiceLoader serviceName="frontend" />}
      />
    </Tab.Navigator>
  );
}