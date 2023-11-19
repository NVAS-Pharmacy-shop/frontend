import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { render } from 'react-dom';
import React from 'react';
import Company from './company/company-component'
import CompanyUpdate from './company/company-edit';
import EquipmentBrowser from './equipment/equipment-browser';
import EditCompanyAdminProfile from './user/company-admin-profile-update';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path='/company/:id' element={<Company/>}></Route>
                <Route path='/updateCompany/:id' element={<CompanyUpdate/>}></Route>
                <Route path='/updateAdminProfile/' element={<EditCompanyAdminProfile/>}></Route>
                <Route path='/equipment' element={<EquipmentBrowser/>}></Route>
                <Route path='/equipment/:companyId' element={<EquipmentBrowser/>}></Route>
            </Routes>
        </Router>
  )
}

export default AppRoutes;