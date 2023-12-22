import api from '../../api';

export interface Reservation {
    date?: string | null;
    start_time: string;
    duration_minutes: number;
    user_first_name: string;
    user_last_name: string;
}

const getReservations = async(date: string, dateWindow: string): Promise<Reservation[]> => {
    try{
        const response = await api.get(`/company/reservations/${date}/${dateWindow}/`, {
            headers : {
                'Content-Type' : 'application/json',
            },
        });
        console.log(response.data);

        // Map backend data to Reservation interface
        const reservations: Reservation[] = response.data.reservations.map((reservation: any) => {
            const [hours, minutes] = reservation.start_time.split(':'); // Split start_time by ':'
            const [duration_hours, duration_minutes] = reservation.duration_minutes.split(':'); // Split duration_minutes by ':'
            return {
                date: reservation.date,
                start_time: `${hours}:${minutes}`, // Format start_time as 'HH:MM'
                duration_minutes: parseInt(duration_hours) * 60 + parseInt(duration_minutes), // Convert duration_hours to minutes and add duration_minutes
                user_first_name: reservation.user_first_name,
                user_last_name: reservation.user_last_name,
            };
        });

        return reservations;
    }catch(error){
        console.error('Error getting reservations: ', error);
        throw error;
    }
} 

export const ReservationService = {
    getReservations
};
