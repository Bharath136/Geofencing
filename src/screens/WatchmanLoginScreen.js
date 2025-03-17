import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import tailwind from 'twrnc';
import { loginUser } from '../services/watchmanService';
import { useWatchman } from '../contexts/WatchmanContext';

const WatchmanLoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const {user} = useWatchman()
    
        useEffect(() => {
            if(user?.role === 'owner'){
                navigation.navigate('Owner')
            } else if (user?.role === 'watchman'){
                navigation.navigate('Watchmen')
            }
        })

    const handleLogin = async () => {
        setLoading(true);
        try {
            await loginUser(email);
            setLoading(false);
            navigation.navigate('SecurityOTP', { email });
        } catch (error) {
            setLoading(false);
            Alert.alert('Login failed', error.message || 'An error occurred');
        }
    };

    return (
        <View style={tailwind`flex-1 justify-center items-center bg-gray-100 p-6`}>
            <Text style={tailwind`text-2xl font-bold mb-6 text-blue-900`}>Security Login</Text>
            <TextInput
                style={tailwind`w-full p-4 mb-4 border border-gray-300 rounded-lg`}
                placeholder="Email or Phone Number"
                value={email}
                onChangeText={setEmail}
                keyboardType="default"
            />
            {/* <TouchableOpacity
        style={tailwind`bg-blue-900 w-full p-4 rounded-lg`}
        onPress={handleLogin}
      >
        <Text style={tailwind`text-center text-white font-semibold`}>Log In</Text>
      </TouchableOpacity> */}
            <TouchableOpacity
                style={tailwind`bg-blue-900 w-full p-4 rounded-lg ${loading ? 'opacity-50' : ''}`}
                onPress={handleLogin}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                    <Text style={tailwind`text-center text-white font-semibold`}>Log In</Text>
                )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={tailwind`mt-4 text-blue-900`}>Are you a owner? click here</Text>
            </TouchableOpacity>
        </View>
    );
};

export default WatchmanLoginScreen;
