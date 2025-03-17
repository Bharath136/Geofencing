import apiClient from './api';

export const getLands = async (geofence) => {
    return await apiClient.post('/land/my-lands', geofence);
};
