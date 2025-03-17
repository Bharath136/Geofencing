import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import tailwind from 'twrnc';
import { getWatchmanById } from '../services/watchmanService';

const TrackWatchmanScreen = ({ route }) => {
    const { watchmanId } = route.params || {};
    const [watchman, setWatchman] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Function to fetch the watchman details
    const getWatchman = async () => {
        try {
            const response = await getWatchmanById(watchmanId);
            setWatchman(response.data.data);
        } catch (err) {
            setError(true);
            console.error('Error fetching watchman details:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Fetch watchman details immediately when component mounts
        getWatchman();

        // Set up interval to refresh the location every 5 seconds
        const intervalId = setInterval(() => {
            getWatchman();  // Refresh watchman details
        }, 5000);

        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
    }, [watchmanId]);  // Watch for changes in watchmanId to fetch new data

    if (loading) {
        return (
            <View style={tailwind`flex-1 justify-center items-center bg-white`}>
                <ActivityIndicator size="large" color="#4F46E5" />
                <Text style={tailwind`mt-4 text-lg text-gray-600`}>Loading watchman details...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={tailwind`flex-1 justify-center items-center bg-white`}>
                <Text style={tailwind`text-lg text-red-500`}>Failed to load watchman details. Please try again.</Text>
            </View>
        );
    }

    const latitudeDelta = 0.01; // Default zoom level
    const longitudeDelta = 0.01;

    return (
        <View style={tailwind`flex-1 bg-white`}>
            {/* Map */}
            <MapView
                style={tailwind`flex-1`}
                initialRegion={{
                    latitude: watchman.last_known_latitude || 0,
                    longitude: watchman.last_known_longitude || 0,
                    latitudeDelta,
                    longitudeDelta,
                }}
                mapType="satellite"
            >
                {/* Current Location Marker */}
                {watchman?.last_known_latitude && watchman?.last_known_longitude && (
                    <Marker
                        coordinate={{
                            latitude: watchman.last_known_latitude,
                            longitude: watchman.last_known_longitude,
                        }}
                        title={`Your Security Guard ${watchman.name} is here!`}
                        pinColor="green"
                    />
                )}
            </MapView>

            {/* Watchman Details */}
            <View style={tailwind`p-4 bg-blue-100`}>
                <Text style={tailwind`text-xl font-bold text-black`}>
                    {watchman?.name}
                </Text>
            </View>
        </View>
    );
};

export default TrackWatchmanScreen;
