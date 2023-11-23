import { Outlet, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const PrivateRoutes = () => {
    let {user}: any = useContext(AuthContext)
    return(
        // <Route {...rest}>{!user ? <Navigate to="/login" /> :   children}</Route>
        user? <Outlet /> : <Navigate to ="/login" />

    )
}

export default PrivateRoutes;