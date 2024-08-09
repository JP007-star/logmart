import React from 'react';
import './style.css'

const AddressForm = ({ address, onChange }) => {
  return (
    <div className="address-form">
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={address.name}
          onChange={onChange}
          required
        />
      </label>
      <label>
        Street Address:
        <input
          type="text"
          name="street"
          value={address.street}
          onChange={onChange}
          required
        />
      </label>
      <label>
        City:
        <input
          type="text"
          name="city"
          value={address.city}
          onChange={onChange}
          required
        />
      </label>
      <label>
        State:
        <input
          type="text"
          name="state"
          value={address.state}
          onChange={onChange}
          required
        />
      </label>
      <label>
        ZIP Code:
        <input
          type="text"
          name="zip"
          value={address.zip}
          onChange={onChange}
          required
        />
      </label>
    </div>
  );
};

export default AddressForm;
