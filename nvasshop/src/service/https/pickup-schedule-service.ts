import api from "../../api";
import { PickupSchedule } from "../../model/company";


const createPickupSchedule = async (
    pickupScheduleData: PickupSchedule
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

export { createPickupSchedule };