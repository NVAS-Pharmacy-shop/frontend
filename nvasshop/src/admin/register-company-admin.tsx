import React, { useState, useEffect } from 'react';
import './register-company.css';
import axios from 'axios';

interface Company {
    id: number;
    name: string;
}

const RegisterCompanyAdmin: React.FC = () => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedCompany, setSelectedCompany] = useState<number | null>(null);

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/company/base_info/');
            setCompanies(response.data.companies);
        } catch (error) {
            console.error('Failed to fetch companies:', error);
        }
    };

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
            company: selectedCompany,
        };
    
        axios.post('http://127.0.0.1:8000/api/auth/registerCompanyAdmin/', formData)
        .then(response => {
            alert('Company admin registered successfully!')
            console.log('Company admin registered successfully:', response.data);
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setSelectedCompany(null);
        })
        .catch(error => {
            console.error('Failed to register company admin:', error);
            if (error.response && error.response.data && error.response.data.error) {
                alert(error.response.data.error);
            } else {
                alert('An error occurred while registering the company admin.');
            }
        });
    };

    return (
        <div className="form-container">
            <h1>Register Company Admin</h1>
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
                <div className="form-group">
                    <label htmlFor="company">Company:</label>
                    <select id="company" value={selectedCompany || ''} onChange={e => setSelectedCompany(Number(e.target.value))} required>
                        <option value="">Select a company</option>
                        {companies.map(company => (
                            <option key={company.id} value={company.id}>{company.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="submit-button">Register</button>
            </form>
        </div>
    );
};

export default RegisterCompanyAdmin;
