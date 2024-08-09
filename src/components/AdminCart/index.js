import React from 'react';
import './style.css';

export const AdminCart = (props) => {
  const items = [
    { id: 1, product: 'Product 1', price: 100, quantity: 2, total: 200 },
    { id: 2, product: 'Product 2', price: 150, quantity: 3, total: 450 },
    { id: 3, product: 'Product 2', price: 150, quantity: 3, total: 450 },
    { id: 4, product: 'Product 2', price: 150, quantity: 3, total: 450 },
    { id: 5, product: 'Product 2', price: 150, quantity: 3, total: 450 },
    { id: 6, product: 'Product 3', price: 120, quantity: 1, total: 120 },
  ];

  const grandTotal = items.reduce((acc, item) => acc + item.total, 0);

  return (
    <div className="cart-table-wrapper">
        <table className="cart-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.product}</td>
                <td>₹{item.price}</td>
                <td>{item.quantity}</td>
                <td>₹{item.total}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4">Grand Total:</td>
              <td>₹{grandTotal}</td>
            </tr>
          </tfoot>
        </table>
    </div>
  );
};
