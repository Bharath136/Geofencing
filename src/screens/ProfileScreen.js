import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import tw from 'twrnc';
import {  clearUserData } from '../utils/cookieUtils'; // Assuming you have a function to clear user data
import { useNavigation } from '@react-navigation/native';
import { useWatchman } from '../contexts/WatchmanContext';

const ProfileScreen = () => {

  const { user } = useWatchman()
  const navigation = useNavigation();

  // Logout functionality
  const handleLogout = async () => {
    await clearUserData();
    navigation.replace('Auth', { screen: 'Login' });
  };

  return (
    <ScrollView style={tw`flex-1 bg-gray-100`}>
      {/* Header */}
      <View style={tw`bg-blue-800 py-8 items-center`}>
        <Image
          source={{ uri: 'https://example.com/profile-image.jpg' }} // Replace with actual profile image
          style={tw`w-24 h-24 rounded-full mb-4`}
        />
        <Text style={tw`text-white text-2xl font-bold`}>{user?.name}</Text>
        <Text style={tw`text-white text-lg`}>{user?.email}</Text>
      </View>

      {/* Personal Information Section */}
      <View style={tw`bg-white p-6 mt-5 mx-5 rounded-lg`}>
        <Text style={tw`text-blue-800 text-xl font-semibold mb-4`}>Personal Information</Text>
        <View style={tw`flex-row justify-between mb-4`}>
          <Text style={tw`text-gray-800 text-lg`}>Phone</Text>
          <Text style={tw`text-gray-600 text-lg`}>{user?.phone}</Text>
        </View>
        <View style={tw`flex-row justify-between mb-4`}>
          <Text style={tw`text-gray-800 text-lg`}>Address</Text>
          <Text style={tw`text-gray-600 text-lg`}>123 Street, City, Country</Text>
        </View>
      </View>

      {/* Profile Options Section */}
      <View style={tw`bg-white p-4 mt-5 mx-5 rounded-lg`}>

        {/* Help Center */}
        <TouchableOpacity style={tw`flex-row items-center justify-between py-3 mb-4`}>
          <Text style={tw`text-gray-800 text-lg`}>Help Center</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="#888888" />
        </TouchableOpacity>
      </View>

      {/* Action Section */}
      <View style={tw`mt-5 mx-5`}>

        <TouchableOpacity
          onPress={handleLogout}
          style={tw`bg-orange-500 flex-row items-center justify-center py-3 rounded-lg`}
        >
          <Ionicons name="log-out-outline" size={20} color="#FFFFFF" />
          <Text style={tw`text-white text-lg font-bold ml-2`}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;