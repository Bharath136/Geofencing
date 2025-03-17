
import { View, Text } from 'react-native';
import tw from 'twrnc';
import { useWatchman } from '../contexts/WatchmanContext';

const WatchmanDashboard = ({ navigation }) => {
    const { user } = useWatchman()


    return (
        <View style={tw`flex-1 bg-blue-900 p-4 `}>  
            <Text style={tw`text-3xl font-extrabold text-yellow-500 mb-4`}>
                Welcome, {user?.name}!
            </Text>
            <Text style={tw`text-lg text-white mb-6`}>
                Here's your dashboard to track entries, logs, and monitor devices.
            </Text>
        </View>
    );
};

export default WatchmanDashboard;
