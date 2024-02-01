import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'
import useAxios from '../utils/useAxios'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { ReservationService, Reservation } from '../service/https/reservation-service';

import styles from './form.module.css';

const UserReservations = () => {
   let { user, logoutUser } = useContext(AuthContext);
   
   const [reservations, setReservations] = useState<Reservation[]>([]);

   useEffect(() => {
    fetchReservations();
    }, []);

    const handleCancelReservation = (reservationId: number, date: string) => {
      // Implement cancellation logic here, for example, send a request to the backend
      const penal = calculatePenals(date);
      const result = window.confirm(`Think again, you will get ${penal} penals?`);
      if (result) {
        // User clicked 'OK' or 'Yes'
        cancelReservation(reservationId);
        
        } else {
        // User clicked 'Cancel' or 'No'
        console.log("User clicked No");
        }
      console.log(`Cancel reservation with ID ${reservationId}`);
    };

    const calculatePenals = (date: string) => {
        const today = new Date();
        const inputDate = new Date(date);

        const timeDiff = Math.abs(today.getTime() - inputDate.getTime());
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        
        if(daysDiff <= 1){
            return 2;
        }
        return 1;
    }

    const cancelReservation = async (reservationId: number) => {
        try {
            await ReservationService.cancelReservation(reservationId);
            setReservations(prevReservations => prevReservations.filter(res => res.reservation_id !== reservationId))
        } catch (error) {
            console.log("Error fetching reservations data.", error);
        }
    }

    const fetchReservations = async () => {
        try {
            const userReservations : Reservation[] = await ReservationService.getReservtionsForUser(user.user_id);
            console.log(userReservations)
            setReservations(userReservations);
        } catch (error) {
            console.log("Error fetching reservations data.", error);
        }
    };

    return (
      <TableContainer className={styles.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Cancel</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map((reservation: Reservation) => (
              <TableRow>
                <TableCell>{reservation.user_first_name}</TableCell>
                <TableCell>{reservation.user_last_name}</TableCell>
                <TableCell>{reservation.date}</TableCell>
                <TableCell>{reservation.start_time}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{backgroundColor: '#c92a2a'}}
                    onClick={() => handleCancelReservation(reservation.reservation_id, reservation.date!)}
                  >
                    Cancel Reservation
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>);

}

export default UserReservations