import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import api from '../api';
import './equipment-browser.css';
import { useParams } from 'react-router-dom';
import { getCompanyId } from "../service/https/company-admin-service";
import AuthContext from "../context/AuthContext";

const equipmentTypeMapping: { [key: number]: string } = {
    1: 'Diagnostic Equipment',
    2: 'Monitoring Equipment',
    3: 'Surgical Equipment',
    4: 'Laboratory Equipment',
    5: 'Patient Care Equipment',
    6: 'Orthopedic Equipment',
};

interface Equipment {
    id: number;
    name: string;
    description: string;
    quantity: number;
    company: number;
    type: number;
}

interface Company {
    id: number;
    name: string;
    address: string;
    description: string;
    email: string;
    website: string;
    rate: number;
}

const EquipmentBrowser = () => {
    const { user } = useContext(AuthContext);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [userCompanyId, setUserCompanyId] = useState<string | null>(null);
    const [filters, setFilters] = useState({
        company_id: userCompanyId || '',
        name_substring: '',
        type: '',
        company_rating: ''
    });
    const [equipment, setEquipment] = useState<Equipment[]>([]);
    const [companies, setCompanies] = useState<{ [id: string]: Company }>({});
    const [shouldFetch, setShouldFetch] = useState(false);

    useEffect(() => {
        if (user && user.role === 'company_admin') {
            getCompanyId().then(({ company_id }) => {
                setUserCompanyId(company_id.toString());
                setShouldFetch(true);
            });
        } else {
            setShouldFetch(true);
        }
    }, [user]);

    useEffect(() => {
        setFilters(prevFilters => ({
            ...prevFilters,
            company_id: userCompanyId || '',
        }));
    }, [userCompanyId]);

    useEffect(() => {
        if (shouldFetch) {
            fetchEquipment();
            setShouldFetch(false);
        }
    }, [shouldFetch]);

    const fetchCompany = async (id: string) => {
        if (companies[id]) {
            return;
        }
        try {
            const response = await api.get(`/company/base_info/${id}`);
            setCompanies((prevCompanies) => ({ ...prevCompanies, [id]: response.data.company }));
        } catch (error) {
            console.error('Error fetching company:', error);
        }
    };

    const fetchEquipment = async () => {
        try {
            const nonEmptyFilters = Object.fromEntries(
                Object.entries(filters).filter(([key, value]) => value !== '')
            );
            const response = await api.get('/company/equipment/', { params: nonEmptyFilters });
            setEquipment(response.data.equipment);
            const uniqueCompanyIds = new Set<string>(response.data.equipment.map((item: Equipment) => item.company.toString()));
            uniqueCompanyIds.forEach((id: string) => fetchCompany(id));

        } catch (error) {
            console.error('Error fetching equipment:', error);
        }
    };

    const resetFilters = () => {
        setFilters({
            company_id: userCompanyId || '',
            name_substring: '',
            type: '',
            company_rating: ''
        });
        setShouldFetch(true); // Set the trigger to fetch equipment
    };

    const handleFilterChange = <T extends HTMLInputElement | HTMLSelectElement>(event: React.ChangeEvent<T>) => {
        const { name, value } = event.target;
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    };

    return (
        <div className="equipment-browser">
            <h1>Equipment Browser</h1>
            <div className="form-group">
                <label htmlFor="name_substring">Name:</label>
                <input type="text" name="name_substring" value={filters.name_substring} onChange={handleFilterChange} className="form-control" />
            </div>
            <div className="form-group">
                <label htmlFor="type">Type:</label>
                <select name="type" value={filters.type} onChange={handleFilterChange} className="form-control">
                    <option value="">All</option>
                    <option value="1">Diagnostic Equipment</option>
                    <option value="2">Monitoring Equipment</option>
                    <option value="3">Surgical Equipment</option>
                    <option value="4">Laboratory Equipment</option>
                    <option value="5">Patient Care Equipment</option>
                    <option value="6">Orthopedic Equipment</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="company_rating">Minimal company rating:</label>
                <input type="number" name="company_rating" value={filters.company_rating} onChange={handleFilterChange} className="form-control" />
            </div>
            <div className='filters-div'>
                <button onClick={resetFilters} className="filters-button">Reset Filters</button>
                <button onClick={fetchEquipment} className="filters-button">Apply Filters</button>
            </div>

            <ul className="equipment-list equipment-grid">
                {equipment.map((item) => (
                    <li key={item.id} className="equipment-item">
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <p>Type: {equipmentTypeMapping[item.type]}</p>
                        {companies[item.company.toString()] && (
                            <>
                                <p>Company name: {companies[item.company.toString()].name}</p>
                                <p>Company rating: {companies[item.company.toString()].rate}</p>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EquipmentBrowser;
