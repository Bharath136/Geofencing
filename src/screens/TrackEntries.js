// TrackEntries.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import tw from 'twrnc';

const TrackEntries = () => {
    const handleAddEntry = () => {
        // Handle the logic for adding a new entry
        console.log("Add New Entry logic goes here");
    };

    return (
        <View style={tw`flex-1 bg-gray-50 p-6`}>
            {/* Title Section */}
            <Text style={tw`text-4xl font-bold text-gray-800 mb-4`}>
                Track Premises Entries
            </Text>

            {/* Description Section */}
            <Text style={tw`text-base text-gray-600 mb-6`}>
                You can track all the entries made to the premises from here. Ensure that all entries are logged properly for security and record-keeping purposes.
            </Text>

            {/* Action Section */}
            <View style={tw`mb-6`}>
                <Button
                    title="Add New Entry"
                    onPress={handleAddEntry}
                    color="#007BFF" // Use a professional blue for the button
                />
            </View>

            {/* Placeholder for Entries List (future feature) */}
            <Text style={tw`text-sm text-gray-500`}>
                No entries available at the moment. Please add new entries to track them.
            </Text>
        </View>
    );
};

export default TrackEntries;
