import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { render } from "react-dom";
import React from "react";
import Company from "./company/company-component";
import CompanyUpdate from "./components/company-admin/company-overview/company-edit";
import EquipmentBrowser from "./equipment/equipment-browser";
import EditCompanyAdminProfile from "./user/company-admin-profile-update";
import RegisterCompany from "./admin/register-company";
import RegisterCompanyAdmin from "./admin/register-company-admin";
import RegisterSytemAdmin from "./admin/register-system-admin";
import CompaniesOverview from "./company/companies-overview";
import PrivateRoutes from "./utils/PrivateRoutes";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AddPickupSchedule from "./components/company-admin/pickup-schedule/add-schedule/add-pickup-schedule";
import EquipmentAdmin from "./components/company-admin/company-overview/equipment-overview";
import ChangeCompanyAdminPassword from "./components/company-admin/change-password/ChangePasswordPage";
import WorkCalendar from "./components/company-admin/pickup-schedule/work-calendar/work-calendar";
import CompanyCalendar from "./company/company-calendar";
import PrivateRoute from "./privateRoute";

const AppRoutes = () => {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/company/:id" element={<Company />}></Route>
            <Route
              path="/admin/company-overview/"
              element={<CompanyUpdate />}
            ></Route>
            <Route
              path="/updateAdminProfile/"
              element={<EditCompanyAdminProfile />}
            ></Route>
            <Route path="/registerSystemAdmin" element={<PrivateRoute component={RegisterSytemAdmin} requiredRoles={['system_admin']} />} />
            <Route path="/registerCompanyAdmin" element={<PrivateRoute component={RegisterCompanyAdmin} requiredRoles={['system_admin']} />} />
            <Route path="/registerCompany" element={<PrivateRoute component={RegisterCompany} requiredRoles={['system_admin']} />} />

            <Route path="/equipment/:companyId" element={<PrivateRoute component={EquipmentBrowser} requiredRoles={['company_admin']} />} />
            <Route path="/admin/work-calendar/" element={<PrivateRoute component={WorkCalendar} requiredRoles={['company_admin']} />} />
            <Route path="/company/work-calendar/" element={<PrivateRoute component={CompanyCalendar} requiredRoles={['company_admin']} />} />
            
            <Route path="/equipment" element={<PrivateRoute component={EquipmentBrowser} requiredRoles={['system_admin', 'employee']} />} />
            <Route path="/admin/change-password/" element={<PrivateRoute component={ChangeCompanyAdminPassword} requiredRoles={['company_admin', 'system_admin']} />} />
            <Route
              path="/add-pickup-schedule/"
              element={<AddPickupSchedule />}
            ></Route>
          </Route>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/companies" element={<CompaniesOverview />}></Route>
          <Route element={<LoginPage />} path="/login" />
          <Route element={<RegisterPage />} path="/register" />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
