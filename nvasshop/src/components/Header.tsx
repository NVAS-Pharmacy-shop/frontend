import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function Header() {
  let { user, logoutUser } = useContext(AuthContext);
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
          <img src="LogoNVAS.png"/>
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

              <NavDropdown.Item as={Link} to="/equipment">
                Equipment
              </NavDropdown.Item>
            </NavDropdown>

            {user ? (
              <Nav.Link as={Link} to="/login" onClick={logoutUser}>
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login">
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
