import axios from 'axios';

const API_URL = 'https://contact-management-backend-rp6w.onrender.com';

// Example function to get contacts
export const getContacts = async () => {
    const response = await axios.get(`${API_URL}/contacts`);
    return response.data;
};

// ... other existing code ...
