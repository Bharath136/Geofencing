import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Polygon, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { addGeofenceCoordinates } from '../services/geofenceService';
import { getUserData } from '../utils/cookieUtils';

export default function GeofenceScreen() {
    const [location, setLocation] = useState(null);
    const [region, setRegion] = useState(null);
    const [mapType, setMapType] = useState("standard");
    const [coordinates, setCoordinates] = useState([]);
    const [landName, setLandName] = useState("");
    const [owner, setOwner] = useState('')

    const getUser = async () => {
        const owner = await getUserData();

        setOwner(owner)
    }
    

    // Request permission and get current location
    useEffect(() => {
        fetchLocation();
        getUser()
    }, []);

    // Function to fetch location
    const fetchLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Location permission is required to use this feature');
            return;
        }

        const locationData = await Location.getCurrentPositionAsync({});
        if (locationData) {
            setLocation(locationData.coords);
            setRegion({
                latitude: locationData.coords.latitude,
                longitude: locationData.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
        }
    };


    // Function to add coordinates on map press
    const handleMapPress = (e) => {
        setCoordinates([...coordinates, e.nativeEvent.coordinate]);
    };

    // Toggle map type
    const toggleMapType = (value) => {
        setMapType(value);
    };

    // Undo the last added coordinate
    const undoLastCoordinate = useCallback(() => {
        if (coordinates.length === 0) {
            Alert.alert("No Coordinates", "There are no coordinates to remove.");
            return;
        }
        setCoordinates((prevCoordinates) => prevCoordinates.slice(0, -1));
    }, [coordinates]);

    // Clear all coordinates
    const clearPolygon = () => {
        setCoordinates([]);
    };

    // Submit geofence data
    const submitGeofenceData = async () => {
        if (!landName.trim() || coordinates.length < 3) {
            Alert.alert("Error", "Please enter a land name and select at least 3 coordinates.");
            return;
        }

        const geofence = {
            owner_id: owner?.id,
            coordinates,
            name: landName,
        };

        try {
            await addGeofenceCoordinates(geofence);
            Alert.alert("Success", "Geofence data submitted successfully!");
            setCoordinates([]);
            setLandName("");
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Failed to submit geofence data. Please try again.");
        }
    };

    // Refresh the location and reset coordinates
    const refreshMap = async () => {
        setCoordinates([]);
        setLandName("");
        await fetchLocation();
    };

    return (
        <View style={tw`flex-1 bg-blue-100`}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={tw`flex-1`}
                region={region}
                // mapType={mapType}
                mapType={mapType === "satellite" ? "hybrid" : mapType}
                onPress={handleMapPress}
            >
                {/* Current Location Marker */}
                {location && (
                    <Marker
                        coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                        title="Your Location"
                        pinColor="blue"
                    />
                )}
                {/* Polygon for selected coordinates */}
                {coordinates.length > 0 && (
                    <Polygon coordinates={coordinates} strokeColor="#FF0000" fillColor="rgba(255, 255, 0, 0.3)" />
                )}
                {/* Markers for geofence points */}
                {coordinates.map((coord, index) => (
                    <Marker key={index} coordinate={coord} />
                ))}
            </MapView>

            {/* Map Type Toggle Buttons */}
            <View style={tw`absolute top-5 right-5 flex-col`}>
                <TouchableOpacity
                    onPress={() => toggleMapType('standard')}
                    style={tw`p-2 w-12 h-12 mb-2 rounded-full items-center justify-center ${mapType === 'standard' ? 'bg-yellow-500' : 'bg-gray-300'}`}
                >
                    <Icon name="map" size={24} color={mapType === 'standard' ? 'white' : '#1E40AF'} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => toggleMapType('satellite')}
                    style={tw`p-2 w-12 h-12 rounded-full items-center justify-center ${mapType === 'satellite' ? 'bg-yellow-500' : 'bg-gray-300'}`}
                >
                    <Icon name="satellite" size={24} color={mapType === 'satellite' ? 'white' : '#1E40AF'} />
                </TouchableOpacity>
            </View>

            {/* Coordinate Management Buttons */}
            {coordinates.length > 0 && (
                <View style={tw`absolute bottom-31 left-0 right-0 flex-row justify-between items-center p-4`}>
                    <TouchableOpacity
                        onPress={undoLastCoordinate}
                        style={tw`items-center justify-center p-3 rounded-full bg-red-500`}
                    >
                        <Icon name="undo" size={24} color="#FFF" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={clearPolygon}
                        style={tw`items-center justify-center p-3 rounded-full bg-red-500`}
                    >
                        <Icon name="delete" size={24} color="#FFF" />
                    </TouchableOpacity>
                </View>
            )}

            {/* Geofence Data Submission Form */}
            <View style={tw`p-4 bg-blue-800`}>
                <TextInput
                    placeholder="Enter Property Name"
                    placeholderTextColor="rgba(255,255,255,0.7)"
                    style={tw`p-3 border border-gray-400 rounded mb-2 text-white`}
                    value={landName}
                    onChangeText={setLandName}
                />
                <TouchableOpacity style={tw`bg-yellow-500 p-3 rounded`} onPress={submitGeofenceData}>
                    <Text style={tw`text-center text-blue-900 font-bold text-[18px]`}>Submit Geofence Data</Text>
                </TouchableOpacity>
            </View>

            {/* Refresh Button */}
            <View style={tw`absolute top-34 right-5`}>
                <TouchableOpacity
                    onPress={refreshMap}
                    style={tw`items-center justify-center p-3 rounded-full bg-green-500`}
                >
                    <Icon name="refresh" size={24} color="#FFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

