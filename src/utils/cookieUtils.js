import AsyncStorage from '@react-native-async-storage/async-storage';

// API Base URL
// export const API_BASE_URL = 'https://geofencebackend.onrender.com/api/v1';
// export const API_BASE_URL = 'http://localhost:5000/api/v1';
export const API_BASE_URL = 'http://192.168.0.101/api/v1'

// Save user data to async storage
export const setUserData = async (userData) => {
    try {
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        console.log('User data saved');
    } catch (error) {
        console.error("Error saving user data:", error);
    }
}

// Get user data from async storage
export const getUserData = async () => {
    try {
        const userData = await AsyncStorage.getItem('userData');
        return userData ? JSON.parse(userData) : null; // Parse JSON if data exists
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
}

// Save token to async storage
export const setToken = async (token) => {
    try {
        await AsyncStorage.setItem('userToken', token);
        console.log('Token saved');
    } catch (error) {
        console.error("Error saving token:", error);
    }
}

// Get token from async storage
export const getToken = async () => {
    try {
        return await AsyncStorage.getItem('userToken');
    } catch (error) {
        console.error("Error fetching token:", error);
        return null;
    }
}

// Remove token from async storage
export const removeToken = async () => {
    try {
        await AsyncStorage.removeItem('userToken');
        console.log('Token removed');
    } catch (error) {
        console.error("Error removing token:", error);
    }
}

// Save selected role to async storage
export const setSelectedRole = async (role) => {
    try {
        await AsyncStorage.setItem('role', JSON.stringify(role));
        console.log('Role saved');
    } catch (error) {
        console.error("Error saving role:", error);
    }
}

// Get selected role from async storage
export const getSelectedRole = async () => {
    try {
        const role = await AsyncStorage.getItem('role');
        return role ? JSON.parse(role) : null; // Parse JSON if data exists
    } catch (error) {
        console.error("Error fetching role:", error);
        return null;
    }
}

// Clear all user-related data from async storage
export const clearUserData = async () => {
    try {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userData');
        await AsyncStorage.removeItem('role');
        console.log('All user data cleared from AsyncStorage');
    } catch (error) {
        console.error('Error clearing data from AsyncStorage: ', error);
    }
};


const testClearData = async () => {
    // Test storing data
    // await setUserData({ name: 'John Doe', role: 'watchman' });
    // await setToken('user-token-123');
    // await setSelectedRole('watchman');

    console.log(await getUserData()); // Should log user data
    console.log(await getToken()); // Should log the token
    console.log(await getSelectedRole()); // Should log the role

    // Now clear the data
    await clearUserData();

    // Check again to ensure data is cleared
    console.log(await getUserData()); // Should log null
    console.log(await getToken()); // Should log null
    console.log(await getSelectedRole()); // Should log null
};

// Call test function
// testClearData();
