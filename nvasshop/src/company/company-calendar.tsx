// CompanyCalendar.jsx
import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    Paper,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
} from '@mui/material';
import 'react-calendar/dist/Calendar.css';
import { Calendar } from 'react-calendar';
import dayjs from 'dayjs';
import './company-calendar.css';
import { ReservationService, Reservation } from '../service/https/reservation-service';

const CompanyCalendar: React.FC = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedOption, setSelectedOption] = useState<string>('month'); // Default option is 'month'

    useEffect(() => {
        fetchReservations();
    }, []);

    useEffect(() => {
        fetchReservations();
    }, [selectedDate, selectedOption]);

    const handleDayClick = (date: Date) => {
        setSelectedDate(date);
    };

    const handleOptionChange = (event: SelectChangeEvent<string>) => {
        const option = event.target.value as string;
        setSelectedOption(option);
    };

    const fetchReservations = async () => {
        try {
            const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');
            const reservations = await ReservationService.getReservations(formattedDate, selectedOption);
            setReservations(reservations);
        } catch (error) {
            console.log("Error fetching reservations data.", error);
        }
    };

    const handleFetchButtonClick = () => {
        fetchReservations();
    };

    return (
        <Container className="container">
            <h2 className='title'>
                Company Calendar
            </h2>

            {/* Calendar */}
            <Paper className="work-calendar-paper" variant="elevation">
                <Calendar
                    className="work-calendar"
                    value={selectedDate}
                    onClickDay={handleDayClick}
                    tileContent={({ date }) => {
                        const dateReservations = reservations.filter((reservation) => {
                            if (reservation.date !== undefined && reservation.date !== null) {
                                return new Date(reservation.date).toDateString() === date.toDateString();
                            }
                            return false;
                        });

                        return dateReservations.map((reservation, index) => (
                            <div key={index}>
                                <Typography variant="body2">
                                    {reservation.start_time} - {reservation.end_time}
                                </Typography>
                                <Typography variant="body2">
                                    {(reservation.user_first_name !== "Open" || reservation.user_last_name !== "appointment") ?
                                        `Reservant: ${reservation.user_first_name} ${reservation.user_last_name}` :
                                        `${reservation.user_first_name} ${reservation.user_last_name}`
                                    }
                                </Typography>
                            </div>
                        ));
                    }}
                />
            </Paper>

            <div className="select-fetch-container">
                <InputLabel id="option-label">Fetch for: </InputLabel>
                <FormControl>
                    <Select className='select' labelId="option-label" id="option-select" value={selectedOption} onChange={handleOptionChange}>
                        <MenuItem value="week">Week</MenuItem>
                        <MenuItem value="month">Month</MenuItem>
                        <MenuItem value="year">Year</MenuItem>
                    </Select>
                </FormControl>

            </div>

        </Container>
    );
};

export default CompanyCalendar;
