import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { render } from 'react-dom';
import React from 'react';
import Company from './company/company-component'

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path='/company/:id' element={<Company/>}></Route>
            </Routes>
        </Router>
  )
}

export default AppRoutes;