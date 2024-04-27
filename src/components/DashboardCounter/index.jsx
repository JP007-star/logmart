import React from "react";
import * as Unicons from "@iconscout/react-unicons";

/**
 * @author
 * @function DashboardCounter
 **/

export const DashboardCounter = ({ initialData }) => {
  return (
    <>
      <div className="row p-2 justify-content-between">
        <div
          className="card text-white ms-lg-3  bg-primary "
          style={{ maxWidth: "13rem" }}
        >
          <div className="card-header h3 text-lg-center ">
            <Unicons.UilUser /> Users
          </div>
          <div className="card-body  h3">{initialData.users.length}</div>
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
          <div className="card-body h3">{initialData.products.length}</div>
        </div>

        <div
          className="card text-white bg-secondary "
          style={{ maxWidth: "13rem" }}
        >
          <div className="card-header h3">
            {" "}
            <Unicons.UilBill />
            Invoice
          </div>
          <div className="card-body h3">100</div>
        </div>
      </div>
    </>
  );
};
