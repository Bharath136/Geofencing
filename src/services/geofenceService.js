import apiClient from './api';

export const addGeofenceCoordinates = async (geofence) => {
        return await apiClient.post('/property/add-coordinates', geofence);
};

export const getAllPropertiesByOwner = async (owner_id) => {
        return await apiClient.get(`/property/${owner_id}`);
};

export const getAllProperties = async () => {
        return await apiClient.get('/property');
};


export const getPropertyById = async (id) => {
        return await apiClient.get(`/property/${id}/property`);
}