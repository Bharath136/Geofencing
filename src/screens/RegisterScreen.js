import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import tailwind from 'twrnc';
import { registerUser } from '../services/authService';
import { useWatchman } from '../contexts/WatchmanContext';

const RegisterScreen = ({ navigation }) => {
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

  const handleRegister = async () => {
    if (!email) {
      Alert.alert('Please enter a valid email or phone number');
      return;
    }

    setLoading(true);  // Start loading when registration begins
    try {
      await registerUser(email);
      setLoading(false);  // Stop loading once the registration is complete
      navigation.navigate('OTP', { email });
    } catch (error) {
      setLoading(false);  // Stop loading in case of an error
      Alert.alert('Registration failed', error.message);
  
      console.log(error)
    }
  };

  return (
    <View style={tailwind`flex-1 justify-center items-center bg-gray-100 p-6`}>
      <Text style={tailwind`text-2xl font-bold mb-6 text-blue-900`}>Register</Text>
      <TextInput
        style={tailwind`w-full p-4 mb-4 border border-gray-300 rounded-lg`}
        placeholder="Email or Phone Number"
        value={email}
        onChangeText={setEmail}
        keyboardType="default"
      />
      <TouchableOpacity
        style={tailwind`bg-blue-900 w-full p-4 rounded-lg`}
        onPress={handleRegister}
        disabled={loading}  // Disable the button while loading
      >
        {loading ? (
          <ActivityIndicator size="small" color="#ffffff" />  // Show loading spinner
        ) : (
          <Text style={tailwind`text-center text-white font-semibold`}>Register</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={tailwind`mt-4 text-blue-600`}>Already have an account? Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
