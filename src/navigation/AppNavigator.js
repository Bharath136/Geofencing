// AppNavigator.js
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './BottomTabNavigator';
import AuthNavigator from './AuthNavigator';
import SplashScreen from '../screens/SplashScreen';
import { createStackNavigator } from '@react-navigation/stack';
import WatchmenNavigator from './WatchmenNavigator';
import { getUserData } from '../utils/cookieUtils';
import { useEffect, useState } from 'react';

const Stack = createStackNavigator();

const AppNavigator = () => {
    const [user, setUser] = useState(null)

    const getUser = async () => {
        const user = await getUserData()
        setUser(user)
    }

    useEffect(() => {
        getUser()
    },[])


    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}
                initialRouteName={user  ? (user.role === 'owner' ? 'Owner' : 'Watchmen') : 'Auth'}
            >
                {/* SplashScreen is only shown once, before checking login status */}
                <Stack.Screen name="SplashScreen" component={SplashScreen} />

                {/* AuthNavigator if not logged in */}
                <Stack.Screen name="Auth" component={AuthNavigator} />

                {/* BottomTabNavigator if logged in */}
                <Stack.Screen name="Owner" component={BottomTabNavigator} />

                {/* WatchmenNavigator if logged in */}
                <Stack.Screen name="Watchmen" component={WatchmenNavigator} />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
