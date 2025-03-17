import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import owner from '../assets/images/Owner.png'; // Ensure the image exists
import watchman from '../assets/images/Watchman.png'; // Ensure the image exists
import tw from 'twrnc';
import { setSelectedRole } from '../utils/cookieUtils';
import { useWatchman } from '../contexts/WatchmanContext';

const RoleSelectionScreen = () => {
    const navigation = useNavigation();
    const {user} = useWatchman()


    useEffect(() => {
        if(user?.role === 'owner'){
            navigation.navigate('Owner')
        } else if (user?.role === 'watchman'){
            navigation.navigate('Watchmen')
        }
    })

    const handleRoleSelect = async (role) => {
        navigation.navigate(role);
        await setSelectedRole(role)
    };

    return (
        <View style={tw`flex-1 bg-blue-900 justify-center items-center`}>
            {/* Title */}
            <Text style={tw`text-4xl font-extrabold text-yellow-400 mb-10`}>
                Who are you?
            </Text>

            {/* Role Selection Cards */}
            <View style={tw`w-full p-4`}>
                {/* Owner Card */}
                <TouchableOpacity
                    style={tw`bg-yellow-400 rounded-xl shadow-lg p-4 mb-4 flex-row items-center`}
                    onPress={() => handleRoleSelect('Login')}
                >
                    <Image
                        source={owner}
                        style={tw`w-20 h-20 rounded-full mr-4`}
                    />
                    <View style={tw`flex-1`}>
                        <Text style={tw`text-xl font-bold text-blue-900`}>Owner</Text>
                        <Text style={tw`text-sm text-blue-800`}>
                            Manage geofence, notifications, and devices
                        </Text>
                    </View>
                </TouchableOpacity>

                {/* Watchman Card */}
                <TouchableOpacity
                    style={tw`bg-yellow-400 rounded-xl shadow-lg p-4 flex-row items-center`}
                    onPress={() => handleRoleSelect('SecurityLogin')}
                >
                    <Image
                        source={watchman}
                        style={tw`w-20 h-20 rounded-full mr-4`}
                    />
                    <View style={tw`flex-1`}>
                        <Text style={tw`text-xl font-bold text-blue-900`}>Protector <Text style={tw`text-sm font-bold text-blue-900`}>(Watchmen)</Text></Text>
                        <Text style={tw`text-sm text-blue-800`}>
                            Track entries, logs, and monitor devices
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default RoleSelectionScreen;
