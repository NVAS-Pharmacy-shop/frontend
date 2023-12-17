import React, { useState } from "react";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { DatePicker, StaticTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Button, Slider, TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import "./add-pickup-schedule.css";
import { createPickupSchedule } from "../../../service/https/pickup-schedule-service";
import { PickupSchedule } from "../../../model/company";

const AddPickupSchedule = () => {
    const[formData, setFormData] = useState({
        administrator_firstName: '',
        administrator_lastName: '',
        date: null,
        start_time: dayjs(),
        duration_minutes: 0
    });
    
    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({...prevData, [name]: value}));
        console.log(formData);
    };

    const handleSpecialChange = (name: any, value: any) => {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        console.log(formData);
    };
    
    const handleDateChange = (date : any) => {
        handleSpecialChange("date", date);
    };

    const handleTimeChange = (time : any) => {
        handleSpecialChange("start_time", time);
    };

    const handleSliderChange = (event : any, value : any) => {
        handleSpecialChange("duration_minutes", value);
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const pickupScheduleData: PickupSchedule = {
                id: 0, 
                company: 0, 
                administrator_firstName: formData.administrator_firstName,
                administrator_lastName: formData.administrator_lastName,
                date: formData.date ? (formData.date as dayjs.Dayjs).format('YYYY-MM-DD') : null,
                start_time: formData.start_time ? formData.start_time.format('HH:mm:ss') : '',
                duration_minutes: formData.duration_minutes,
            };
            await createPickupSchedule(pickupScheduleData);
        } catch (error) {
        }
    };
    



    return(
        <div className="form-container">
            <form className="form-class" onSubmit={handleSubmit}>
                <TextField name="administrator_firstName" label="First name" 
                variant="standard" value={formData.administrator_firstName} onChange={handleChange} required />
                <TextField name="administrator_lastName" label="Last name"  required
                variant="standard" value={formData.administrator_lastName} onChange={handleChange}/>

                <div className = "pickeri">
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="'en-us'">
                        <StaticDatePicker defaultValue={dayjs()} onChange={handleDateChange}/>
                    </LocalizationProvider>
                    
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="'en-us'">
                        <StaticTimePicker defaultValue={dayjs()} value={formData.start_time} onChange={handleTimeChange}/>
                    </LocalizationProvider>
                </div>
                
                Duration:
                <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" value={formData.duration_minutes} onChange={handleSliderChange}/>
            
                <Button variant="contained" type="submit">Submit</Button>
            </form>
        </div>
        
    );
}

export default AddPickupSchedule;