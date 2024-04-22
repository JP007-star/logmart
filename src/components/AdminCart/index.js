import React from 'react';

/**
 * @author
 * @function AdminCart
 **/

import './style.module.css'

export const AdminCart = (props) => {
  return (
    <div  style={{maxHeight:"300px", overflowY:"scroll"}}>
      <div className="table-responsive">
        <table className="table">
          <thead >
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product</th>
              <th scope="col">Price ₹</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
         
          <tbody className="table-body"   >
            <tr>
              <th scope="row">1</th>
              <td>Product 1</td>
              <td>100</td>
              <td>2</td>
              <td>200</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Product 2</td>
              <td>150</td>
              <td>3</td>
              <td>450</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Product 2</td>
              <td>150</td>
              <td>3</td>
              <td>450</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Product 2</td>
              <td>150</td>
              <td>3</td>
              <td>450</td>
            </tr>
             <tr>
              <th scope="row">2</th>
              <td>Product 2</td>
              <td>150</td>
              <td>3</td>
              <td>450</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Product 3</td>
              <td>120</td>
              <td>1</td>
              <td>120</td>
            </tr>
          </tbody>
         
         
          <tfoot className="sticky-bottom">
            <tr>
              <th colSpan={4}>Grant Total</th>
              <td colSpan={2}>770</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
