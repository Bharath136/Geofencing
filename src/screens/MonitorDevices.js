// MonitorDevices.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import tw from 'twrnc';

const MonitorDevices = () => {
    return (
        <View style={tw`flex-1 bg-blue-100 p-6`}>
            <Text style={tw`text-3xl font-extrabold text-blue-800 mb-4`}>
                Monitor Devices
            </Text>
            <Text style={tw`text-lg text-blue-700 mb-6`}>
                Here you can monitor the status of all devices in the premises.
            </Text>

            {/* You can add a list of devices or controls for each device */}
            <Button title="View Devices" onPress={() => { /* Handle device monitoring */ }} />
            {/* Add device status or any additional details here */}
        </View>
    );
};

export default MonitorDevices;
