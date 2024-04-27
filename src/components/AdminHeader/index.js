// components/AdminHeader.js
import React, { useState, useEffect } from "react";
import { useTheme } from "../ThemeContext";
import { Navbar, Nav } from "react-bootstrap";
import { format } from "date-fns";
import styles from "./style.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminHeader = () => {
  const { isDarkTheme } = useTheme();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const headerStyle = {
    zIndex: 1000,
    backgroundColor: isDarkTheme ? "#000" : "#fff",
  };

  const menuStyle = {
    color: isDarkTheme ? "#fff" : "#333",
  };

  useEffect(() => {
    // Update currentDateTime every second
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Format time with 12-hour and seven-segment style
  const formattedTime = currentDateTime.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    locale: "en-IN", // Set locale to English - India
    timeZone: "Asia/Kolkata", // Set the time zone to the one used in India
  });
  

  // Format date in words (e.g., Tuesday, January 25th 2022)
  const formattedDateWords = format(currentDateTime, "EEEE, MMMM do yyyy");

  // Format date in dd/mm/yyyy format
  const formattedDateDDMMYYYY = format(currentDateTime, "dd/MM/yyyy");

  return (
    <Navbar
      className={`fixed p-0 m-0 col-12 ms-auto shadow-lg p-1 mb-1 rounded-3 ${styles.header} ${
        isDarkTheme ? styles.darkHeader : styles.lightHeader
      }`}
      expand="lg"
      style={headerStyle}
    >
     
      <Navbar.Text className="col-3 d-md-block text-center">
        {formattedDateWords} ({formattedDateDDMMYYYY})
      </Navbar.Text>
      <Navbar.Text className={`sevenSegment h3 col-5 d-md-block text-center  ${styles.ledFont}`}>
        {formattedTime}
      </Navbar.Text>
      <Navbar.Collapse id="responsive-navbar-nav ms-lg-3">
        <Nav className="m-3">
          <Nav.Link href="/admin/dashboard" style={menuStyle}>
            Dashboard
          </Nav.Link>
          <Nav.Link href="/admin/orders" style={menuStyle}>
            Orders
          </Nav.Link>
          <Nav.Link href="/admin/products" style={menuStyle}>
            Products
          </Nav.Link>
          <Nav.Link href="/admin/customers" style={menuStyle}>
            Customers
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AdminHeader;
