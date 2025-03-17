// CategoryStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CustomHeader from '../components/Header';
import SettingsScreen from '../screens/SettingsScreen';
import MyWatchmanScreen from '../screens/MyWatchmanScreen';
import AddWatchman from '../screens/AddWatchmanScreen';
import TrackWatchmanScreen from '../screens/TrackWatchmanScreen';

const Stack = createStackNavigator();

const WatchmanStack = () => (
    <Stack.Navigator initialRouteName="My Watchman">
        <Stack.Screen name="My Watchman" component={MyWatchmanScreen}
            // options={{ headerShown: false }}
            options={{
                header: () => <CustomHeader title="My Watchman" />,
            }}
        />
        <Stack.Screen name="Add Watchman" component={AddWatchman}
            options={{
                header: () => <CustomHeader title="Add Watchman" />,
            }}
        />
        <Stack.Screen name="Track" component={TrackWatchmanScreen}
            options={{
                header: () => <CustomHeader title="Track" />,
            }}
        />
    </Stack.Navigator>
);

export default WatchmanStack;
