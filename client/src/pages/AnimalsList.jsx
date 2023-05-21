import { useEffect, useState } from 'react';

import axios from 'axios';

import {
  SectionHero,
  Filter,
  Button,
  PetsList,
  Pagination,
} from '../components';

const AnimalsList = () => {
  const [animals, setAnimals] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    city: '',
    species: '',
    gender: '',
    size: '',
    age: '',
    breed: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFilters({
      ...filters,
      [name]: value === 'All' ? '' : value,
    });
  };

  const handleSearch = async () => {
    const response = await axios.get('/api/animals', {
      params: filters,
    });
    setAnimals(response.data);
  };

  useEffect(() => {
    const fetchAnimals = async () => {
      const response = await axios.get('/api/animals');
      setAnimals(response.data);
    };
    fetchAnimals();
  }, []);

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
              options={['All', 'Dog', 'Cat']}
            />
            <Filter.Select
              name="gender"
              value={filters.gender}
              onChange={handleChange}
              options={['All', 'Male', 'Female']}
            />
            <Filter.Select
              name="size"
              value={filters.size}
              onChange={handleChange}
              options={['All', 'Small', 'Medium', 'Large']}
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
            <Button variant="primary" onClick={handleSearch}>
              Search
            </Button>
          </Filter>
        </div>
        <div className="w-full md:w-3/4">
          {animals && animals.length > 1 ? (
            <Pagination values={animals} perPage={6}>
              {(pets) => (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 w-full">
                  <PetsList pets={pets} />
                </div>
              )}
            </Pagination>
          ) : (
            <div className="w-full flex">Not found</div>
          )}
        </div>
      </div>
    </>
  );
};

export default AnimalsList;
