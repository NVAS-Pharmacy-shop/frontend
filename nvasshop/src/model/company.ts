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