import React, { useState, useEffect } from "react";
import axios from "axios";
import AnimalCard from "./AnimalCard";

const PetsList = ({ partial = false, limit, filters }) => {
  const [loading, setLoading] = useState(true);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const getPets = async () => {
      try {
        const response = await axios.get("/api/animals", {
          params: {
            partial: partial,
            limit: limit ? { ...limit } : null,
          },
        });
        const data = response.data;
        setPets(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
      getPets();

  }, [partial, limit, filters]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {pets.map((pet) => (
        <AnimalCard key={pet._id} {...pet} />
      ))}
    </>
  );
};

export default PetsList;
