import React from "react";
import Footer from "../Footer";
import { useTheme } from "../ThemeContext";
import styles from "./style.module.css";
import SideBar from "../SideBar";
import AdminHeader from "../AdminHeader";
import * as Unicons from "@iconscout/react-unicons";
import { Form } from "react-bootstrap";

export const AdminContainer = (props) => {
  const { isDarkTheme, toggleTheme } = useTheme();

  const product = {
    name: "product",
    price: "100",
    imageUrl: "https://placehold.co/500x300.jpg",
  };
  const products = [product, product];
  const images = [
    "https://placehold.co/1400x300.jpg",
    "https://placehold.co/1200x300.jpg",
    "https://placehold.co/1300x300.jpg",
  ];

  return (
    <div className={isDarkTheme ? styles.darkContainer : styles.lightContainer}>
      <AdminHeader />

      <div className="row col-12 ">
        <SideBar className="col-2 " />
        <div className="row col-10  h-25 justify-content-between">
          <div
            className="card text-white ms-lg-3  bg-primary "
            style={{ maxWidth: "13rem" }}
          >
            <div className="card-header h3 text-lg-center ">
              <Unicons.UilUser /> Users
            </div>
            <div className="card-body  h3">5</div>
          </div>

          <div
            className="card text-black bg-warning "
            style={{ maxWidth: "13rem" }}
          >
            <div className="card-header h3">
              {" "}
              <Unicons.UilTag /> Orders
            </div>
            <div className="card-body h3">100</div>
          </div>

          <div
            className="card text-white bg-danger "
            style={{ maxWidth: "13rem" }}
          >
            <div className="card-header h3">
              {" "}
              <Unicons.UilUtensils /> Products
            </div>
            <div className="card-body h3">50</div>
          </div>

          <div
            className="card text-white bg-secondary "
            style={{ maxWidth: "13rem" }}
          >
            <div className="card-header h3">
              {" "}
              <Unicons.UilBill />
              Bills
            </div>
            <div className="card-body h3">100</div>
          </div>

          <div className="row justify-content-evenly pt-lg-3 mt-lg-3">
            <div className="card col-lg-5">
              <div className="card-body">
                <form>
                <label htmlFor="formGroupExampleInput">Product</label>
                  <Form.Select size="sm">
                    <option>Small select</option>
                  </Form.Select>
                  <div className="form-group">
                    <label htmlFor="formGroupExampleInput">Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      id="formGroupExampleInput"
                      placeholder="Example label"
                    />
                  </div>
                  
                </form>
              </div>
            </div>
            <div className="card col-lg-5">
              <div className="card-body"></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
