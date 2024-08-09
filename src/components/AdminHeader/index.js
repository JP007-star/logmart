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
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = currentDateTime.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const formattedDateWords = format(currentDateTime, "EEEE, MMMM do yyyy");

  return (
    <Navbar
      className={`fixed p-0 m-0 col-12 ms-auto shadow-lg p-1 mb-1 rounded-3 ${styles.header} ${
        isDarkTheme ? styles.darkHeader : styles.lightHeader
      }`}
      expand="lg"
      style={headerStyle}
    >
      <Navbar.Brand className="d-flex align-items-center m-3">
        <img
          src="/images/logo.png"
          alt="Logo"
          className={styles.logo}
        />
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <div className="d-none d-lg-block ms-3">
          <Navbar.Text className={styles.dateText}>
            {formattedDateWords}
          </Navbar.Text>
          <Navbar.Text className={`sevenSegment ${styles.timeText}`}>
            {formattedTime}
          </Navbar.Text>
        </div>
      </Navbar.Brand>
      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
        <Nav className="m-3">
          <Nav.Link href="/admin/home" style={menuStyle}>
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
      <div className="d-lg-none text-center mt-2">
        <Navbar.Text className={styles.dateText}>
          {formattedDateWords}
        </Navbar.Text>
        <Navbar.Text className={`sevenSegment ${styles.timeText}`}>
          {formattedTime}
        </Navbar.Text>
      </div>
    </Navbar>
  );
};

export default AdminHeader;
