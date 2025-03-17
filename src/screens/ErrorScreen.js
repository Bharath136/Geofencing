import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import tw from 'twrnc';

export default function NetworkErrorScreen({ onRetry }) {
    return (
        <View style={tw`flex-1 justify-center items-center bg-gray-100`}>
            <Image
                source={{ uri: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=No+Internet' }}
                style={tw`w-48 h-48 mb-4`}
            />
            <Text style={tw`text-lg font-bold text-gray-700 mb-2`}>No Internet Connection</Text>
            <Text style={tw`text-gray-500 text-center mb-6`}>
                Please check your internet settings and try again.
            </Text>
            <TouchableOpacity
                onPress={onRetry}
                style={tw`bg-blue-600 py-3 px-6 rounded-full`}
            >
                <Text style={tw`text-white font-bold`}>Retry</Text>
            </TouchableOpacity>
        </View>
    );
}
