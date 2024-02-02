import api from "../../api";
import { Equipment } from "../../model/company";


export const getEquipment = async(): Promise<Equipment[]> => {
    try{
        const response = await api.get(`/company/admin`, {
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
        console.error('Error adding equipment ', error);
        throw error;
    }
}

export const deleteEquipment = async(id : number) : Promise<void> => {
    try{
        const response = await api.delete(`/company/equipment/admin/${id}`, {
            headers: {
                'Content-Type' : 'application/json',
            },
        });
    }catch(error) {
        console.error('Error deleting equipment ', error);
        throw error;
    }
}
