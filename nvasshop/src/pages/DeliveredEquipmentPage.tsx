import { Grid, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { EquipmentReservation } from "../service/https/reservation-service";
import api from "../api";

const getDeliveredEquipment = async(): Promise<EquipmentReservation[]> => {
    try{
        const response = await api.get(`/company/delivered-equipment/`, {
            headers : {
                'Content-Type' : 'application/json',
            },
        });
        //console.log(response.data);
        
        const deliveredEquipment: EquipmentReservation[] = response.data.reservations.map((reservation: any) => {
            return {
                reservation_id: reservation.id,
                date: reservation.pickup_schedule.date,
                equipment: reservation.equipment,
                user_email: reservation.pickup_schedule.company_admin.email,
                user_first_name: reservation.pickup_schedule.company_admin.first_name,
                user_last_name: reservation.pickup_schedule.company_admin.last_name,
                status: reservation.status
            };
        });

        return deliveredEquipment;
    }catch(error){
        console.error('Error getting delivered equipment: ', error);
        throw error;
    }
}

const DeliveredPage = () => 
{
    const [reservations, setReservations] = useState<EquipmentReservation[]>([]);
    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const reservations = await getDeliveredEquipment();
            setReservations(reservations);
        } catch (error) {
            console.error('Error fetching reservations data.', error);
        }
    }
    return(
        <Grid>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Reservation ID</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Admin Email</TableCell>
                            <TableCell>Admin First Name</TableCell>
                            <TableCell>Admin Last Name</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reservations.map((reservation) => (
                            <TableRow key={reservation.reservation_id}>
                                <TableCell>{reservation.reservation_id}</TableCell>
                                <TableCell>{reservation.date}</TableCell>
                                <TableCell>{reservation.user_email}</TableCell>
                                <TableCell>{reservation.user_first_name}</TableCell>
                                <TableCell>{reservation.user_last_name}</TableCell>
                                <TableCell>{reservation.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    )
};

export default DeliveredPage;