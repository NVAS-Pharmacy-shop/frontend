import React, { useEffect, useState } from 'react';
import { MenuItem, FormControl, Select, InputLabel, TextField, Button, Grid, SelectChangeEvent } from '@mui/material';
import { DatePicker, DateTimePicker, LocalizationProvider, TimePicker, renderTimeViewClock } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import getAllCompanies, { getCompanies, getCompanyEquipment } from '../service/https/company-service';
import Company from '../company/company-component';
import { Equipment } from '../model/company';
import dayjs, { Dayjs } from "dayjs";
import axios from 'axios';
import './add-contract-form.css';
import StaticTimePicker from '@mui/lab/StaticTimePicker';

const companies = ['Company A', 'Company B', 'Company C']; // Sample list of companies

interface equipmentQuantity
{
    equipment_id: number;
    quantity: number;
}


function ContractForm(){
    const [companies, setCompanies] = useState<Company[]>([]);
    const [company, setCompany] = useState<Company | null>(null);
    const [equipment, setEquipment] = useState<Equipment[] | null>(null);
    const [equipmentList, setEquipmentList] = useState<{ equipment_id: number; quantity: number }[]>([]);

    const [quantity, setQuantity] = useState('');
    const [date, setDate] = useState<Date | null>(null);

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try{
            const companies = await getCompanies();
            setCompanies(companies);
            console.log('Companies: ', companies)
        }catch(error) {
            console.error('Error getting equipment: ', error);
        }
    }

    const handleCompanyChange = (event: SelectChangeEvent<number>) => {
        const selectedCompanyId = event.target.value as number; // Assuming company ID is of type number
        const selectedCompany = companies.find(company => company.id === selectedCompanyId);
        if (selectedCompany) {
            setCompany(selectedCompany);
            setEquipment(selectedCompany.equipment);
            console.log("EQUIPMENT: ", selectedCompany.equipment);
        } else {
            setCompany(null);
            setEquipment(null);
        }
    };
    
    
    
    
    const handleQuantityChange = (equipmentId: number, name: string, quantity: number) => {
        setEquipmentList(prevEquipmentList => {
            const updatedEquipmentList = [...prevEquipmentList];
            const index = updatedEquipmentList.findIndex(item => item.equipment_id === equipmentId);
            if (index !== -1) {
                updatedEquipmentList[index].quantity = quantity;
            } else {
                updatedEquipmentList.push({ equipment_id: equipmentId, quantity });
            }
            return updatedEquipmentList;
        });
    };

    const handleDateChange = (date : any) => {
        setDate(date);
        console.log(date);
    };

    const handleSubmit = async () => {
        // Check if all required fields are filled
        if (!company || !date || equipmentList.length === 0) {
            console.error("Missing required fields");
            return;
        }
        
        // Construct the data object
        const requestData = {
            hospital_id: 1, // Assuming `id` is the hospital ID
            date: date, // Convert date to ISO string format if date is not null
            company: company.id, // Convert company ID to string
            

            // Map equipmentList to the desired format
            equipment: equipmentList.map(item => ({
                equipment_id: item.equipment_id,
                quantity: item.quantity
            }))
        };
        console.log(date);
        const response = await axios.post('http://localhost:8008/api/contract/make-contract/', requestData);
        console.log('Contract created:', response.data);

        try {
            // Perform API call to submit the form data
            // Example:
            // const response = await submitFormData(requestData);
            console.log("Form submitted successfully:", requestData);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };
    

    return (
        <div className="add-contract-main-container">
            <form onSubmit={handleSubmit} className='form-add-contract'>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl>
                            <InputLabel id="company-label">Select Company</InputLabel>
                            <Select
                                className="select-company"
                                labelId="company-label"
                                id="company"
                                value={company?.id || ''} 
                                onChange={handleCompanyChange}>
                                {companies && companies.map((company, index) => (
                                    <MenuItem key={index} value={company.id}>
                                        {company.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                    {company && company.equipment.map((eq, index) => (
                        <div key={index} className="equipment-div">
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Equipment Name"
                                    value={eq.name}
                                    InputProps={{ readOnly: true }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    className="quantity-input"
                                    fullWidth
                                    type="number"
                                    label="Quantity"
                                    value={equipmentList.find(item => item.equipment_id === eq.id)?.quantity || ''}
                                    onChange={(e: { target: { value: string; }; }) => handleQuantityChange(eq.id, eq.name, parseInt(e.target.value))}
                                />
                            </Grid>
                        </div>
                    ))}

                    </Grid>
                    <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label="Select Date"
                                value={date}
                                onChange={handleDateChange}
                                disablePast
                                viewRenderers={{
                                    hours: renderTimeViewClock,
                                    minutes: renderTimeViewClock,
                                }}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} justifyContent="center">
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default ContractForm;
