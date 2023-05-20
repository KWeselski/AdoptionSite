import React, { useState, useEffect } from "react";
import AnimalCard from "./AnimalCard";


const PetsList = ({ pets }) =>  (
    <>
      {pets.map((pet) => (
        <AnimalCard key={pet._id} {...pet} />
      ))}
    </>
  );

export default PetsList;
