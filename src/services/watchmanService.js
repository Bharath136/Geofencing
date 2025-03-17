import apiClient from './api';

// Function to log in a user
export const loginUser = async (email) => {
    return await apiClient.post('/watchman/login-email', { email });
};


export const verifyLoginOtp = async (email, otp) => {
    return await apiClient.post('/watchman/verify-login', { email, otp });
};


export const createWatchman = async (data) => {
    return await apiClient.post('/watchman', data);
};


export const verifyWatchmanOtp = async (data) => {
    return await apiClient.post('/watchman/verify-email', data);
};


export const getWatchmanById = async (id) => {
    return await apiClient.get(`/watchman/${id}`);
};


export const updateWatchmanLocation = async (id, location) => {
    return await apiClient.put(`/watchman/${id}/location`, location);
};


export const getWatchmanByOwnerId = async (id) => {
    return await apiClient.get(`/watchman/my-watchmans/${id}`);
};


export const deleteWatchman = async (id) => {
    return await apiClient.delete(`/watchman/${id}`);
};
