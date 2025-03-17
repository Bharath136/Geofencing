import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    Keyboard,
} from 'react-native';
import tailwind from 'twrnc';
import { getUserData } from '../utils/cookieUtils';
import { createWatchman, verifyWatchmanOtp } from '../services/watchmanService';

const AddWatchman = ({ navigation }) => {
    const [watchmenName, setWatchmenName] = useState('');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [loading, setLoading] = useState(false); // State for loading indicator

    // Function to validate email
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };


    // Handle sending OTP
    const handleSendOtp = async () => {
        if (!isValidEmail(email)) {
            Alert.alert('Error', 'Please enter a valid email address');
            return;
        }

        setLoading(true);
        try {
            
            await createWatchman({email}); 
            setIsOtpSent(true); 
            setLoading(false); 
        } catch (error) {
            setLoading(false); 
            Alert.alert('Error', error.message || 'Failed to send OTP.');
            console.log(error);
        }
    };

    // Handle OTP verification
    const handleSubmit = async () => {
        if (otp.length !== 6) {
            Alert.alert('Error', 'Please enter a valid 6-digit OTP');
            return;
        }

        setLoading(true);
        try {
            const user = await getUserData()
            await verifyWatchmanOtp({identifier:email, otp, name:watchmenName, owner_id:user.id});
            setIsVerified(true);
            Alert.alert('Success', 'Email verified successfully!');
            navigation.navigate('My Watchman')
        } catch (error) {
            Alert.alert('Error', error.message || 'Invalid OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };



    return (
        <View style={tailwind`flex-1 justify-center items-center bg-blue-800 p-5`}>
            <Text style={tailwind`text-3xl font-bold text-yellow-500 mb-6`}>Add Watchman</Text>

            {/* Watchman Name Input */}
            <TextInput
                style={tailwind`w-full p-3 border border-yellow-500 rounded-md text-lg text-white mb-4`}
                placeholder="Enter Watchman Name"
                placeholderTextColor="lightgray"
                value={watchmenName}
                onChangeText={setWatchmenName}
            />

            {/* Email Input */}
            <TextInput
                style={tailwind`w-full p-3 border border-yellow-500 rounded-md text-lg text-white mb-4`}
                placeholder="Enter Email"
                placeholderTextColor="lightgray"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            {isOtpSent && (
                <TextInput
                    style={tailwind`w-full p-3 border border-yellow-500 rounded-md text-lg text-white mb-4`}
                    placeholder="Enter OTP"
                    placeholderTextColor="lightgray"
                    value={otp}
                    onChangeText={setOtp}
                    keyboardType="numeric"
                />
            )}

            {!isOtpSent ? (
                <TouchableOpacity
                    style={tailwind`bg-yellow-500 p-4 rounded-md w-full items-center`}
                    onPress={handleSendOtp}
                    disabled={loading}
                >
                    <Text style={tailwind`text-white text-xl font-bold`}>Send OTP</Text>
                </TouchableOpacity>
            ) :  (
                <TouchableOpacity
                    style={tailwind`bg-blue-500 p-4 rounded-md w-full items-center`}
                    onPress={handleSubmit}
                >
                    <Text style={tailwind`text-white text-xl font-bold`}>Add Watchman</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default AddWatchman;