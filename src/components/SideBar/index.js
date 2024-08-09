// SideBar.js

import React, { useState, useEffect } from 'react';
import { Nav, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTag, faCutlery, faUsers, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './style.module.css';

const SideBar = ({ activeNavLink }) => {
  const [isSidebarMinimized, setSidebarMinimized] = useState(false);

  const handleLogoClick = () => {
    setSidebarMinimized(!isSidebarMinimized);
  };

  useEffect(() => {
    // Add an event listener to handle window resize
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSidebarMinimized(true);
      } else {
        setSidebarMinimized(false);
      }
    };

    // Attach the event listener
    window.addEventListener('resize', handleResize);

    // Initial check on component mount
    handleResize();

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures the effect runs only on mount and unmount

  return (
    <>
      <div className={`${styles.sidebar} shadow-lg rounded bg-dark ${isSidebarMinimized ? styles.minimized : ''}`}>
        <div className={styles.logo} onClick={handleLogoClick}>
          <img
           
            src={`${isSidebarMinimized ? '/images/logo_light_mini.png' : '/images/logo_light.png'}`}
            alt="Description"
            width={500}
            height={300}
          />
        </div>
        <Row className="flex-grow-1">
          <Col xs={12} className="p-0">
            {/* Navigation */}
            <Nav className={`nav nav-pills flex-column mb-auto w-100 ${isSidebarMinimized ? 'flex-row' : ''}`}>
              <Nav.Link
                href="/admin/dashboard"
                className={`text-white d-flex align-items-center ${styles.link} ${styles.line} ${activeNavLink === 'home' ? 'active' : ''}`}
              >
                <div className={`d-flex align-items-center m-3 justify-content-center ${isSidebarMinimized ? styles.iconOnly : ''}`}>
                  <FontAwesomeIcon icon={faHome} size={isSidebarMinimized ? '2x' : 'lg'} />
                </div>
                {!isSidebarMinimized && <span className="ms-2">Home</span>}
              </Nav.Link>
              <Nav.Link
                href="/admin/order/orders"
                className={`text-white d-flex align-items-center ${styles.link} ${styles.line} ${activeNavLink === 'orders' ? 'active' : ''}`}
              >
                <div className={`d-flex align-items-center m-3 justify-content-center ${isSidebarMinimized ? styles.iconOnly : ''}`}>
                  <FontAwesomeIcon icon={faTag} size={isSidebarMinimized ? '2x' : 'lg'} />
                </div>
                {!isSidebarMinimized && <span className="ms-2">Orders</span>}
              </Nav.Link>
              <Nav.Link
                href="/admin/product/products"
                className={`text-white d-flex align-items-center ${styles.link} ${styles.line} ${activeNavLink === 'products' ? 'active' : ''}`}
              >
                <div className={`d-flex align-items-center m-3 justify-content-center ${isSidebarMinimized ? styles.iconOnly : ''}`}>
                  <FontAwesomeIcon icon={faCutlery} size={isSidebarMinimized ? '2x' : 'lg'} />
                </div>
                {!isSidebarMinimized && <span className="ms-2">Products</span>}
              </Nav.Link>
              <Nav.Link
                href="/admin/user/users"
                className={`text-white d-flex align-items-center ${styles.link} ${styles.line} ${activeNavLink === 'users' ? 'active' : ''}`}
              >
                <div className={`d-flex align-items-center m-3 justify-content-center ${isSidebarMinimized ? styles.iconOnly : ''}`}>
                  <FontAwesomeIcon icon={faUsers} size={isSidebarMinimized ? '2x' : 'lg'} />
                </div>
                {!isSidebarMinimized && <span className="ms-2">Customers</span>}
              </Nav.Link>
            </Nav>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SideBar;
