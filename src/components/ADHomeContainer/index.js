import React from "react";
import Footer from "../Footer";
import { useTheme } from "../ThemeContext";
import styles from "./style.module.css";
import SideBar from "../SideBar";
import AdminHeader from "../AdminHeader";

const ADHomeContainer= (props) => {
  const { isDarkTheme } = useTheme();
  return (
    <div className={isDarkTheme ? styles.darkContainer : styles.lightContainer}>
      <AdminHeader />

      <div className="row col-12 ">
        <SideBar className="col-2 mt-5" />
        <div className="row col-10  h-25 justify-content-between">
          <div
            className="card text-white bg-primary "
            style={{ maxWidth: "13rem" }}
          >
            <div className="card-header">Users</div>
            <div className="card-body">5</div>
          </div>

          <div
            className="card text-white bg-warning "
            style={{ maxWidth: "13rem" }}
          >
            <div className="card-header">Orders</div>
            <div className="card-body">100</div>
          </div>

          <div
            className="card text-white bg-danger "
            style={{ maxWidth: "13rem" }}
          >
            <div className="card-header">Orders</div>
            <div className="card-body">100</div>
          </div>

          <div
            className="card text-white bg-secondary "
            style={{ maxWidth: "13rem" }}
          >
            <div className="card-header">Orders</div>
            <div className="card-body">100</div>
          </div>



          

          
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ADHomeContainer;