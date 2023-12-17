import api from "../../api";
import { Equipment } from "../../model/company";


export const getEquipment = async(id: number): Promise<Equipment[]> => {
    try{
        const response = await api.get(`/company/${id}`, {
            headers: {
                'Content-Type' : 'application/json',
            },
        });
        return response.data.company.equipment;
    } catch(error){
        console.error('Error getting equipment: ', error);
        throw error;
    }
}


export const updateEquipment = async(equipment : Equipment) : Promise<void> => {
    try{
        const response = await api.put('/company/equipment/admin/', equipment, {
            headers: {
                'Content-Type' : 'application/json',
            },
        });
    }catch(error) {
        console.error('Error updating equipment ', error);
        throw error;
    }
}

export const addEquipment = async(equipment : Equipment) : Promise<void> => {
    try{
        const response = await api.post('/company/equipment/admin/', equipment, {
            headers: {
                'Content-Type' : 'application/json',
            },
        });
    }catch(error) {
        console.error('Error updating equipment ', error);
        throw error;
    }
}
