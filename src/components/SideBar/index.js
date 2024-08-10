import React, { useState, useEffect } from 'react';
import { Nav, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTag, faCutlery, faUsers } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './style.module.css';

const SideBar = ({ activeNavLink }) => {
  const [isSidebarMinimized, setSidebarMinimized] = useState(false);

  const handleLogoClick = () => {
    setSidebarMinimized(!isSidebarMinimized);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSidebarMinimized(true);
      } else {
        setSidebarMinimized(false);
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`${styles.sidebar} shadow-lg rounded bg-dark ${isSidebarMinimized ? styles.minimized : ''}`}>
      <div className={styles.logo} onClick={handleLogoClick}>
        <img
          src={`${isSidebarMinimized ? '/images/logo_light_mini.png' : '/images/logo_light.png'}`}
          alt="Logo"
        />
      </div>
      <Row className="flex-grow-1">
        <Col xs={12} className="p-0">
          <Nav className={`nav nav-pills flex-column mb-auto w-100 ${isSidebarMinimized ? 'flex-row' : ''}`}>
            <Nav.Link
              href="/admin/home"
              className={`text-white d-flex align-items-center ${styles.link} ${styles.line} ${activeNavLink === 'home' ? 'active' : ''}`}
            >
              <div className={`d-flex align-items-center m-3 justify-content-center ${isSidebarMinimized ? styles.iconOnly : ''}`}>
                <FontAwesomeIcon icon={faHome} size={isSidebarMinimized ? '2x' : 'lg'} />
              </div>
              {!isSidebarMinimized && <span className="ms-2">Home</span>}
            </Nav.Link>
            <Nav.Link
              href="/admin/orders"
              className={`text-white d-flex align-items-center ${styles.link} ${styles.line} ${activeNavLink === 'orders' ? 'active' : ''}`}
            >
              <div className={`d-flex align-items-center m-3 justify-content-center ${isSidebarMinimized ? styles.iconOnly : ''}`}>
                <FontAwesomeIcon icon={faTag} size={isSidebarMinimized ? '2x' : 'lg'} />
              </div>
              {!isSidebarMinimized && <span className="ms-2">Orders</span>}
            </Nav.Link>
            <Nav.Link
              href="/admin/products"
              className={`text-white d-flex align-items-center ${styles.link} ${styles.line} ${activeNavLink === 'products' ? 'active' : ''}`}
            >
              <div className={`d-flex align-items-center m-3 justify-content-center ${isSidebarMinimized ? styles.iconOnly : ''}`}>
                <FontAwesomeIcon icon={faCutlery} size={isSidebarMinimized ? '2x' : 'lg'} />
              </div>
              {!isSidebarMinimized && <span className="ms-2">Products</span>}
            </Nav.Link>
            <Nav.Link
              href="/admin/users"
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
  );
};

export default SideBar;
