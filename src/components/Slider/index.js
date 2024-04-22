// components/Slider.js
import React, { useState } from "react";
import styles from "./style.module.css"; // Import the CSS Module

const Slider = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  return (
    <div className={styles.sliderContainer}>
      <img
        src={images[currentImageIndex]}
        alt={`Slide ${currentImageIndex + 1}`}
        className={styles.sliderImage}
      />
      <div className={styles.arrows}>
        <button className={styles.arrow} onClick={prevImage}>
          &lt;
        </button>
        <button className={styles.arrow} onClick={nextImage}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Slider;
