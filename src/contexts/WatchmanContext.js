import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import * as Location from 'expo-location'; // Import expo-location
import { updateWatchmanLocation } from '../services/watchmanService';
import { getUserData } from '../utils/cookieUtils';
import { postErrorHandler } from '../components/ErrorHandler';

const WatchmanContext = createContext();

export const WatchmanProvider = ({ children }) => {
    const [location, setLocation] = useState(null);
    const [user, setUser] = useState(null);
    const [locationError, setLocationError] = useState(null);

    // Function to get the current location
    const getCurrentLocation = useCallback(async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setLocationError('Permission to access location was denied');
                return;
            }

            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
            });

            const { latitude, longitude } = location.coords;
            setLocation({ latitude, longitude });
            setLocationError(null); // Clear any previous error
        } catch (error) {
            console.error('Error getting location:', error);
            setLocationError(error.message); // Set the error message
        }
    }, []);

    // Function to update the location to the server
    const updateLocation = useCallback(async () => {
        if (user?.role === 'watchman' && location) {
            try {
                await updateWatchmanLocation(user.id, location);
                console.log('Location updated:', location);
            } catch (error) {
                postErrorHandler(error)
            }
        }
    }, [user, location]);

    // Fetch user data on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await getUserData();
            setUser(userData);
        };
        fetchUserData();
    }, []);

    // Get the initial location and set interval to update it
    useEffect(() => {
        if (user) {
            const intervalId = setInterval(async () => {
                await getCurrentLocation();
                await updateLocation();
            }, 5000);

            // Clear interval on unmount
            return () => clearInterval(intervalId);
        }
    }, [user, getCurrentLocation, updateLocation]);

    return (
        <WatchmanContext.Provider value={{ location, locationError, user }}>
            {children}
        </WatchmanContext.Provider>
    );
};

export const useWatchman = () => useContext(WatchmanContext);
