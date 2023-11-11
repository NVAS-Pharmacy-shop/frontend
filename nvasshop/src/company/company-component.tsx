import React, {Component, useState, useEffect} from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";


interface Company {
    id: number;
    name: string;
    address: string;
    email: string;
    website: string;
    rate: number;
    equipment: [];
}

function Company() {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk5Nzk1MzA0LCJpYXQiOjE2OTk3MDg5MDQsImp0aSI6ImMwMTQ0YjJhMDBmMjQ3ZjBiMzRhY2ZlNzUwZjAyYmE5IiwidXNlcl9pZCI6MiwiZW1haWwiOiJ1c2VyMUB0ZXN0LmNvbSIsInJvbGUiOiJjb21wYW55X2FkbWluIn0.wqbr3Yqz4J4JKYFbCgHTP6tRXTzaJCOz_UffiHXS3OY'
    const {id} = useParams();
    console.log('ID:', id);
    const [company, setCompany] = useState<Company | null>(null);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/company/${id}`,{
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        })
            .then(response => {
                setCompany(response.data.company);
                console.log(company);
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

                <h2>Equipment List</h2>
                <ul className="equipment-list">
                </ul>

                <div className="average-rating">
                    <p><strong>Average Rating:</strong> {company.rate}</p>
                </div>
            </div>
        </div>
    )
}
export default Company;
