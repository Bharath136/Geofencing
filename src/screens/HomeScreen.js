import React, { useEffect, useState } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import tailwind from 'twrnc'; // Import twrnc for styling

const HomeScreen = () => {
    const [location, setLocation] = useState(null);
    const [geofencedArea, setGeofencedArea] = useState({ latitude: 37.78825, longitude: -122.4324, radius: 1000 }); // Example geofence location
    const [geofenceStatus, setGeofenceStatus] = useState('Monitoring Off');

    let mapRef = null; // Reference for the MapView

    // Request location permissions on initial load
    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Location permission is required for geofencing to work.');
                return;
            }

            const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
            setLocation(loc.coords);

            // Automatically move the map to the current location when it's available
            if (mapRef && loc.coords) {
                mapRef.animateToRegion({
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }, 1000);
            }
        })();
    }, []);

    // Function to toggle geofencing monitoring
    const toggleGeofenceMonitoring = () => {
        if (geofenceStatus === 'Monitoring Off') {
            setGeofenceStatus('Monitoring On');
            // Start geofencing logic here
        } else {
            setGeofenceStatus('Monitoring Off');
            // Stop geofencing monitoring here
        }
    };

    // Function to calculate distance from geofence center
    const checkGeofence = (deviceLocation) => {
        const distance = Location.distance({
            latitude: deviceLocation.latitude,
            longitude: deviceLocation.longitude,
        }, geofencedArea);

        return distance <= geofencedArea.radius;
    };

    return (
        <View style={tailwind`flex-1 `}>

            {/* Map */}
            <MapView
                ref={(ref) => (mapRef = ref)}
                style={tailwind`flex-1`}
                initialRegion={{
                    latitude: location?.latitude || 37.78825,
                    longitude: location?.longitude || -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {location && (
                    <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} title="Your Location" />
                )}

                <Marker
                    coordinate={{ latitude: geofencedArea.latitude, longitude: geofencedArea.longitude }}
                    pinColor="yellow"
                    title="Geofence Center"
                />
            </MapView>

            {/* Auto-Focus Button */}
            {location && (
                <TouchableOpacity
                    onPress={() => {
                        if (mapRef) {
                            mapRef.animateToRegion({
                                latitude: location.latitude,
                                longitude: location.longitude,
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01,
                            }, 1000);
                        }
                    }}
                    style={tailwind`absolute top-5 right-5 p-2 bg-yellow-500 rounded-full shadow`}
                >
                    <Text style={tailwind`text-blue-900 text-center`}>Focus</Text>
                </TouchableOpacity>
            )}

            {/* Bottom Controls */}
            <View style={tailwind`p-4 bg-blue-800 rounded-t-2xl`}>
                <Text style={tailwind`text-center text-lg text-yellow-400`}>
                    Geofence Status: {geofenceStatus}
                </Text>
                <TouchableOpacity
                    onPress={toggleGeofenceMonitoring}
                    style={tailwind`mt-4 py-2 px-4 rounded bg-yellow-500`}
                >
                    <Text style={tailwind`text-center text-lg text-blue-900`}>Toggle Monitoring</Text>
                </TouchableOpacity>

                {/* Geofence Alert Button */}
                {location && (
                    <TouchableOpacity
                        onPress={() => {
                            if (checkGeofence(location)) {
                                Alert.alert('Inside Geofence', 'You are inside the geofenced area.');
                            } else {
                                Alert.alert('Outside Geofence', 'You are outside the geofenced area.');
                            }
                        }}
                        style={tailwind`mt-4 py-2 px-4 rounded bg-yellow-500`}
                    >
                        <Text style={tailwind`text-center text-lg text-blue-900`}>Check Geofence</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default HomeScreen;
