import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileScreen from '../screens/ProfileScreen';
import CustomHeader from '../components/Header';
import WatchmanDashboard from '../screens/WatchmanDashboard';
import TrackEntries from '../screens/TrackEntries';
import ViewLogs from '../screens/ViewLogs';

const Tab = createBottomTabNavigator();

const WatchmenNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="WatchmanDashboard"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    switch (route.name) {
                        case 'WatchmanDashboard':
                            iconName = focused ? 'home' : 'home-outline';
                            break;
                        case 'TrackEntries':
                            iconName = focused ? 'clipboard' : 'clipboard-outline';
                            break;
                        case 'ViewLogs':
                            iconName = focused ? 'list' : 'list-outline';
                            break;
                        case 'Profile':
                            iconName = focused ? 'person-circle' : 'person-circle-outline';
                            break;
                        default:
                            iconName = 'help-circle-outline';
                            break;
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#0D47A1',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen
                name="WatchmanDashboard"
                component={WatchmanDashboard}
                options={{
                    header: () => <CustomHeader title="Dashboard" isBack={false} />,
                }}
            />
            <Tab.Screen
                name="TrackEntries"
                component={TrackEntries}
                options={{
                    header: () => <CustomHeader title="Track Entries" isBack={true} />,
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

export default WatchmenNavigator;
