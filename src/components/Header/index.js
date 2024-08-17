import React from "react";
import { useTheme } from "../ThemeContext";
import { Navbar, Nav, Form, FormControl } from "react-bootstrap";
import styles from "./style.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Unicons from '@iconscout/react-unicons';
import { useNavigate } from "react-router-dom";


const Header = () => {
  const { isDarkTheme } = useTheme();

  const headerStyle = {
    zIndex: 1000,
    backgroundColor: isDarkTheme ? "#000" : "#fff",
  };

  const menuStyle = {
    color: isDarkTheme ? "#fff" : "#333",
  };
  const navigate=useNavigate();

  const handleLogout=()=>{
    sessionStorage.clear();
    navigate('/login');
  }

  return (
    <Navbar
      className={`fixed-top p-0 m-0  shadow-lg p-1 mb-5 rounded ${styles.header} ${
        isDarkTheme ? styles.darkHeader : styles.lightHeader
      }`}
      expand="lg"
      style={headerStyle}
    >
     
        <Navbar.Brand className="m-sm-0" href="/">
          <img
            className="d-none d-md-block w-75 "
            src={`${isDarkTheme ? "/images/logo_light.png" : "/images/logo.png"}`}
            alt="Logo"
          /> 
           <img
            className={`${styles.logo} d-sm-none p-2`}
            src={`${isDarkTheme ? "/images/logo_light.png" : "/images/logo.png"}`}
            alt="Logo"
          />
          <div className="float-end m-3 d-sm-none ">
          <Unicons.UilBell/>
          </div>
          <div className="float-end m-3 d-sm-none ">
          <Nav.Link href="/cart" style={menuStyle}>
            <Unicons.UilShoppingCartAlt/>
            </Nav.Link>          </div>
         
        </Navbar.Brand>
        <Form inline className="mr-3 col-md-6 col-sm-10">
            <FormControl
              type="text"
              placeholder="Search"
              className="m-2 p-2 col-sm-10"
            />
          </Form>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav float-end">
          <Nav className="m-3">
            <Nav.Link href="/" style={menuStyle}>
            <Unicons.UilEstate /> Home
            </Nav.Link>
            <Nav.Link href="/" style={menuStyle}>
            <Unicons.UilApps /> Products
            </Nav.Link>
            <Nav.Link href="/cart" style={menuStyle}>
            <Unicons.UilShoppingCartAlt/> Cart
            </Nav.Link>
            <Nav.Link href="/notifications" style={menuStyle}>
            <Unicons.UilBell/> Notification
            </Nav.Link>
            <Nav.Link href="/admin" style={menuStyle}>
            <Unicons.UilDashboard/> Admin
            </Nav.Link>
            <Nav.Link onClick={handleLogout} style={menuStyle}>
               <Unicons.UilSignout/>
               Logout
            </Nav.Link>
          </Nav>
          {/* <Nav className="ml-auto">
            <NavDropdown title="Theme" style={menuStyle} id="collapsible-nav-dropdown"
               className={`${isDarkTheme? styles.darkHeader : styles.lightHeader} rounded`}
            >
              <NavDropdown.Item onClick={toggleTheme}>
                {isDarkTheme ? "Light Mode" : "Dark Mode"}
              </NavDropdown.Item>
            </NavDropdown>
          </Nav> */}

        </Navbar.Collapse>
      
    </Navbar>
  );
};

export default Header;
