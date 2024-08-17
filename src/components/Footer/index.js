import React from "react";
import { useTheme } from "../ThemeContext";
import styles from "./style.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Unicons from '@iconscout/react-unicons';
import { Link, useNavigate } from "react-router-dom"; // Import Link from React Router
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const { isDarkTheme } = useTheme();

  const menuStyle = {
    color: isDarkTheme ? "#fff" : "#333",
    display: 'block',
    width: '100%', // Ensure it takes full width
    textAlign: 'center', // Center text inside the container
    padding: '10px 0', // Add some padding for spacing
  };

  const navigate=useNavigate();
  const handleLogout=()=>{
    sessionStorage.clear();
     navigate('/admin')
  }

  return (
    <footer
      className={`fixed-bottom shadow ${styles.footer} ${
        isDarkTheme ? styles.dark : styles.light
      }`}
    >
      <div className="container d-md-none">
        {/* Hide container on medium and larger screens */}
        <ul className="nav justify-content-between border-bottom  pb-0 mb-0">
          <li className="nav-item">
            <Link to="/" className="nav-link px-2 text-muted">
              <Unicons.UilEstate />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link px-2 text-muted">
              <Unicons.UilApps />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-link px-2 text-muted">
              <Unicons.UilUser />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/cart" className="nav-link px-2 text-muted">
              <Unicons.UilShoppingCartAlt />
            </Link>
          </li>
          <li className="nav-item">
            <div onClick={handleLogout}  className="nav-link px-2 text-muted">
            <FontAwesomeIcon icon={faSignOut}  />
            
            </div>
          </li>
        </ul>
      </div>
      <div className="container d-none d-md-block" style={menuStyle}>
        {/* Visible on medium and larger screens */}
        <p className="text-center text-muted m-2" style={menuStyle}>
          © 2024 Copyright: JP made with Love{" "}
          <img src="/images/heart.svg" height="20px" width="20px" alt="Heart icon" />
        </p>
      </div>
    </footer>
  );
};

export default Footer;
