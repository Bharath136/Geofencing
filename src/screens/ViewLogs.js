// ViewLogs.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import tw from 'twrnc';

const ViewLogs = () => {
    return (
        <View style={tw`flex-1 bg-blue-100 p-6`}>
            <Text style={tw`text-3xl font-extrabold text-blue-800 mb-4`}>
                View Logs
            </Text>
            <Text style={tw`text-lg text-blue-700 mb-6`}>
                Here are the logs for tracking all activities.
            </Text>

            {/* You can display logs here */}
            <Button title="View All Logs" onPress={() => { /* Handle viewing logs */ }} />
            {/* Display the log details in a list or similar component */}
        </View>
    );
};

export default ViewLogs;
