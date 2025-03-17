import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import tailwind from 'twrnc';
import { getPropertyById } from '../services/geofenceService';

// Function to calculate the initial region that encompasses all coordinates
const calculateRegion = (coordinates) => {
    const latitudes = coordinates.map(coord => coord.latitude);
    const longitudes = coordinates.map(coord => coord.longitude);

    const minLatitude = Math.min(...latitudes);
    const maxLatitude = Math.max(...latitudes);
    const minLongitude = Math.min(...longitudes);
    const maxLongitude = Math.max(...longitudes);

    const latitudeDelta = maxLatitude - minLatitude + 0.02; // Adding padding
    const longitudeDelta = maxLongitude - minLongitude + 0.02; // Adding padding

    const centerLatitude = (minLatitude + maxLatitude) / 2;
    const centerLongitude = (minLongitude + maxLongitude) / 2;

    return {
        latitude: centerLatitude,
        longitude: centerLongitude,
        latitudeDelta,
        longitudeDelta,
    };
};

const PropertyDetailsScreen = ({ route }) => {
    const { propertyId } = route.params || {};
    const [property, setProperty] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const { coordinates, name, area_in_acres } = property || {};

    const getProperty = async () => {
        try {
            const response = await getPropertyById(propertyId);
            setProperty(response.data);
        } catch (error) {
            setError(true);
            console.error('Error fetching property details:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProperty();
    }, []);

    if (loading) {
        return (
            <View style={tailwind`flex-1 justify-center items-center bg-white`}>
                <ActivityIndicator size="large" color="#4F46E5" />
                <Text style={tailwind`mt-4 text-lg text-gray-600`}>Loading property details...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={tailwind`flex-1 justify-center items-center bg-white`}>
                <Text style={tailwind`text-lg text-red-500`}>Failed to load property details. Please try again.</Text>
            </View>
        );
    }

    if (!coordinates || coordinates.length === 0) {
        return (
            <View style={tailwind`flex-1 justify-center items-center bg-white`}>
                <Text style={tailwind`text-lg text-red-500`}>No coordinates available for this property.</Text>
            </View>
        );
    }

    const initialRegion = calculateRegion(coordinates);

    return (
        <View style={tailwind`flex-1 bg-white`}>
            {/* Map */}
            <MapView
                style={tailwind`flex-1`}
                initialRegion={initialRegion}
                mapType={"satellite"}
            >
                {coordinates.map((coord, index) => (
                    <Marker
                        key={index}
                        coordinate={coord}
                        title={`${name} - Location ${index + 1}`}
                        description={`Lat: ${coord.latitude}, Lng: ${coord.longitude}`}
                    />
                ))}
            </MapView>

            {/* Property Details */}
            <View style={tailwind`p-4 bg-blue-100`}>
                <Text style={tailwind`text-xl font-bold text-black`}>{name}</Text>
                <Text style={tailwind`text-lg text-black mt-2`}>
                    <Text style={tailwind`font-bold`}>Acres: </Text>
                    {area_in_acres}
                </Text>
            </View>
        </View>
    );
};

export default PropertyDetailsScreen;
