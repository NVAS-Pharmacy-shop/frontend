import React, { useState } from 'react';
import './register-form.css';
import axios from 'axios';

const RegisterCompany = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (name && address && description && email && website) {
        const newCompany = {
            name,
            address,
            description,
            email,
            website,
        };

        axios.post('http://127.0.0.1:8000/api/company/', newCompany)
            .then((response) => {
                alert('Company registered successfully!');
            })
            .catch((error) => {
                alert('An error occurred while registering the company.');
                console.error(error);
            });
    } else {
        alert('Please fill in all fields');
    }
};

  return (
    <div className="form-container">
        <h1>Register Company</h1>
        <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="form-group">
                <label>Address:</label>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </div>
            <div className="form-group">
                <label>Description:</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <div className="form-group">
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
                <label>Website:</label>
                <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} required />
            </div>
            <button type="submit" className="submit-button">Submit</button>
        </form>
    </div>
  );
};

export default RegisterCompany;
