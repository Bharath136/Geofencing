import React, { useEffect, useState } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import NetInfo from '@react-native-community/netinfo';
import { WatchmanProvider } from './src/contexts/WatchmanContext';


export default function App() {
  const [isSlowConnection, setIsSlowConnection] = useState(false);

  // Monitor network connection
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected && state.details) {
        const { downlink } = state.details;

        if (downlink && downlink < 1) {
          setIsSlowConnection(true);
        } else {
          setIsSlowConnection(false);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      {isSlowConnection && (
        <View style={tw`absolute top-0 left-0 right-0 bg-yellow-500 p-3`}>
          <Text style={tw`text-center text-black font-bold`}>Network is slow. Please be patient.</Text>
        </View>
      )}
      <WatchmanProvider>
        <AppNavigator />
      </WatchmanProvider>
    </>
  );
}
