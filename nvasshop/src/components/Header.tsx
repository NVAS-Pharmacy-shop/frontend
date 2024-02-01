import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "./Header.css";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function Header() {
  let { user, logoutUser } = useContext(AuthContext);
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>

        <Navbar.Brand href="/">
          <img src="/LogoNVAS.png" width={150} height={50} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user && user.role === "company_admin" ? (
              <Nav.Link as={Link} to="/admin/homepage/">
                Home
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
            )}

            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/companies">
                Companies
              </NavDropdown.Item>
              {user && (
                <NavDropdown.Item as={Link} to="/equipment">
                  Equipment
                </NavDropdown.Item>
              )}
            </NavDropdown>

            {user && user.role === 'system_admin' && (
              <NavDropdown title="Register new">
                <NavDropdown.Item as={Link} to="/registerSystemAdmin">
                  System Admin
                </NavDropdown.Item>

                <NavDropdown.Item as={Link} to="/registerCompanyAdmin">
                  Company Admin
                </NavDropdown.Item>

                <NavDropdown.Item as={Link} to="/registerCompany">
                  Company
                </NavDropdown.Item>
              </NavDropdown>
            )}

          {user && user.role === 'employee' && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Nav.Link as={Link} to="/usersReservations">
                  My Reservations
                </Nav.Link>
              </div>
            )}

            {user && user.role === 'company_admin' && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <NavDropdown title="Calendar">
                  <NavDropdown.Item as={Link} to="/admin/work-calendar/">
                    My Calendar
                  </NavDropdown.Item>

                  <NavDropdown.Item as={Link} to="/company/work-calendar/">
                    Company Calendar
                  </NavDropdown.Item>
                </NavDropdown>

                <Nav.Link as={Link} to="/admin/company-overview">
                  My Company
                </Nav.Link>

                <Nav.Link as={Link} to="/updateAdminProfile">
                  My Profile
                </Nav.Link>

                <Nav.Link as={Link} to="/map">
                  Map
                </Nav.Link>
              </div>
            )}

            {user ? (
              <Nav.Link as={Link} to="/login" onClick={logoutUser} className="nav-link">
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login" className="nav-link">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

}

export default Header;

// const Header = () => {
//     let {user, logoutUser} = useContext(AuthContext)
//     return (
//         <div>
//             <Link to="/" >Home</Link>
//             <span> | </span>
//             {user ? (
//                  <p  onClick={logoutUser}>Logout</p>
//             ): (
//                 <Link to="/login" >Login</Link>
//             )}

//             {user &&   <p>Hello {user.username}</p>}

//         </div>
//     )
// }

// export default Header
