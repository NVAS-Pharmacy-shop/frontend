import React, { useEffect, useState } from "react";
import { LocalizationProvider, StaticDatePicker, TimePicker, renderTimeViewClock } from "@mui/x-date-pickers";
import { DatePicker, StaticTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Button, InputLabel, MenuItem, Select, Slider, TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import "./add-pickup-schedule.css";
import { createPickupSchedule } from "../../../../service/https/pickup-schedule-service";
import { PickupSchedule, PickupScheduleInput } from "../../../../model/company";
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import { getCompanyAdmins } from "../../../../service/https/company-admin-service";

const AddPickupSchedule = () => {
    const[formData, setFormData] = useState({
        administrator_firstName: '',
        administrator_lastName: '',
        administrator_name: '',
        date: null,
        start_time: dayjs(),
        duration_minutes: 0
    });

    const [error, setError] = useState<string | null>(null);

    const [admins, setAdmins] = useState<any[] | null>(null);
    const [selectedOption, setSelectedOption] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        fetchAdmins();
    }, []);

    useEffect(() => {
    }
    , [selectedOption]);
    
    const handleSpecialChange = (name: any, value: any) => {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
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

    const fetchAdmins = async() => {
        try{
            const admins = await getCompanyAdmins();
            setAdmins(admins);
        } catch(error) {
            console.error('Error getting admins: ', error);
        }
    }

    const handleSelectChange = (event : any) => {
        setSelectedOption(event.target.value);
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const parts = selectedOption.split(' ');
            const pickupScheduleData: PickupScheduleInput = {
                date: formData.date ? (formData.date as dayjs.Dayjs).format('YYYY-MM-DD') : null,
                start_time: formData.start_time ? formData.start_time.format('HH:mm') : '',
                duration_minutes: formData.duration_minutes,
                first_name: parts[0],
                last_name: parts[1]
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
                <InputLabel id="select-label">Select admin</InputLabel>
                <Select
                    id="select"
                    className="select-admin"
                    value={selectedOption}
                    onChange={handleSelectChange}
                    labelId="select-label" // Associate this with the InputLabel
                    aria-label="Select admin" // ARIA label for accessibility
                >
                    {admins && admins.map((admin) => (
                        <MenuItem key={admin.id} value={admin.first_name + ' ' +admin.last_name}>
                            {admin.first_name} {admin.last_name}
                        </MenuItem>
                    ))}
                </Select>
            
                <div className = "pickeri">
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="'en-us'">
                        <DatePicker 
                        className="date-picker-pickup-schedule"
                        defaultValue={dayjs()} 
                        onChange={handleDateChange}
                        disablePast/>
                    </LocalizationProvider>
                    
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="'en-us'">
                        <TimePicker 
                        defaultValue={dayjs()} 
                        className="date-picker-pickup-schedule"
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