import React, { useEffect, useState } from "react";
import { EquipmentReservation, Reservation, ReservedEquipment } from "../../../service/https/reservation-service";
import { ReservationService } from "../../../service/https/reservation-service";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Calendar from "react-calendar";
import Tooltip from '@mui/material/Tooltip';
import "./equipment-delivering-calendar.css";

const EquipmentDeliveringCalendar = () => {
    const[reservations, setReservations] = useState<EquipmentReservation[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showPopup, setShowPopup] = useState(false);
    
    useEffect(() => {
        fetchReservations();
    }, [])

    const fetchReservations = async () => {
        try{
            const reservations = await ReservationService.getEquipmentReservations();
            setReservations(reservations);
            console.log(reservations);
        }catch(error){
            console.log("Error fetching reservations", error);
        }
    }

    const handleClickDay = (value : any) => {
        setSelectedDate(value);
        setShowPopup(true);
    }

    const handlePickingUp = (reservationId: number, equipment: ReservedEquipment[]) => {
        ReservationService.pickupReservation(reservationId, equipment);
        fetchReservations();
    }
    const tileDisabled = ({ date, view }: { date: Date; view: string }) => {
        const today = new Date();
        today.setDate(today.getDate() - 1);
        return date <  today;
    };
    return(
        <div className = "equipment-delivering-calendar-main">
            <Paper className="reservation-calendar-paper" variant="elevation">
                <Calendar
                className="reservation-calendar"
                value={selectedDate}
                onClickDay={handleClickDay}
                tileDisabled={tileDisabled}
                tileContent={({ date }) => {
                    const dateReservations = reservations.filter((term) => {
                    if (term.date !== undefined && term.date !== null) {
                        return (
                        new Date(term.date).toDateString() === date.toDateString()
                        );
                    }
                    return false;
                    });
                    return dateReservations.map((term) => (
                    <div key={term.reservation_id}>
                        <Typography variant="body2">
                        {term.user_first_name} {term.user_last_name}
                        </Typography>
                    </div>
                    ));
                }}
                />
            </Paper>
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Reservations for {selectedDate.toLocaleDateString()}</h2>
                        <TableContainer component={Paper} className="reservation-table">
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Reservation ID</TableCell>
                                        <TableCell>User Email</TableCell>
                                        <TableCell>User First Name</TableCell>
                                        <TableCell>User Last Name</TableCell>
                                        <TableCell>Equipment Name</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>Deliver Confirmation</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {reservations
                                        .filter(reservation => new Date(reservation.date).toLocaleDateString() === selectedDate.toLocaleDateString())
                                        .map((reservation, reservationIndex) => (
                                            reservation.equipment.map((equipment, equipmentIndex) => (
                                                <TableRow key={`${reservation.reservation_id}-${equipmentIndex}`}>
                                                    {equipmentIndex === 0 && (
                                                        <>
                                                            <TableCell rowSpan={reservation.equipment.length}>
                                                                {reservation.reservation_id}
                                                            </TableCell>
                                                            <TableCell rowSpan={reservation.equipment.length}>
                                                                {reservation.user_email}
                                                            </TableCell>
                                                            <TableCell rowSpan={reservation.equipment.length}>
                                                                {reservation.user_first_name}
                                                            </TableCell>
                                                            <TableCell rowSpan={reservation.equipment.length}>
                                                                {reservation.user_last_name}
                                                            </TableCell>
                                                        </>
                                                    )}
                                                    <TableCell>{equipment.equipment_name}</TableCell>
                                                    <TableCell>{equipment.quantity}</TableCell>
                                                    {equipmentIndex === 0 && (
                                                        <TableCell rowSpan={reservation.equipment.length}>
                                                            {reservation.status === 'pending' ? (
                                                                <Tooltip title="Click to confirm pickup">
                                                                    <Button variant="contained" onClick={() => handlePickingUp(reservation.reservation_id, reservation.equipment)}>Confirm</Button>
                                                                </Tooltip>
                                                            ) : (
                                                                <Tooltip title="Reservation is already picked up">
                                                                    <Button variant="contained" disabled>Picked Up</Button>
                                                                </Tooltip>
                                                            )}
                                                        </TableCell>
                                                    )}
                                                </TableRow>
                                            ))
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Button variant="outlined" color="error" onClick={() => setShowPopup(false)}>Close</Button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default EquipmentDeliveringCalendar;