import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { render } from "react-dom";
import React from "react";
import Company from "./company/company-component";
import CompanyUpdate from "./company/company-edit";
import EquipmentBrowser from "./equipment/equipment-browser";
import EditCompanyAdminProfile from "./user/company-admin-profile-update";
import RegisterCompany from "./admin/register-company";
import RegisterCompanyAdmin from "./admin/register-company-admin";
import CompaniesOverview from "./company/companies-overview";
import PrivateRoutes from "./utils/PrivateRoutes";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";

const AppRoutes = () => {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/company/:id" element={<Company />}></Route>
            <Route
              path="/updateCompany/:id"
              element={<CompanyUpdate />}
            ></Route>
            <Route
              path="/updateAdminProfile/"
              element={<EditCompanyAdminProfile />}
            ></Route>
            <Route path="/equipment" element={<EquipmentBrowser />}></Route>
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
            <Route path="/companies" element={<CompaniesOverview />}></Route>
            <Route path="/user" element={<UserProfilePage />}></Route>
          </Route>
          <Route path="/" element={<HomePage />}></Route>
          <Route element={<LoginPage />} path="/login" />
          <Route element={<RegisterPage />} path="/register" />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
