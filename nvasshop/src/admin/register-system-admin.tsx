import React, { useState, useEffect } from 'react';
import './register-form.css';
import axios from 'axios';
import api from '../api';

const RegisterSystemAdmin: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }
    
        const formData = {
            first_name: firstName,
            last_name: lastName,
            email,
            password,
        };
    
        api.post('/auth/registerSystemAdmin/', formData, {
            headers: {
                'Content-Type': 'application/json',
              },
        })
        .then(response => {
            alert('System admin registered successfully!')
            console.log('System admin registered successfully:', response.data);
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        })
        .catch(error => {
            console.error('Failed to register system admin:', error);
            if (error.response && error.response.data && error.response.data.error) {
                alert(error.response.data.error);
            } else {
                alert('An error occurred while registering the sytem admin.');
            }
        });
    };

    return (
        <div className="form-container">
            <h1>Register System Admin</h1>
            <form className="register-form" onSubmit={handleRegister}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="password" id="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                </div>
                <button type="submit" className="submit-button">Register</button>
            </form>
        </div>
    );
};

export default RegisterSystemAdmin;
