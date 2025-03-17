// import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import HomeScreen from '../screens/HomeScreen';
// import CustomHeader from '../components/Header';

// const Stack = createStackNavigator();

// const HomeNavigator = () => (
//     <Stack.Navigator initialRouteName="Revisit" options={{ headerShown: false }}>
//         <Stack.Screen name="Revisit" component={HomeScreen} options={{ header: () => <CustomHeader /> }} />
//     </Stack.Navigator>
// );

// export default HomeNavigator;



// HomeStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CustomHeader from '../components/Header';

const Stack = createStackNavigator();

const HomeStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
                header: () => <CustomHeader title="Geo" isBack={false} />, // Custom header for Home screen
            }}
            // options={{ headerShown: false }}
        />
    </Stack.Navigator>
);

export default HomeStack;

