import React from "react";
import { useTheme } from "../ThemeContext";
import styles from "./style.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Unicons from '@iconscout/react-unicons';
import { Link } from "react-router-dom"; // Import Link from React Router

const Footer = () => {
  const { isDarkTheme } = useTheme();

  const menuStyle = {
    color: isDarkTheme ? "#fff" : "#333",
  };

  return (
    <footer
      className={`fixed-bottom shadow  ${styles.footer} ${
        isDarkTheme ? styles.dark : styles.light
      }`}
    >
      <div className="container d-md-none">
        {" "}
        {/* Hide container on medium and larger screens */}
        <ul className="nav justify-content-between border-bottom m-3 pb-0 mb-0">
          <li className="nav-item">
            <Link to="/" className="nav-link px-2 text-muted"> {/* Replace <a> with <Link> */}
            <Unicons.UilEstate/>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="#" className="nav-link px-2 text-muted"> {/* Replace <a> with <Link> */}
              <Unicons.UilApps />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="#" className="nav-link px-2 text-muted"> {/* Replace <a> with <Link> */}
              <Unicons.UilBell />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link px-2 text-muted"> {/* Replace <a> with <Link> */}
              <Unicons.UilUser />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="#" className="nav-link px-2 text-muted"> {/* Replace <a> with <Link> */}
              <Unicons.UilShoppingCartAlt/>
            </Link>
          </li>
        </ul>
      </div>
      <div className="container d-md-block" style={menuStyle}>
        <p className="text-center text-muted m-2" style={menuStyle}>
          © 2024 Copyright: JP made with Love 
          <img src="/images/heart.svg" height="20px" width="20px" alt="" />
        </p>
      </div>
    </footer>
  );
};

export default Footer;
