// components/ProductSlider.js
import React, { useState } from "react";
import styles from "./style.module.css"; // Import the CSS Module
import ProductCard from "../ProductCard";

const ProductSlider = ({ products }) => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  const nextProduct = () => {
    setCurrentProductIndex((prevIndex) =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevProduct = () => {
    setCurrentProductIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={styles.productSliderContainer}>
      <div className={styles.productSlider}>
        {products.map((product, index) => (
          <div
            key={index}
            className={`${styles.productSlide} ${
              index === currentProductIndex ? styles.active : ""
            }`}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      <div className={styles.arrows}>
        <button className={styles.arrow} onClick={prevProduct}>
          &lt;
        </button>
        <button className={styles.arrow} onClick={nextProduct}>
          &gt;
        </button>
          {/* User Dropdown 1 */}
          <Dropdown className={`m-3 float-start justify-content-center ${styles.dropdown} ${isSidebarMinimized ? 'dropup' : ''}`}>
            <Dropdown.Toggle
              id="dropdownUser1"
              className="justify-content-center text-white text-decoration-none dropdown-toggle"
              variant="dark"
              bsPrefix="dropdown-toggle"
            >
              Profile {'  '}
              <FontAwesomeIcon icon={faUser} size={isSidebarMinimized ? '2x' : 'lg'} />
            </Dropdown.Toggle>
            <Dropdown.Menu className="m-5 dropdown-menu-dark text-small shadow">
              <Dropdown.Item href="#" className={styles.dropdownItem}>
                New project...
              </Dropdown.Item>
              <Dropdown.Item href="#" className={styles.dropdownItem}>
                Settings
              </Dropdown.Item>
              <Dropdown.Item href="#" className={styles.dropdownItem}>
                Profile
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#" className={styles.dropdownItem}>
                Sign out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* Another User Dropdown */}
          <Dropdown className={`line float-start ${styles.dropdown} ${isSidebarMinimized ? 'dropup m-5' : 'm-5'}`} onClick={handleLogoClick}>
            <Dropdown.Toggle
              id="dropdownUser2"
              className=" text-white text-decoration-none dropdown-toggle"
              variant="primary"
              bsPrefix="dropdown-toggle"
            >
              <FontAwesomeIcon icon={faSignOut} size={isSidebarMinimized ? '2x' : 'lg'} />
            </Dropdown.Toggle>
            {/* Dropdown content for the second dropdown */}
            <Dropdown.Menu className="m-5 dropdown-menu-dark text-small shadow">
              <Dropdown.Item href="#" className={styles.dropdownItem}>
                Another dropdown item...
              </Dropdown.Item>
              {/* Add more dropdown items as needed */}
            </Dropdown.Menu>
          </Dropdown>
      </div>
    </div>
  );
};

export default ProductSlider;
