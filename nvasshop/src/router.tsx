import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { render } from "react-dom";
import React from "react";
import { AuthProvider } from "./context/AuthContext";
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
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AddPickupSchedule from "./components/company-admin/pickup-schedule/add-schedule/add-pickup-schedule";
import EquipmentAdmin from "./components/company-admin/company-overview/equipment-overview";
import ChangeCompanyAdminPassword from "./components/company-admin/change-password/ChangePasswordPage";
import WorkCalendar from "./components/company-admin/pickup-schedule/work-calendar/work-calendar";
import CompanyCalendar from "./company/company-calendar";
import AdminHomePage from "./components/company-admin/home-page/home-page";
import EquipmentDeliveringCalendar from "./components/company-admin/equipment-delivering/equipment-delivering-calendar";
import ContractForm from "./hospital/add-contract-form";
import ContractsOverview from "./components/company-admin/contracts-overview/contracts-overview";

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
            <Route path="/registerSystemAdmin/" element={<RegisterSytemAdmin />}></Route>

            <Route
              path="/equipment/:companyId"
              element={<EquipmentBrowser />}
            ></Route>
            <Route
              path="/registerCompany/"
              element={<RegisterCompany />}
            ></Route>
            <Route
              path="/registerCompanyAdmin/"
              element={<RegisterCompanyAdmin />}
            ></Route>
            <Route
              path="/add-pickup-schedule/"
              element={<AddPickupSchedule />}
            ></Route>
          </Route>
          <Route path="/equipment" element={<EquipmentBrowser />}></Route>
          <Route path="/" element={<HomePage />}></Route>
          <Route
            path="/admin/change-password/"
            element={<ChangeCompanyAdminPassword />}
          ></Route>
          <Route path="/companies" element={<CompaniesOverview />}></Route>
          <Route element={<LoginPage />} path="/login" />
          <Route element={<RegisterPage />} path="/register" />
          <Route element={<WorkCalendar />} path="/admin/work-calendar/" />
          <Route element={<CompanyCalendar />} path="/company/work-calendar/" />
          <Route element={<AdminHomePage />} path="/admin/homepage/" />
          <Route element={<EquipmentDeliveringCalendar />} path="/admin/equipment-reservations/" />
          <Route element={<ContractsOverview />} path="/admin/contracts-overview/" />

          <Route path="/hospital/create-contract/" element={<ContractForm />}/>

          
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
