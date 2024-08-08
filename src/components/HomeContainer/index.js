import React from "react";
import Header from "../Header";
import Slider from "../Slider";
import Footer from "../Footer";
import { useTheme } from "../ThemeContext";
import styles from "./style.module.css";
import ProductUserCard from "../ProductUserCard";

export const HomeContainer = (props) => {
  const { isDarkTheme } = useTheme();

  const images = [
    "https://placehold.co/1400x300.jpg",
    "https://placehold.co/1200x300.jpg",
    "https://placehold.co/1300x300.jpg",
  ];

  return (
    <div className={isDarkTheme ? styles.darkContainer : styles.lightContainer}>
      <Header />
      <div className={styles.contentWrapper}>
        <Slider className="d-none d-md-block" images={images} />
        <ProductUserCard/>
       
        {/* Add more content as needed */}
      </div>
      <Footer />
    </div>
  );
};
