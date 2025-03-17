// AuthNavigator.js
import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen'; // Your Login screen
import RegisterScreen from '../screens/RegisterScreen'; // Your Register screen
import OTPScreen from '../screens/OTPScreen';
import OTPLoginScreen from '../screens/OTPLoginScreen';
import RoleSelectionScreen from '../screens/RoleSelectionScreen';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import WatchmanLoginScreen from '../screens/WatchmanLoginScreen';
import WatchmanOtpScreen from '../screens/WatchmanOtpScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
    const [isFirstTime, setIsFirstTime] = useState(true);

    // Check if the user is new or not
    useEffect(() => {
        const checkFirstTimeUser = async () => {
            const roleSelected = await AsyncStorage.getItem('isFirstTimeUser');
            if (roleSelected === 'false') {
                setIsFirstTime(false); // The user has selected a role, no need to show the RoleSelectionScreen
            }
        };
        checkFirstTimeUser();
    }, []);

    return (
        <Stack.Navigator initialRouteName={isFirstTime ? "Role" : "Login"}>
            {/* Show RoleSelectionScreen if the user is new */}
            <Stack.Screen
                name="Role"
                component={RoleSelectionScreen}
                options={{ headerShown: false }}
            />
            {/* Other screens */}
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SecurityLogin"
                component={WatchmanLoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="OTP"
                component={OTPScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="OTPLogin"
                component={OTPLoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SecurityOTP"
                component={WatchmanOtpScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default AuthNavigator;
