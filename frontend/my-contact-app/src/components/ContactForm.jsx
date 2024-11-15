// src/components/ContactForm.jsx
import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Paper } from '@mui/material';

const ContactForm = ({ onAddContact, onEditContact, editContact }) => {
    const [contact, setContact] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        jobTitle: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (editContact) {
            setContact(editContact);
        } else {
            setContact({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                company: '',
                jobTitle: ''
            });
        }
    }, [editContact]);

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePhone = (phone) => {
        const re = /^[0-9]*$/; // Only numbers
        return re.test(String(phone)) && phone.length >= 10; // Check for numeric and length
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        // Validate required fields
        if (!contact.firstName) newErrors.firstName = 'First Name is required.';
        if (!contact.lastName) newErrors.lastName = 'Last Name is required.';
        if (!contact.email) {
            newErrors.email = 'Email is required.';
        } else if (!validateEmail(contact.email)) {
            newErrors.email = 'Email is not valid.';
        }
        if (!contact.phone) {
            newErrors.phone = 'Phone Number is required.';
        } else if (!validatePhone(contact.phone)) {
            newErrors.phone = 'Phone Number must be numeric and at least 10 digits long.';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        if (editContact) {
            onEditContact(contact._id, contact); // Call the edit function
        } else {
            onAddContact(contact); // Call the add function
        }
        setContact({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            company: '',
            jobTitle: ''
        });
        setErrors({}); // Clear errors
    };

    return (
        <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="firstName"
                            label="First Name"
                            value={contact.firstName}
                            onChange={handleChange}
                            required
                            fullWidth
                            error={!!errors.firstName}
                            helperText={errors.firstName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="lastName"
                            label="Last Name"
                            value={contact.lastName}
                            onChange={handleChange}
                            required
                            fullWidth
                            error={!!errors.lastName}
                            helperText={errors.lastName}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="email"
                            label="Email"
                            value={contact.email}
                            onChange={handleChange}
                            required
                            fullWidth
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="phone"
                            label="Phone Number"
                            value={contact.phone}
                            onChange={handleChange}
                            required
                            fullWidth
                            error={!!errors.phone}
                            helperText={errors.phone}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="company"
                            label="Company"
                            value={contact.company}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="jobTitle"
                            label="Job Title"
                            value={contact.jobTitle}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            {editContact ? 'Update Contact' : 'Add Contact'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default ContactForm;