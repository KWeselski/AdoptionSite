import React from 'react';

import { styles } from '../styles';

const Button = ({ children, variant, onClick, type }) => {
  let buttonClass = '';

  if (variant === 'primary') {
    buttonClass = `bg-green-500 hover:bg-green-700 ${styles.button}`;
  } else if (variant === 'secondary') {
    buttonClass = `bg-gray-500 hover:bg-gray-700 ${styles.button}`;
  }

  return (
    <button className={buttonClass} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;
