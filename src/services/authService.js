import axios from "axios";
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
    // console.log("http://192.168.0.101:5000/api/v1/auth/login-email", email, role)
    // return await axios.post('http://192.168.0.101:5000/api/v1/auth/login-email', {email})
    return await apiClient.post('/auth/login-email', { email, role });
};


export const verifyLoginOtp = async (email, otp) => {
    return await apiClient.post('/auth/verify-login', { email, otp });
};
