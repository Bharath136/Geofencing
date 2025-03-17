import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import tailwind from 'twrnc'; // Tailwind for styling
import { getAllPropertiesByOwner } from '../services/geofenceService';
import { getUserData } from '../utils/cookieUtils';

const MyProperties = ({ navigation }) => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch user data and properties
    const fetchData = async () => {
        try {
            setLoading(true); // Start loading
            const owner = await getUserData();

            if (!owner?.id) {
                Alert.alert('Error', 'User information is missing.');
                return;
            }

            const response = await getAllPropertiesByOwner(owner?.id);
            setProperties(response.data || []);
        } catch (error) {
            console.error('Error fetching data:', error);
            Alert.alert('Error', 'Failed to fetch properties. Please try again later.');
        } finally {
            setLoading(false); // End loading
        }
    };

    useEffect(() => {
        fetchData(); // Fetch data on component mount
    }, []);

    // Handle land item press
    
    const handleLandPress = (land) => {
        navigation.navigate('PropertyDetails', { propertyId: land?.id, name:land.name });
    };


    // const handleLandPress = (land) => {
    //     Alert.alert('Land Details', `Name: ${land.name}\nLocation: ${land.location}\nSize: ${land.area_in_acres} acres`);
    // };

    // Render individual property item
    const renderPropertyItem = ({ item }) => (
        <View
            style={[
                tailwind`p-4 mb-4 rounded bg-blue-100 shadow-lg`, // Tailwind styles
                {
                    shadowColor: 'gray', // Shadow color for iOS
                    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
                    shadowOpacity: 0.2, // Shadow opacity for iOS
                    shadowRadius: 4, // Shadow radius for iOS
                    elevation: 4, // Elevation for Android
                },
            ]}
        >
            <Text style={tailwind`text-xl text-black font-bold`}>{item.name}</Text>
            <Text style={tailwind`text-lg text-black`}>
                <Text style={tailwind`font-bold`}>Location: </Text> {item.location}
            </Text>
            <Text style={tailwind`text-lg text-black`}>
                <Text style={tailwind`font-bold`}>Size: </Text> {item.area_in_acres} acres
            </Text>
            <TouchableOpacity
                style={tailwind`bg-blue-500 p-2 mt-4 rounded-md`}
                onPress={() => handleLandPress(item)}
            >
                <Text style={tailwind`text-white text-center font-bold text-lg `}>View Details</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={tailwind`flex-1 bg-blue-50`}>
            {loading ? (
                <View style={tailwind`flex-1 justify-center items-center`}>
                    <ActivityIndicator size="large" color="#0D47A1" />
                    <Text style={tailwind`text-blue-900 text-lg font-bold mt-4`}>Loading properties...</Text>
                </View>
            ) : properties.length === 0 ? (
                <View style={tailwind`flex-1 justify-center items-center`}>
                    <Text style={tailwind`text-gray-700 text-xl font-semibold text-center`}>
                        No properties available
                    </Text>
                    <Text style={tailwind`text-gray-500 mt-2 text-center`}>
                        Please add properties to view them here.
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={properties}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderPropertyItem}
                    // contentContainerStyle={tailwind`pb-10`}
                    contentContainerStyle={tailwind`px-4 py-4 pb-16`}
                // ListHeaderComponent={() => (
                //     <View style={tailwind`mb-6`}>
                //         <Text style={tailwind`text-lg font-semibold text-blue-900`}>List of Watchmen</Text>
                //     </View>
                // )}
                />
            )}

            {/* Add Property Button */}
            {!loading && (
                <TouchableOpacity
                    style={tailwind`absolute bottom-6 right-6 bg-yellow-500 p-4 rounded-full shadow-lg`}
                    onPress={() => navigation.navigate('Geofence')}
                >
                    <Text style={tailwind`text-blue-600 text-2xl font-bold`}>+</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default MyProperties;
