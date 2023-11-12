import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { render } from 'react-dom';
import React from 'react';
import Company from './company/company-component'
import CompanyUpdate from './company/company-edit';
import EditCompanyAdminProfile from './user/company-admin-profile-update';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path='/company/:id' element={<Company/>}></Route>
                <Route path='/updateCompany/:id' element={<CompanyUpdate/>}></Route>
                <Route path='/updateAdminProfile/' element={<EditCompanyAdminProfile/>}></Route>
            </Routes>
        </Router>
  )
}

export default AppRoutes;