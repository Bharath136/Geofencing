import React, { useEffect } from 'react';
import { View, Text, Image, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tailwind from 'twrnc';
import logo from '../assets/images/Revisit-Logo.png';
import { getUserData } from '../utils/cookieUtils'; // Import your getUserData function

const SplashScreen = () => {
    const navigation = useNavigation();

    // Animation state
    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Fade-in effect
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();

        const checkLoginStatus = async () => {
            try {
                const userData = await getUserData();

                // Navigate based on the user's role
                if (userData?.role === 'owner') {
                    navigation.replace('Owner');
                    // navigation.replace('Watchmen');
                } else if (userData?.role === 'watchmen') {
                    navigation.replace('Watchmen');
                } else {
                    navigation.replace('Auth');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                navigation.replace('Auth');
            }
        };

        // Wait for animation and then check login status
        const timer = setTimeout(checkLoginStatus, 2000);

        // Cleanup timeout on component unmount
        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={tailwind`flex-1 justify-center items-center bg-blue-950`}>
            <Animated.View style={{ opacity: fadeAnim }}>
                <Image
                    source={logo}
                    style={tailwind`w-32 h-32 mb-4`}
                />
                <Text style={tailwind`text-3xl font-bold text-white`}>Revisit</Text>
            </Animated.View>
        </View>
    );
};

export default SplashScreen;
