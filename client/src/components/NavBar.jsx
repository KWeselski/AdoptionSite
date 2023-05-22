import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { logo, close, menu } from '../assets';
import { navLinks } from '../constants';
import { styles } from '../styles';
import Button from './Button';

const Navbar = () => {
  const [toogle, setToogle] = useState(false);
  const token = useSelector((state) => state.auth.token);

  return (
    <div className={`${styles.flexBetween} w-full py-6`}>
      <Link to="/">
        <img src={logo} alt="pawsAdoption" className="w-[64px] h-[64px]" />
      </Link>
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((link, index) => (
          <li
            key={index}
            className="text-green-700 hover:text-green-400 text-[18px] font-bold mr-10"
          >
            <a href={link.url}>{link.title}</a>
          </li>
        ))}
        {token ? (
          <Link to="/profile">
            <Button variant="primary">Profile</Button>
          </Link>
        ) : null}
        <Link to="/login">
          <Button variant="primary">{token ? 'Logout' : 'Sign Up'}</Button>
        </Link>
      </ul>
      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toogle ? close : menu}
          alt="menu"
          className="w-[48px] h-[48px] object-contain"
          onClick={() => setToogle((prev) => !prev)}
        />
      </div>
    </div>
  );
};

export default Navbar;
