import { useEffect, useState } from "react";
import { Customer } from "../../../model/company";
import { getCompanyCustomers } from "../../../service/https/company-service";
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { Link } from 'react-router-dom';
import "./home-page.css";

function AdminHomePage() {
    const[customers, setCustomers] = useState<Customer[]>();

    const fetchCustomerData = async () => {
        try {
            const customers = await getCompanyCustomers();
            setCustomers(customers);
            console.log(customers);
            
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
                    <Link to="/admin/company-overview/" className="link-button">Company info <InfoIcon /></Link>
                </div>
            </div>
            <div className = "right_panel">
                <div className = "data">
                    <div className = "data-sales">
                        <h3>Total customers</h3>
                        <h1>154</h1>
                    </div>
                    <div className = "data-sales">
                        <h3>Revenue</h3>
                        <h1>154$</h1>
                    </div>
                    <div className = "data-sales">
                        <h3>Equipment</h3>
                        <h1>154</h1>
                    </div>
                </div>
                <div className = "customers-table">
                    <h2>Customers</h2>
                    <Table sx={{ minWidth: 200 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="right">FirstName</TableCell>
                            <TableCell align="right">Lastname</TableCell>
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