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
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
import AddPickupSchedule from "./components/company-admin/pickup-schedule/add-schedule/add-pickup-schedule";
import EquipmentAdmin from "./components/company-admin/company-overview/equipment-overview";
import ChangeCompanyAdminPassword from "./components/company-admin/change-password/ChangePasswordPage";
import WorkCalendar from "./components/company-admin/pickup-schedule/work-calendar/work-calendar";
import CompanyCalendar from "./company/company-calendar";
import PrivateRoute from "./privateRoute";
import AdminHomePage from "./components/company-admin/home-page/home-page";
import EquipmentDeliveringCalendar from "./components/company-admin/equipment-delivering/equipment-delivering-calendar";
import UserReservations from "./pages/UserReservations";
import MapComponent from "./map/map";
import ContractForm from "./hospital/add-contract-form";
import ContractsOverview from "./components/company-admin/contracts-overview/contracts-overview";
import DeliveredPage from "./pages/DeliveredEquipmentPage"
import QRCodePage from "./pages/QRCodePage";

const AppRoutes = () => {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/company/:id" element={<Company />}></Route> {/* Dodati guard, prepostavljam da je employee, nisam siguran */}
            <Route path="/equipment" element={ <EquipmentBrowser/> } />
            <Route path="/usersReservations" element={<PrivateRoute component={UserReservations} requiredRoles={['employee']} />} />

            <Route path="/registerSystemAdmin" element={<PrivateRoute component={RegisterSytemAdmin} requiredRoles={['system_admin']} />} />
            <Route path="/registerCompanyAdmin" element={<PrivateRoute component={RegisterCompanyAdmin} requiredRoles={['system_admin']} />} />
            <Route path="/registerCompany" element={<PrivateRoute component={RegisterCompany} requiredRoles={['system_admin']} />} />

            <Route path="/admin/work-calendar/" element={<PrivateRoute component={WorkCalendar} requiredRoles={['company_admin']} />} />
            <Route path="/company/work-calendar/" element={<PrivateRoute component={CompanyCalendar} requiredRoles={['company_admin']} />} />
            <Route path="/admin/update-profile/" element={<PrivateRoute component={EditCompanyAdminProfile} requiredRoles={['company_admin']} />} />
            <Route path="/admin/company-overview/" element={<PrivateRoute component={CompanyUpdate} requiredRoles={['company_admin']} />} />
            <Route path="/add-pickup-schedule/" element={<PrivateRoute component={AddPickupSchedule} requiredRoles={['company_admin']} />} />
            <Route path="/admin/equipment-reservations/" element={<PrivateRoute component={EquipmentDeliveringCalendar} requiredRoles={['company_admin']} />} />
            <Route path="/admin/homepage/" element={<PrivateRoute component={AdminHomePage} requiredRoles={['company_admin']} />} />
            <Route path="/map/" element={<PrivateRoute component={MapComponent} requiredRoles={['company_admin']} />} />
            <Route path="/admin/change-password/" element={<PrivateRoute component={ChangeCompanyAdminPassword} requiredRoles={['company_admin', 'system_admin']} />} />
            <Route path="/user-profile" element={<PrivateRoute component={UserProfilePage} requiredRoles={['employee']}></PrivateRoute>}/>
            <Route path="/preuzimanja" element={<PrivateRoute component={DeliveredPage} requiredRoles={['employee']}></PrivateRoute>}/>
            <Route path="/qrcodes" element={<PrivateRoute component={QRCodePage} requiredRoles={['employee']}></PrivateRoute>}/>
          </Route>
          <Route path="/" element={<HomePage />}></Route>
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
