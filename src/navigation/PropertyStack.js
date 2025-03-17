// CategoryStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CustomHeader from '../components/Header';
import MyProperties from '../screens/MyPropertiesScreen';
import PropertyDetailsScreen from '../screens/PropertyDetailsScreen';

const Stack = createStackNavigator();

const PropertyStack = () => (
    <Stack.Navigator initialRouteName="My Properties">
        <Stack.Screen name="My Properties" component={MyProperties}
            options={{
                header: () => <CustomHeader title="My Properties" />,
            }}
        />
        <Stack.Screen name="PropertyDetails" component={PropertyDetailsScreen}
            options={{
                header: () => <CustomHeader title="Property Details" />,
            }}
        />
    </Stack.Navigator>
);

export default PropertyStack;
