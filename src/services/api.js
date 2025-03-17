import axios from 'axios';
import { API_BASE_URL, getToken } from '../utils/cookieUtils';

const token = getToken()

export const apiStatusConstants = {
    INITIAL: 'INITIAL',
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE',
    IN_PROGRESS: 'IN_PROGRESS',
};

export const apiClientJson = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const apiClientForm = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'content-type': 'multipart/form-data' }
});

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    }
});

export default apiClient;
