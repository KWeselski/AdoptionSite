import { useState, useEffect } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { trash } from '../../assets';
import {
  Action,
  Button,
  Filter,
  Loader,
  Pagination,
  Paper,
  Table,
} from '../../components';
import { fetchPets, deletePet } from '../../redux/actions/pets.js';

const STATUS = {
  ADOPTED: 'Adopted',
  AVAILABLE: 'Available',
};

const AnimalsPage = ({ handleTab }) => {
  const dispatch = useDispatch();
  const pets = useSelector((state) => state.pets);
  const [filters, setFilters] = useState({
    name: '',
    breed: '',
    status: STATUS.AVAILABLE,
  });

  const handleChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };
  const filteredPets = pets.filter((pet) => {
    return (
      pet.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      pet.breed.toLowerCase().includes(filters.breed.toLowerCase()) &&
      pet.status === filters.status
    );
  });

  const onDelete = useCallback(
    async (id) => {
      dispatch(deletePet(id));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(fetchPets());
  }, [dispatch]);

  return (
    <Paper>
      <Loader data={filteredPets}>
        {(animals) => (
          <>
            <Filter.Row>
              <Filter.Header>
                <Filter.Input
                  name="name"
                  value={filters.name}
                  onChange={handleChange}
                />
                <Filter.Input
                  name="breed"
                  value={filters.breed}
                  onChange={handleChange}
                />
                <Filter.Select
                  name="status"
                  value={filters.status}
                  onChange={handleChange}
                  options={['Adopted', 'Available']}
                />
              </Filter.Header>
              <Button variant="primary" onClick={() => handleTab('addAnimal')}>
                Add animal
              </Button>
            </Filter.Row>
            <Pagination values={animals} perPage={8}>
              {(currentData, key) => (
                <Table>
                  <Table.Row size={4} key={key}>
                    <Table.Header>Name</Table.Header>
                    <Table.Header>Breed</Table.Header>
                    <Table.Header>Status</Table.Header>
                    <Table.Header>Actions</Table.Header>
                  </Table.Row>
                  {currentData.map(({ name, breed, status, _id }) => (
                    <Table.Row size={4} key={_id}>
                      <Table.Cell primary>{name}</Table.Cell>
                      <Table.Cell>{breed}</Table.Cell>
                      <Table.Cell>{status}</Table.Cell>
                      <Table.Actions>
                        {status === STATUS.AVAILABLE && (
                          <Action
                            variant="primary"
                            icon={trash}
                            onClick={() => onDelete(_id)}
                          />
                        )}
                      </Table.Actions>
                    </Table.Row>
                  ))}
                </Table>
              )}
            </Pagination>
          </>
        )}
      </Loader>
    </Paper>
  );
};

export default AnimalsPage;
