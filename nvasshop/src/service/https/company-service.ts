import api from "../../api";
import { Company, Customer } from "../../model/company";

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
