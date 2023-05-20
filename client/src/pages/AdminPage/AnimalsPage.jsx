import { edit, trash } from "../../assets";
import { Action, Button, Filter, Loader, Pagination, Table } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { fetchPets, deletePet } from "../../redux/actions/pets.js";
import { useState, useEffect } from "react";
import { useCallback } from "react";

const AnimalsPage = ({ handleTab }) => {
  const dispatch = useDispatch();
  const pets = useSelector((state) => state.pets);
  const [filters, setFilters] = useState({
    name: "",
    breed: "",
    status: "Available",
  });

  const handleChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };
  const filteredPets = pets.filter((pet) => {
    return pet.name.toLowerCase().includes(filters.name.toLowerCase()) && pet.breed.toLowerCase().includes(filters.breed.toLowerCase()) && pet.status === filters.status;
  });

  const onEdit = (id) => {};

  const onDelete = useCallback(async (id) => {
    try {
      dispatch(deletePet(id));
    }
    catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchPets());
  }, [dispatch]);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <Loader data={filteredPets}>
        {(animals) => (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-center p-4">
              <Filter.Header>
                <Filter.Input name="name" value={filters.name} onChange={handleChange} />
                <Filter.Input name="breed" value={filters.breed} onChange={handleChange} />
                <Filter.Select name="status" value={filters.status} onChange={handleChange} options={['Adopted', 'Available']} />
              </Filter.Header>
              <Button variant="primary" onClick={() => handleTab("addAnimal")}>
                Add animal
              </Button>
            </div>
            <Pagination values={animals} perPage={8}>
              {(currentData) => (
                <Table>
                  <Table.Row size={4}>
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
                        <Action onClick={() => onEdit(_id)} icon={edit} />
                        <Action onClick={() => onDelete(_id)} icon={trash} />
                      </Table.Actions>
                    </Table.Row>
                  ))}
                </Table>
              )}
            </Pagination>
          </>
        )}
      </Loader>
    </div>
  );
};

export default AnimalsPage;
