import apiClient from "./api";

// Function to fetch a single user by ID
export const getUserById = async (userId) => {
    return await apiClient.get(`/auth/${userId}`);
};

// Function to register a user
export const registerUser = async (email) => {
    return await apiClient.post('/auth/register', {email});
};


// Function to verify OTP
export const verifyOtp = async (email, otp) => {
    return await apiClient.post('/auth/verify-otp', { identifier:email, otp });
};


// Function to log in a user
export const loginUser = async (email, role) => {
    return await apiClient.post('/auth/login-email', { email, role });
};


export const verifyLoginOtp = async (email, otp) => {
    return await apiClient.post('/auth/verify-login', { email, otp });
};
