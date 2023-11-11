import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoutes from './utils/PrivateRoutes';
import { AuthProvider } from './context/AuthContext';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
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
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
};

export default App;
