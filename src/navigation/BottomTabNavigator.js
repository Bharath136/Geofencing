import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GeofenceScreen from '../screens/GeofenceSetupScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CustomHeader from '../components/Header';
import PropertyStack from './PropertyStack';
import WatchmanStack from './WatchmanStack';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="Geofence"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    switch (route.name) {
                        case 'Geofence':
                            iconName = focused ? 'navigate-circle' : 'navigate-circle-outline';
                            break;
                        case 'Properties':
                            iconName = focused ? 'map' : 'map-outline';
                            break;
                        case 'Watchman':
                            iconName = focused ? 'body' : 'body-outline';
                            break;
                        case 'Profile':
                            iconName = focused ? 'person-circle' : 'person-circle-outline';
                            break;
                        default:
                            iconName = 'help-circle-outline'; // Default icon for undefined routes
                            break;
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#0D47A1',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen
                name="Geofence"
                component={GeofenceScreen}
                options={{
                    header: () => <CustomHeader title="Geofence" isBack={false} />,
                }}
            />
            <Tab.Screen
                name="Properties"
                component={PropertyStack}
                options={{
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Watchman"
                component={WatchmanStack}
                options={{
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    header: () => <CustomHeader title="Profile" />,
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
