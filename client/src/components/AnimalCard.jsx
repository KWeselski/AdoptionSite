import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { styles } from '../styles';

const AnimalCard = ({ _id, image, name, city, age, size }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={`${styles.flexBetween} flex-col max-w-sm mx-auto bg-white shadow-md rounded-tl-lg rounded-tr-lg hover:shadow-lg w-[240px] transform transition duration-500 ease-in-out hover:scale-105 cursor-pointer`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex-shrink-0 relative ">
        <img
          className="w-full object-contain h-[360px] rounded-tl-lg rounded-tr-lg"
          src={image}
          alt={name}
        />
        <div className="absolute top-2 left-2 bg-green-600 opacity-90 text-white font-bold py-1 px-2 rounded">
          <span className="text-xs">{city}</span>
        </div>
        {hover && (
          <div
            className={`${styles.flexCenter} flex-col absolute bottom-0 opacity-80 bg-white text-black py-1 px-2 h-full w-full`}
          >
            <span className="text-xl">
              <span className="font-bold">Name:</span> {name}
            </span>
            <span className="text-xl">
              <span className="font-bold">Age:</span> {age}
            </span>
            <span className="text-xl">
              <span className="font-bold">Size:</span> {size}
            </span>
          </div>
        )}
      </div>
      <div className="p-2">
        <Link to={`/animals/${_id}`}>
          <p
            className={`text-xl font-medium ${
              hover ? 'text-green-400' : 'text-black'
            }`}
          >
            {name}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default AnimalCard;
