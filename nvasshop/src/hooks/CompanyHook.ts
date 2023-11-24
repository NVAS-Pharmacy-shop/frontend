import { get } from "http";
import Company from "../company/company-component";
import { useQuery } from "react-query";
import getAllCompanies from "../service/https/company-service";

export const useAllCompanies = (name: string, rating: string) => {
  return useQuery(
    ["companies", name, rating],
    () => getAllCompanies(name, rating),
    { keepPreviousData: true }
  );
};
