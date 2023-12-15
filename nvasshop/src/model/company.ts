import { TimePickerProps } from "@mui/x-date-pickers";

export interface Company {
    id: number;
    name: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    rate: number;
    description: string;
    equipment: Equipment[];
}

export interface Equipment {
    name: string;
    description: string;
    quantity: number;
    type: number;
    id: number;
}

export interface PickupSchedule {
    id: number,
    company: number,
    administrator_firstName: string,
    administrator_lastName: string,
    date?: string | null;
    start_time: string,
    duration_minutes: number
}
