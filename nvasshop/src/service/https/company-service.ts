import api from "../../api";
import { Company, Customer, Equipment } from "../../model/company";

const getAllCompanies = async (
  name: string,
  rating: string
): Promise<Company[]> => {
  const response = await api.get("/company", {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      name,
      rating,
    },
  });
  return response.data["company"];
};

export default getAllCompanies;


export const getCompanyCustomers = async () : Promise<Customer[]> => {
  try{
    const response = await api.get('/company/company_customers', {
      headers: {
        "Content-Type": "application/json",
      }
    })
    return response.data["customers"];
  } catch(error) {
    console.error('Error getting equipment: ', error);
    throw error;
  }
}

export const getCompanies = async () : Promise<Company[]> => {
  try{
    const response = await api.get('/company/', {
      headers: {
        "Content-Type": "application/json",
      }
    })
    console.log(response.data);
    return response.data["company"];
  } catch(error) {
    console.error('Error getting equipment: ', error);
    throw error;
  }
}

export const getCompanyEquipment = async (id: number) : Promise<Equipment> => {
  try{
    const response = await api.get(`/company/equipment/${id}`, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    return response.data["equipment"];
  } catch(error) {
    console.error('Error getting equipment: ', error);
    throw error;
  }
}



