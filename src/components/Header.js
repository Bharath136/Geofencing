import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

const CustomHeader = ({ title, isBack=true }) => {
    const navigation = useNavigation();

    return (
        <View style={tw`flex-row justify-between items-center bg-blue-800 p-4 pt-12`}>
            <View style={tw`flex-row items-center`}>
                {isBack && <Ionicons
                    name="arrow-back"
                    size={24}
                    style={tw`text-white`}
                    onPress={() => navigation.goBack()}
                />}
                <Text style={tw`text-lg font-bold ml-2 text-white `}>{title}</Text>
            </View>
            {/* <View style={tw`flex-row items-center`}>
                <Ionicons
                    name="bell-outline"
                    size={24}
                    style={tw`mr-4 `}
                    onPress={() => navigation.navigate('Wishlist')}
                />
            </View> */}
        </View>
    );
};

export default CustomHeader;
