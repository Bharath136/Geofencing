import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import tailwind from 'twrnc';

// Sample notifications data
const sampleNotifications = [
    {
        id: '1',
        title: 'Geofence Alert',
        message: 'Your device has entered the restricted area.',
        timestamp: '2024-12-13 12:00:00',
        isRead: false,
    },
    {
        id: '2',
        title: 'System Update',
        message: 'A new update is available for your device.',
        timestamp: '2024-12-13 08:30:00',
        isRead: true,
    },
    {
        id: '3',
        title: 'Reminder',
        message: 'Your geofence setup has been completed successfully.',
        timestamp: '2024-12-12 14:00:00',
        isRead: false,
    },
];

const NotificationsScreen = () => {
    const [notifications, setNotifications] = useState(sampleNotifications);

    const handleNotificationPress = (notificationId) => {
        // Mark notification as read when clicked
        const updatedNotifications = notifications.map((notif) =>
            notif.id === notificationId ? { ...notif, isRead: true } : notif
        );
        setNotifications(updatedNotifications);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => handleNotificationPress(item.id)}
            style={[
                tailwind`p-4 my-2 rounded-lg`,
                item.isRead ? tailwind`bg-gray-200` : tailwind`bg-yellow-100`,
            ]}
        >
            <Text style={tailwind`text-xl font-bold text-blue-700`}>{item.title}</Text>
            <Text style={tailwind`text-lg text-gray-700`}>{item.message}</Text>
            <Text style={tailwind`text-sm text-gray-500 mt-2`}>{item.timestamp}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={tailwind`flex-1 bg-blue-50`}>
            <Text style={tailwind`text-2xl font-bold text-blue-700 text-center pt-6`}>
                Notifications
            </Text>
            <FlatList
                data={notifications}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={tailwind`px-4 py-6`}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    notificationCard: {
        padding: 10,
        marginVertical: 10,
        borderRadius: 8,
    },
});

export default NotificationsScreen;