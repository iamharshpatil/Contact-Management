// src/App.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ContactForm from './components/ContactForm';
import ContactsTable from './components/ContactsTable';
import { Container, Typography } from '@mui/material';
import './index.css';

const App = () => {
    const [contacts, setContacts] = useState([]);
    const [editContact, setEditContact] = useState(null);

    // Fetch contacts from the backend
    const fetchContacts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/contacts');
            setContacts(response.data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    // Add a new contact
    const addContact = async (newContact) => {
        try {
            const response = await axios.post('http://localhost:5000/contacts', newContact);
            setContacts([...contacts, response.data]);
        } catch (error) {
            console.error('Error adding contact:', error);
        }
    };

    // Delete a contact
    const deleteContact = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/contacts/${id}`);
            setContacts(contacts.filter(contact => contact._id !== id));
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };

    // Update a contact
    const editContactHandler = async (id, updatedContact) => {
        try {
            const response = await axios.put(`http://localhost:5000/contacts/${id}`, updatedContact);
            setContacts(contacts.map(contact => (contact._id === id ? response.data : contact)));
            setEditContact(null); // Reset edit contact
        } catch (error) {
            console.error('Error updating contact:', error);
        }
    };

    // Fetch contacts when the component mounts
    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Contact Management
            </Typography>
            <ContactForm onAddContact={addContact} onEditContact={editContactHandler} editContact={editContact} />
            <ContactsTable contacts={contacts} onEdit={setEditContact} onDelete={deleteContact} />
        </Container>
    );
};

export default App;