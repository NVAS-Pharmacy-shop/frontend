import api from "../../api";

export interface User {
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  penal_amount: number;
}

export const getUser = async (id: number): Promise<User> => {
  return api.get(`/user/${id}`);
};
