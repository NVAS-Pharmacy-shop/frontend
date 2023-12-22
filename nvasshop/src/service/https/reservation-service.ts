import api from '../../api';

export interface Reservation {
    date?: string | null;
    start_time: string;
    end_time: string;
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
        //console.log(response.data);

        const reservations: Reservation[] = response.data.reservations.map((reservation: any) => {
            const [shours, sminutes] = reservation.start_time.split(':');
            const [ehours, eminutes] = reservation.end_time.split(':');
            return {
                date: reservation.date,
                start_time: `${shours}:${sminutes}`,
                end_time: `${ehours}:${eminutes}`,
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
