// Switch.js
import React from 'react';
import styles from './style.module.css'; // Import CSS module for styling

const Switch = ({ checked, onChange }) => {
  return (
    <label className={styles.switch}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className={styles.slider}></span>
    </label>
  );
};

export default Switch;
