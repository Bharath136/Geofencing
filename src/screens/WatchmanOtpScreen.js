import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Keyboard, ActivityIndicator } from 'react-native';
import tailwind from 'twrnc';
import { setToken, setUserData } from '../utils/cookieUtils';
import { verifyLoginOtp } from '../services/watchmanService';

const WatchmanOtpScreen = ({ route, navigation }) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const inputRefs = useRef([]);
    const { email } = route.params;

    const handleOtpChange = (text, index) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        // Move to the next input field
        if (text && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // Automatically dismiss the keyboard if all fields are filled
        if (index === 5 && text) {
            Keyboard.dismiss();
        }
    };

    const handleOTP = async () => {
        const otpString = otp.join('');

        if (otpString.length !== 6) {
            Alert.alert('Error', 'Please enter the full 6-digit OTP');
            return;
        }

        Keyboard.dismiss();
        setLoading(true);

        try {
            const response = await verifyLoginOtp(email, otpString);
            await setUserData(response.data.user);
            await setToken(response.data.token);
            if (response.data.user.role === 'owner') {
                navigation.navigate('Owner');
            } else {
                navigation.navigate('Watchmen');
            }
        } catch (error) {
            Alert.alert('Error', error.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={tailwind`flex-1 justify-center items-center bg-gray-100 p-6`}>
            <Text style={tailwind`text-2xl font-bold mb-6 text-blue-900`}>OTP Verification</Text>

            <View style={tailwind`flex-row justify-between w-full max-w-xs mb-6`}>
                {otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        style={tailwind`w-12 h-12 text-center border-2 border-gray-300 rounded-lg text-lg`}
                        value={digit}
                        onChangeText={(text) => handleOtpChange(text, index)}
                        keyboardType="numeric"
                        maxLength={1}
                        ref={(input) => (inputRefs.current[index] = input)} // Assign ref to each input
                        autoFocus={index === 0} // Auto-focus on the first field
                    />
                ))}
            </View>

            <TouchableOpacity
                style={tailwind`bg-blue-900 w-full p-4 rounded-lg ${loading ? 'opacity-50' : ''}`}
                onPress={handleOTP}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                    <Text style={tailwind`text-center text-white font-semibold`}>Verify OTP</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

export default WatchmanOtpScreen;
