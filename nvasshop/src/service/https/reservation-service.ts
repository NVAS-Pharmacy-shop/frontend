import api from '../../api';
import jsQR from 'jsqr';

export interface Reservation {
    date?: string | null;
    start_time: string;
    end_time: string;
    user_first_name: string;
    user_last_name: string;
}

export interface ReservationInfo {
    date?: string | null;
    start_time: string;
    user_email: string;
    reserved_equipment: ReservedEquipmentInfo[];
}

export interface ReservedEquipmentInfo {
    equipment: string;
    quantity: number;
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

const getReservationInfo = async(qrCodeImage: File): Promise<ReservationInfo> => {
    try {
        const reader = new FileReader();
        const promise = new Promise<ReservationInfo>((resolve, reject) => {
            reader.onloadend = async () => {
                const image = new Image();
                image.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = image.width;
                    canvas.height = image.height;
                    const context = canvas.getContext('2d');
                    if (!context) {
                        reject(new Error('Unable to get 2D context from canvas'));
                        return;
                    }
                    context.drawImage(image, 0, 0, image.width, image.height);
                    const imageData = context.getImageData(0, 0, image.width, image.height);
                    const code = jsQR(imageData.data, imageData.width, imageData.height);
                    if (code) {
                        const data = code.data.split('\n');
                        const reservation: ReservationInfo = {
                            user_email: data[1].split(': ')[1],
                            date: data[2].split(': ')[1],
                            start_time: data[3].split(': ')[1],
                            reserved_equipment: data.slice(4).map(line => {
                                const [equipment, quantity] = line.split(' x ');
                                return { equipment, quantity: parseInt(quantity) };
                            }),
                        };
                        resolve(reservation);
                    } else {
                        reject(new Error('Invalid QR code'));
                    }
                };
                image.src = reader.result as string;
            };
            reader.onerror = reject;
        });
        reader.readAsDataURL(qrCodeImage);
        return promise;
    } catch (error) {
        console.error('Error getting reservation info: ', error);
        throw error;
    }
}

const pickupReservationQRCode = async(qrCodeImage: File): Promise<void> => {
    try {
        const reader = new FileReader();
        const promise = new Promise<void>((resolve, reject) => {
            reader.onloadend = async () => {
                const image = new Image();
                image.onload = async () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = image.width;
                    canvas.height = image.height;
                    const context = canvas.getContext('2d');
                    if (!context) {
                        reject(new Error('Unable to get 2D context from canvas'));
                        return;
                    }
                    context.drawImage(image, 0, 0, image.width, image.height);
                    const imageData = context.getImageData(0, 0, image.width, image.height);
                    const code = jsQR(imageData.data, imageData.width, imageData.height);
                    if (code) {
                        const data = code.data.split('\n');
                        const reservationId = data[0].split(': ')[1]; // Extract the reservation ID

                        // Send the reservation ID in the PUT request
                        await api.put(`/company/delivered-equipment/${reservationId}/`);
                        resolve();
                    } else {
                        reject(new Error('Invalid QR code'));
                    }
                };
                image.src = reader.result as string;
            };
            reader.onerror = reject;
        });
        reader.readAsDataURL(qrCodeImage);
        return promise;
    } catch (error) {
        console.error('Error delivering reservation: ', error);
        throw error;
    }
}


export const ReservationService = {
    getReservations,
    getEquipmentReservations,
    pickupReservation,
    getReservationInfo,
    pickupReservationQRCode
};