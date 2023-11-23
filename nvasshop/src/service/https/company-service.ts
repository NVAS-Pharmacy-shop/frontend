import api from "../../api";
import { Company } from "../../model/company";

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
