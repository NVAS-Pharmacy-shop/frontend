import api from "../../api";
import { PickupSchedule, PickupScheduleInput } from "../../model/company";


export const createPickupSchedule = async (
    pickupScheduleData: PickupScheduleInput
) : Promise<void> => {
    try 
    {
        console.log("DATA:", pickupScheduleData);
        const response = await api.post('/company/create-schedule/', pickupScheduleData, {
            headers: {
                'Content-Type': 'application/json',
              },
        });
        console.log('Pickup schedule created successfully: ', response.data);
    } catch(error){
        console.error('Error creating pickup schedule:', error);
        throw error;
    }
}

export const getSchedules = async(): Promise<PickupSchedule[]> => {
    try{
        const response = await api.get(`/company/schedules/`, {
            headers : {
                'Content-Type' : 'application/json',
            },
        });
        console.log(response.data);
        return response.data.schedules;
    }catch(error){
        console.error('Error getting schedules: ', error);
        throw error;
    }
} 