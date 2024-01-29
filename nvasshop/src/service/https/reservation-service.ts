import api from '../../api';

export interface Reservation {
    date?: string | null;
    start_time: string;
    end_time: string;
    user_first_name: string;
    user_last_name: string;
}

export interface EquipmentReservation{
    reservation_id: number,
    date: string,
    equipment: ReservedEquipment[],
    user_email: string,
    user_first_name: string,
    user_last_name: string,
    status: string
}

export interface ReservedEquipment{
    equipment_id: number,
    equipment_name: string,
    quantity: number
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

const getEquipmentReservations = async(): Promise<EquipmentReservation[]> => {
    try{
        const response = await api.get('/company/reservations/', {
            headers : {
                'Content-Type' : 'application/json',
            },
        });

        const reservations: EquipmentReservation[] = response.data.reservations.map((reservation: any) => {
            return {
                reservation_id: reservation.reservation_id,
                date: reservation.date,
                equipment: reservation.equipment,
                user_email: reservation.user_email,
                user_first_name: reservation.user_first_name,
                user_last_name: reservation.user_last_name,
                status: reservation.status
            };
        });
        return reservations;
    }catch(error){
        console.error('Error getting reservations: ', error);
        throw error;
    }
}

const pickupReservation = async(reservation_id : number, equipment: ReservedEquipment[]) : Promise<void> => {
    try{
        const response = await api.put(`company/delivered-equipment/${reservation_id}/`, {
            equipment: equipment,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }catch(error){
        console.error('Error updating reservations: ', error);
        throw error;
    }
}


export const ReservationService = {
    getReservations,
    getEquipmentReservations,
    pickupReservation
};