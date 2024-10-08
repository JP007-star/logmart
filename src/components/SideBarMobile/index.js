import React, { useState } from 'react'
import { Nav} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTag, faUsers, faBox, faDashboard } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './style.module.css';
import { useNavigate } from 'react-router-dom';

/**
* @author
* @function SideBarMobile
**/

export const SideBarMobile = ({ activeNavLink }) => {
    const [isSidebarMinimized] = useState(false);


    const navigate=useNavigate();
    const handleLogout=()=>{
       navigate('/login')
    }

  return(
   
    <div className="fixed-bottom shadow  justify-content-between   d-md-none m-0 p-0">
     
        {/* Hide container on medium and larger screens */}
        <ul className="justify-content-between   m-0 p-0  bg-dark">
       
        <Nav className={`nav nav-pills`}>
              <Nav.Link
                href="/admin/home"
                className={` text-white ${styles.link} ${styles.line} ${activeNavLink === 'home' ? 'active' : ''}`}
              >
                <div className={`d-flex align-items-center m-3 justify-content-center ${isSidebarMinimized ? styles.iconOnly : ''}`}>
                  <FontAwesomeIcon icon={faHome}  />
                </div>
              </Nav.Link>
              <Nav.Link
                href="/admin/orders"
                className={`text-white d-flex align-items-center ${styles.link} ${styles.line} ${activeNavLink === 'orders' ? 'active' : ''}`}
              >
                <div className={`d-flex align-items-center m-2 justify-content-center ${isSidebarMinimized ? styles.iconOnly : ''}`}>
                  <FontAwesomeIcon icon={faTag}  />
                </div>
              </Nav.Link>
              <Nav.Link
               href="/admin/dashboard"
                className={`text-white d-flex align-items-center ${styles.link} ${styles.line} ${activeNavLink === 'dashboard' ? 'active' : ''}`}
              >
                <div className={`d-flex align-items-center m-2 justify-content-center ${isSidebarMinimized ? styles.iconOnly : ''}`} onClick={handleLogout}>
                  <FontAwesomeIcon icon={faDashboard}  />
                </div>
              </Nav.Link>
              <Nav.Link
                href="/admin/products"
                className={`text-white d-flex align-items-center ${styles.link} ${styles.line} ${activeNavLink === 'products' ? 'active' : ''}`}
              >
                <div className={`d-flex align-items-center m-2  justify-content-center ${isSidebarMinimized ? styles.iconOnly : ''}`}>
                  <FontAwesomeIcon icon={faBox}  />
                </div>
              </Nav.Link>
              
              <Nav.Link
                href="/admin/users"
                className={`text-white d-flex align-items-center ${styles.link} ${styles.line} ${activeNavLink === 'users' ? 'active' : ''}`}
              >
                <div className={`d-flex align-items-center m-3  justify-content-center ${isSidebarMinimized ? styles.iconOnly : ''}`}>
                  <FontAwesomeIcon icon={faUsers}  />
                </div>
              </Nav.Link>
             
            </Nav>
        </ul>
      </div>
    
   )

 }