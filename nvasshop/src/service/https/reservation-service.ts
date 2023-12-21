import dayjs from 'dayjs';

export interface Reservation {
    date?: string | null;
    start_time: string;
    duration_minutes: number;
    employeeName: string;
    employeeSurname: string;
}

const generateReservations = (): Reservation[] => {
    const currentDate = new Date();
    const reservationList: Reservation[] = [];

    // Example names and surnames
    const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack'];
    const surnames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor'];

    // Create 10 reservations within 3 consecutive days
    for (let i = 0; i < 10; i++) {
        const reservationDate = new Date(currentDate);
        reservationDate.setDate(currentDate.getDate() + Math.floor(i / 3));

        const reservation: Reservation = {
            date: reservationDate.toISOString().split('T')[0],
            start_time: `${8 + i % 3}:00`, // Start time ranging from 8:00 to 10:00
            duration_minutes: 60,
            employeeName: names[i % names.length],
            employeeSurname: surnames[i % surnames.length],
        };

        reservationList.push(reservation);
    }

    return reservationList;
};

export const ReservationService = {
    generateReservations,
};
