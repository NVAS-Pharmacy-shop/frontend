import { TimePickerProps } from "@mui/x-date-pickers";

export interface Company {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  rate: number;
  description: string;
  equipment: Equipment[];
}

export interface Equipment {
  name: string;
  description: string;
  quantity: number;
  type: number;
  id: number;
}

export interface PickupSchedule {
  id: number;
  company: number;
  date?: string | null;
  start_time: string;
  end_time: string;
  company_admin: CompanyAdmin;
}

export interface PickupScheduleInput {
  date?: string | null;
  start_time: string;
  duration_minutes: number;
  first_name: string;
  last_name: string;
}

export interface CompanyAdmin {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}
