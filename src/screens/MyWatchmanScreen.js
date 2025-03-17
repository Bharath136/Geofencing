import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import tw from 'twrnc';
import { getWatchmanByOwnerId } from '../services/watchmanService';
import { getUserData } from '../utils/cookieUtils';

const MyWatchmanScreen = ({ navigation }) => {
    const [watchman, setWatchman] = useState([]);
    const [loading, setLoading] = useState(false);

    const getWatchman = async () => {
        try {
            setLoading(true); // Start loader
            const user = await getUserData();
            const response = await getWatchmanByOwnerId(user.id);
            setWatchman(response.data.data || []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false); // End loader
        }
    };

    useEffect(() => {
        getWatchman();
    }, []);

    const renderWatchman = ({ item }) => (
        <View style={tw`flex-row items-center justify-between bg-blue-100 p-4 rounded mb-3 shadow-md`}>
            <View style={tw`flex-1`}>
                <Text style={tw`text-lg font-bold text-blue-900`}>{item.name}</Text>
                <Text style={tw`text-sm text-blue-700`}>{item.email}</Text>
                <Text
                    style={tw.style(
                        `text-sm mt-1`,
                        item.status === 'inside' ? `text-yellow-500` : `text-blue-500`
                    )}
                >
                    Status: {item.status}
                </Text>
            </View>
            <View style={tw`flex-col text-center items-end`}>
                <TouchableOpacity
                    style={tw.style(
                        `py-2 px-4 rounded-lg`,
                        item.is_active ? `bg-yellow-500` : `bg-blue-500`
                    )}
                >
                    <Text style={tw`text-white font-bold`}>{item.is_active ? 'Active' : 'Inactive'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={tw`py-2 px-4 rounded-lg bg-yellow-500 mt-1`}
                    onPress={() => navigation.navigate('Track', { watchmanId: item.id, name: item.name })}
                >
                    <Text style={tw`text-white text-center font-bold`}>View Details</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={tw`flex-1 bg-blue-50`}>
            {loading ? (
                <ActivityIndicator
                    size="large"
                    color="#0D47A1"
                    style={tw`flex-1 justify-center`}
                />
            ) : watchman.length === 0 ? (
                <Text style={tw`text-blue-900 text-xl text-center mt-10`}>No Watchmen Available</Text>
            ) : (
                <FlatList
                    data={watchman}
                    keyExtractor={(item) => item.id}
                    renderItem={renderWatchman}
                    contentContainerStyle={tw`px-4 py-4 pb-16`}
                />
            )}
            <TouchableOpacity
                style={tw`absolute bottom-6 right-6 bg-yellow-500 p-4 rounded-full shadow-lg`}
                onPress={() => navigation.navigate('Add Watchman')}
            >
                <Text style={tw`text-blue-600 text-xl font-bold`}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

export default MyWatchmanScreen;
