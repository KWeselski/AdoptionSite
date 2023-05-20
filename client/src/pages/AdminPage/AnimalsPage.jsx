import Button from "../../components/Button";
import { AnimalData } from "../../mocks";
import { edit, trash } from "../../assets";
import Action from "../../components/Action";
import Pagination from "../../components/Pagination";
import Table from "../../components/Table";
import Filter from "../../components/Filters";
import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchPets } from "../../redux/actions/pets.js";
import { useEffect } from "react";

const AnimalsPage = ({ handleTab }) => {
  const dispatch = useDispatch();
  const pets = useSelector((state) => state.pets);
  const onEdit = (id) => {};
  const onDelete = (id) => {};

  useEffect(() => {
    if (!pets || pets.length === 0) {
      dispatch(fetchPets());
    }
  }, [dispatch]);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <Loader data={pets}>
        {(animals) => (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-center p-4">
              <Filter.Header>
                <Filter.Input name="name" value={""} onChange={onDelete} />
                <Filter.Input name="breed" value={""} onChange={onDelete} />
                <Filter.Input name="date" value={""} onChange={onDelete} />
                <Button variant="primary">Search</Button>
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
                  {currentData.map(({ name, breed, status, _id }, index) => (
                    <Table.Row size={4} key={index}>
                      <Table.Cell primary>{name}</Table.Cell>
                      <Table.Cell>{breed}</Table.Cell>
                      <Table.Cell>{status}</Table.Cell>
                      <Table.Actions>
                        <Action onClick={onEdit(_id)} icon={edit} />
                        <Action onClick={onDelete(_id)} icon={trash} />
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
