import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Location from 'react-native-location';
import tailwind from 'twrnc';

const DeviceDetectionScreen = () => {
    const [location, setLocation] = useState(null);
    const [isInsideGeofence, setIsInsideGeofence] = useState(null);
    const [error, setError] = useState(null);

    // Geofence coordinates (latitude, longitude) and radius (in meters)
    const geofence = {
        latitude: 37.7749, // Example: San Francisco latitude
        longitude: -122.4194, // Example: San Francisco longitude
        radius: 1000, // 1km radius
    };

    // Function to calculate distance between two coordinates
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371e3; // Earth radius in meters
        const phi1 = (lat1 * Math.PI) / 180;
        const phi2 = (lat2 * Math.PI) / 180;
        const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
        const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

        const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
            Math.cos(phi1) * Math.cos(phi2) *
            Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // in meters
        return distance;
    };

    // Function to fetch device's current location
    const fetchLocation = async () => {
        try {
            const permissionGranted = await Location.requestPermission({
                ios: 'whenInUse',
                android: { detail: 'coarse' },
            });
            if (permissionGranted) {
                Location.getLatestLocation().then((loc) => {
                    setLocation(loc);
                    const distance = calculateDistance(
                        loc.latitude,
                        loc.longitude,
                        geofence.latitude,
                        geofence.longitude
                    );
                    setIsInsideGeofence(distance <= geofence.radius);
                });
            } else {
                setError('Permission denied to access location.');
            }
        } catch (err) {
            setError('Error fetching location');
        }
    };

    useEffect(() => {
        fetchLocation();
    }, []);

    return (
        <View style={tailwind`flex-1 justify-center items-center bg-blue-100`}>
            <Text style={tailwind`text-xl font-bold text-blue-700`}>Device Detection</Text>
            {error ? (
                <Text style={tailwind`text-red-500 text-lg mt-4`}>{error}</Text>
            ) : (
                <View style={tailwind`mt-4`}>
                    <Text style={tailwind`text-lg text-yellow-500`}>
                        Current Location:
                    </Text>
                    <Text style={tailwind`text-sm text-gray-600`}>
                        {location
                            ? `Lat: ${location.latitude}, Lon: ${location.longitude}`
                            : 'Fetching location...'}
                    </Text>
                    {isInsideGeofence !== null && (
                        <Text
                            style={tailwind`mt-4 text-lg ${isInsideGeofence ? 'text-green-500' : 'text-red-500'
                                }`}
                        >
                            {isInsideGeofence ? 'Inside Geofence' : 'Outside Geofence'}
                        </Text>
                    )}
                    <Button
                        title="Check Location Again"
                        onPress={fetchLocation}
                        color="#3498db"
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default DeviceDetectionScreen;
