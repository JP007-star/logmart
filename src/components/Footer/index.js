import React from "react";
import { useTheme } from "../ThemeContext";
import styles from "./style.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Unicons from '@iconscout/react-unicons';


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
            <a href="/" className="nav-link px-2 text-muted">
            </a>
          </li>
          
         
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-muted">
            <Unicons.UilApps />

            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-muted">
            <Unicons.UilBell />

            </a>
          </li>
          <li className="nav-item">
            <a href="/" className="nav-link px-2 text-muted">
             <Unicons.UilUser />
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-muted">
              <Unicons.UilShoppingCartAlt/>
            </a>
          </li>
        </ul>
      </div>
      <div className="container d-md-block"  style={menuStyle} >
        <p className="text-center text-muted m-2"  style={menuStyle} >© 2024 Copyright: JP made with Love 
        <img src="/images/heart.svg" height="20px" width="20px"/>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
             <Unicons.UilEstate />
