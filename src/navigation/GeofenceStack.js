// CategoryStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CustomHeader from '../components/Header';
import GeofenceSetupScreen from '../screens/GeofenceSetupScreen';

const Stack = createStackNavigator();

const GeofenceStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="Geofence" component={GeofenceSetupScreen}
            options={{
                header: () => <CustomHeader title="Geofence" />,
            }}
        />
        
    </Stack.Navigator>
);

export default GeofenceStack;
