import { promises } from "dns";
import api from "../../api";
import { LargeNumberLike } from "crypto";

export const changeAdminPassword = async (newPassword: string): Promise<void> => {
    try {
      const response = await api.put(
        "/user/admins/updatePassword/",
        { password: newPassword }, 
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating password: ", error);
      throw error;
    }
  };

  export const getCompanyId = async (): Promise<{company_id: number}> => {
    try {
      const response = await api.get(
        "/user/admins/companyId/",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error getting companyId: ", error);
      throw error;
    }
  };

  export const getCompanyAdmins = async (): Promise<string[]> => {
    try{
      const response = await api.get('/user/admins/companies/'
        ,{
          headers: {
            "Content-Type": "application/json",
          }
      });
      return response.data['user'];
    } catch (error) {
        console.error("Error getting company admins: ", error);
      throw error;
    }
  };
