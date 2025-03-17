// ProfileStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import CustomHeader from '../components/Header';

const Stack = createStackNavigator();

const ProfileStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="Profile" component={ProfileScreen} 
            options={{
                header: () => <CustomHeader title="Profile" />, // Custom header for Home screen
            }}
            // options={{ headerShown: false }}
        />
    </Stack.Navigator>
);

export default ProfileStack;