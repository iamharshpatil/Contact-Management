// src/api/service.js
import axios from 'axios';

const API_URL = 'https://contact-management-backend-rp6w.onrender.com';

// Example function to get contacts
export const getContacts = async () => {
    try {
        const response = await axios.get(`${API_URL}/contacts`);
        return response.data;
    } catch (error) {
        console.error('Error fetching contacts:', error);
        throw error; // Rethrow the error for further handling
    }
};

// ... other existing code ...