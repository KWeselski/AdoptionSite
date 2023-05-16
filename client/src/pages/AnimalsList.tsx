import React, { useState } from "react";
import AnimalCard from "../components/AnimalCard";
import { AnimalData } from "../mocks";
import Filter from "../components/Filters";
import Button from "../components/Button";
import SectionHero from "../components/SectionHero";

const AnimalsList = () => {
  const [filters, setFilters] = useState({
    name: "",
    city: "",
    species: "Dog",
    gender: "Male",
    size: "Small",
    age: "",
    breed: "",
  });

  const handleChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <SectionHero
        title="Animals for adoption"
        description="Searching animals"
      />
      <div className="flex flex-wrap p-5">
        <div className="w-full md:w-1/4 p-3">
          <Filter label="What are you looking for?">
            <Filter.Input
              name="name"
              value={filters.name}
              onChange={handleChange}
            />
            <Filter.Input
              name="city"
              value={filters.city}
              onChange={handleChange}
            />
            <Filter.Select
              name="species"
              value={filters.species}
              onChange={handleChange}
              options={["Dog", "Cat", "Other"]}
            />
            <Filter.Select
              name="gender"
              value={filters.gender}
              onChange={handleChange}
              options={["Male", "Female"]}
            />
            <Filter.Select
              name="size"
              value={filters.size}
              onChange={handleChange}
              options={["Small", "Medium", "Large"]}
            />
            <Filter.Input
              name="age"
              value={filters.age}
              onChange={handleChange}
              numeric
            />
            <Filter.Input
              name="breed"
              value={filters.breed}
              onChange={handleChange}
            />
            <Button variant="primary">Search</Button>
          </Filter>
        </div>

        <div className="w-full md:w-3/4 p-3 flex flex-wrap gap-3">
          {AnimalData.map((animal, index) => (
            <AnimalCard key={index} {...animal} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AnimalsList;
