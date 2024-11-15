// backend/routes/contactRoutes.js
const express = require('express');
const Contact = require('../models/contactModel');
const router = express.Router();

// Create a new contact
router.post('/contacts', async (req, res) => {
    const { firstName, lastName, email, phone, company, jobTitle } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone) {
        return res.status(400).json({ error: 'First Name, Last Name, Email, and Phone are required.' });
    }

    try {
        const contact = new Contact(req.body);
        await contact.save();
        res.status(201).json(contact);
    } catch (error) {
        if (error.code === 11000) {
            // Duplicate email error
            return res.status(400).json({ error: 'Email already exists.' });
        }
        res.status(500).json({ error: 'Failed to create contact.' });
    }
});

// Get all contacts
router.get('/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve contacts.' });
    }
});

// Update a contact
router.put('/contacts/:id', async (req, res) => {
    const { firstName, lastName, email, phone, company, jobTitle } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone) {
        return res.status(400).json({ error: 'First Name, Last Name, Email, and Phone are required.' });
    }

    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!contact) return res.status(404).json({ error: 'Contact not found.' });
        res.json(contact);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update contact.' });
    }
});

// Delete a contact
router.delete('/contacts/:id', async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) return res.status(404).json({ error: 'Contact not found.' });
        res.json(contact);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete contact.' });
    }
});

module.exports = router;