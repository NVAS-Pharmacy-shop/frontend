import React, { useState } from "react";
import { LocalizationProvider, StaticDatePicker, TimePicker, renderTimeViewClock } from "@mui/x-date-pickers";
import { DatePicker, StaticTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Button, Slider, TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import "./add-pickup-schedule.css";
import { createPickupSchedule } from "../../../../service/https/pickup-schedule-service";
import { PickupSchedule, PickupScheduleInput } from "../../../../model/company";
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';

const AddPickupSchedule = () => {
    const[formData, setFormData] = useState({
        administrator_firstName: '',
        administrator_lastName: '',
        date: null,
        start_time: dayjs(),
        duration_minutes: 0
    });
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    
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
        time.set("second", 0);
        handleSpecialChange("start_time", time);
    };

    const handleSliderChange = (event : any, value : any) => {
        handleSpecialChange("duration_minutes", value);
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const pickupScheduleData: PickupScheduleInput = {
                date: formData.date ? (formData.date as dayjs.Dayjs).format('YYYY-MM-DD') : null,
                start_time: formData.start_time ? formData.start_time.format('HH:mm') : '',
                duration_minutes: formData.duration_minutes,
                first_name: formData.administrator_firstName,
                last_name: formData.administrator_lastName
            };
            await createPickupSchedule(pickupScheduleData);
            navigate("/admin/work-calendar/")
        } catch (error) {
            setError("An error occurred: ");
        }
    };

    return(
        <div className="form-container">
            <form className="form-class" onSubmit={handleSubmit}>
                <TextField name="administrator_firstName" label="First name" className="add-schedule-input"
                variant="standard" value={formData.administrator_firstName} onChange={handleChange} required />
                <TextField name="administrator_lastName" label="Last name"  required className="add-schedule-input"
                variant="standard" value={formData.administrator_lastName} onChange={handleChange}/>

                <div className = "pickeri">
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="'en-us'">
                        <DatePicker 
                        defaultValue={dayjs()} 
                        onChange={handleDateChange}
                        disablePast/>
                    </LocalizationProvider>
                    
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="'en-us'">
                        <TimePicker 
                        defaultValue={dayjs()} 
                        value={formData.start_time} 
                        onChange={handleTimeChange}
                        viewRenderers={{
                            hours: renderTimeViewClock,
                            minutes: renderTimeViewClock
                        }}
                        />
                    </LocalizationProvider>
                </div>
                
                Duration:
                <Slider
                defaultValue={50} 
                aria-label="Default" 
                valueLabelDisplay="auto" 
                value={formData.duration_minutes} 
                onChange={handleSliderChange}
                className="duration-slider"
                max={200}
                min={5}
                step={5}/>
            
                <Button variant="contained" type="submit">Submit</Button>
            </form>
            {error && <OverlappingAlert />}
        </div>
        
    );
}

function OverlappingAlert() {
    return (
      <Alert severity="error">You cannot be schedule due to schedule overlapping!</Alert>
    )
}

export default AddPickupSchedule;