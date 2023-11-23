import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoutes from './utils/PrivateRoutes';
import { AuthProvider } from './context/AuthContext';

import 'bootstrap/dist/css/bootstrap.min.css';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Header from './components/Header';

const App = () => {
  return (
    <div className='App'>
      <Router>
        <AuthProvider>
          <Header />
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route element={<HomePage />} path='/' />
            </Route>
            {/* <PrivateRoute component={HomePage} path='/' exact /> */}
            <Route element={<LoginPage />} path='/login' />
            <Route element={<RegisterPage />} path='/register' />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
};

export default App;
