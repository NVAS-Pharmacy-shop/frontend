import React, {Component, useState, useEffect} from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import './company-overview.css';

interface Company {
    id: number;
    name: string;
    address: string;
    description: string;
    email: string;
    website: string;
    rate: number;
    equipment: Equipment[];
}
interface Equipment {
    name: string;
    description: string;
    quantity: number;
}

function Company() {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk5Nzk1MzA0LCJpYXQiOjE2OTk3MDg5MDQsImp0aSI6ImMwMTQ0YjJhMDBmMjQ3ZjBiMzRhY2ZlNzUwZjAyYmE5IiwidXNlcl9pZCI6MiwiZW1haWwiOiJ1c2VyMUB0ZXN0LmNvbSIsInJvbGUiOiJjb21wYW55X2FkbWluIn0.wqbr3Yqz4J4JKYFbCgHTP6tRXTzaJCOz_UffiHXS3OY'
    const {id} = useParams();
    const [company, setCompany] = useState<Company | null>(null);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/company/${id}`,{
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        })
            .then(response => {
                setCompany(response.data.company);
            })
            .catch(error => {
                console.error('Error fetching company', error);
            });
    }, [id]);
    if (!company) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <div className="company-info">
                <h2>Company Information</h2>
                <p><strong>Name:</strong> {company.name}</p>
                <p><strong>Address:</strong> {company.address}</p>
                <p><strong>Description:</strong> {company.description}</p>
                <h3>Equipment List</h3>
                <table className="equipment-table">
                    <thead>
                        <tr className="equipment-header">
                            <th>Name</th>
                            <th>Description</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {company.equipment.map((equipmentItem, index) => (
                            <tr key={index} className="equipment-item">
                                <td>{equipmentItem.name}</td>
                                <td>{equipmentItem.description}</td>
                                <td>{equipmentItem.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="average-rating">
                    <p><strong>Average Rating:</strong> {company.rate}</p>
                </div>
            </div>
        </div>
    )
}
export default Company;
