import { useEffect, useState } from "react";
import { Customer } from "../../../model/company";
import { getCompanyCustomers } from "../../../service/https/company-service";
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { Link } from 'react-router-dom';
import "./home-page.css";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MapIcon from '@mui/icons-material/Map';
import GavelIcon from '@mui/icons-material/Gavel';

function AdminHomePage() {
    const[customers, setCustomers] = useState<Customer[]>();

    const fetchCustomerData = async () => {
        try {
            const customers = await getCompanyCustomers();
            setCustomers(customers);
            
        }catch(error) {
            console.error("Error fetching customer data", error);
        }
    }

    useEffect(() => {
        fetchCustomerData();
    }, [])
    if (!customers) {
        return <div>Loading...</div>;
    }

    const customerList = customers.map((customer) => (
        <div key={customer.id}>
            <p>{customer.first_name}</p>
            <p>{customer.last_name}</p>
            <p>{customer.email}</p>
        </div>
    ));

    return (
        <div className="main-container">
            <div className = "left_panel">
                <div className="link">
                    <Link to="/admin/work-calendar" className="link-button">Calendar <CalendarMonthIcon /></Link>
                </div>
                <div className="link">
                    <Link to="/add-pickup-schedule" className="link-button">Add Schedule <EditCalendarIcon /></Link>
                </div>
                <div className="link">
                    <Link to="/admin/equipment-reservations/" className="link-button">Reservations <EventAvailableIcon /></Link>
                </div>
                <div className="link">
                    <Link to="/map/" className="link-button">Track delivery <MapIcon /></Link>
                </div>
                
                <div className="link">
                    <Link to="/admin/contracts-overview/" className="link-button">Contracts <GavelIcon /></Link>
                </div>
                <hr className="custom-line"></hr>
                <div className="link">
                    <Link to="/admin/update-profile/" className="link-button">Edit profile <AccountCircleIcon /></Link>
                </div>
                <div className="link">
                    <Link to="/admin/company-overview/" className="link-button">Company info <InfoIcon /></Link>
                </div>
            </div>
            <div className = "right_panel">
                <div className = "data">
                    <div className = "data-sales">
                        <h3 className = "h3-data">Total customers</h3>
                        <h1>{customers.length}</h1>
                    </div>
                    <div className = "data-sales">
                        <h3 className = "h3-data">Revenue(last month)</h3>
                        <h1>1545.00 $</h1>
                    </div>
                    <div className = "data-sales">
                        <h3 className = "h3-data">Equipment</h3>
                        <h1>7</h1>
                    </div>
                </div>
                <div className = "customers-table">
                    <h2>Customers</h2>
                    <Table sx={{ minWidth: 200 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="right">First name</TableCell>
                            <TableCell align="right">Last name</TableCell>
                            <TableCell align="right">Email</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {customers.map((row) => (
                            <TableRow
                            key={row.first_name}
                            sx={{
                                "&:last-child td, &:last-child th": { border: 0 },
                            }}
                            >
                            <TableCell align="right">{row.first_name}</TableCell>
                            <TableCell align="right">{row.last_name}</TableCell>
                            <TableCell align="right">{row.email}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </div>
                
            </div>
        </div>
    );
}

export default AdminHomePage;