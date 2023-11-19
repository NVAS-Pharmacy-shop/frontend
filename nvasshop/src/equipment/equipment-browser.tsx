import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './equipment-browser.css';
import { useParams } from 'react-router-dom';

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
    comapny: number;
    type: number;
}

const EquipmentBrowser = () => {
    const { companyId } = useParams<{ companyId?: string }>();
    const [filters, setFilters] = useState({
        company_id: companyId || '',
        name_substring: '',
        type: '',
    });
    const [equipment, setEquipment] = useState<Equipment[]>([]);

    useEffect(() => {
        fetchEquipment();
    }, []);

    const fetchEquipment = async () => {
        try {
            const nonEmptyFilters = Object.fromEntries(
                Object.entries(filters).filter(([key, value]) => value !== '')
            );
            const response = await axios.get('http://127.0.0.1:8000//api/company/equipment/', { params: nonEmptyFilters });
            setEquipment(response.data.equipment);
        } catch (error) {
            console.error('Error fetching equipment:', error);
        }
    };

    const handleFilterChange = <T extends HTMLInputElement | HTMLSelectElement>(event: React.ChangeEvent<T>) => {
        const { name, value } = event.target;
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    };

    return (
        <div className="equipment-browser">
            <h1>Equipment Browser</h1>
            <div className="form-group">
                <label htmlFor="name_substring">Name Substring:</label>
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
            <button onClick={fetchEquipment} className="apply-filters">Apply Filters</button>
            <ul className="equipment-list equipment-grid">
                {equipment.map((item) => (
                    <li key={item.id} className="equipment-item">
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <p>Type: {equipmentTypeMapping[item.type]}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EquipmentBrowser;
