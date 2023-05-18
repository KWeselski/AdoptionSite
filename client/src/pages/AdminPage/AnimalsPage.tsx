import Button from "../../components/Button";
import { AnimalData } from "../../mocks";
import { edit, trash } from "../../assets";
import Action from "../../components/Action";
import Pagination from "../../components/Pagination";
import Table from "../../components/Table";
import Filter from "../../components/Filters";

const AnimalsPage = ({ handleTab }) => {
  const onEdit = (id) => {};
  const onDelete = (id) => {};

  return (
    <div className="bg-white p-6 rounded-lg shadow">
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

      <Pagination values={AnimalData} perPage={8}>
        {(currentData) => (
          <Table>
            <Table.Row size={4}>
              <Table.Header>Name</Table.Header>
              <Table.Header>Breed</Table.Header>
              <Table.Header>Date Added</Table.Header>
              <Table.Header>Actions</Table.Header>
            </Table.Row>
            {currentData.map((request, index) => (
              <Table.Row size={4}>
                <Table.Cell primary>{request.name}</Table.Cell>
                <Table.Cell>{request.breed}</Table.Cell>
                <Table.Cell>{request.dateAdded}</Table.Cell>
                <Table.Actions>
                  <Action onClick={onEdit(1)} icon={edit} />
                  <Action onClick={onDelete(1)} icon={trash} />
                </Table.Actions>
              </Table.Row>
            ))}
          </Table>
        )}
      </Pagination>
    </div>
  );
};

export default AnimalsPage;
