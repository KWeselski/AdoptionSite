import Button from "../../components/Button";
import { edit, trash } from "../../assets";
import Action from "../../components/Action";
import Pagination from "../../components/Pagination";
import Table from "../../components/Table";
import Filter from "../../components/Filters";
import axios from "axios";
import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchShelters, deleteShelter } from "../../redux/actions/shelters.js";
import { useEffect } from "react";

const SheltersPage = ({ handleTab }) => {
  const dispatch = useDispatch();
  const shelters = useSelector((state) => state.shelters);
  const onEdit = (id) => {};
  const onDelete = async (id) => {
    try {
      await axios.delete(`api/shelters/${id}`);
      dispatch(deleteShelter(id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(fetchShelters());
  }, [dispatch]);

  return (
    <Loader data={shelters}>
      {(shelters) => (
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex flex-col sm:flex-row justify-between items-center p-4">
            <Filter.Header>
              <Filter.Input name="name" value={""} onChange={onDelete} />
              <Filter.Input name="city" value={""} onChange={onDelete} />
              <Button variant="primary">Search</Button>
            </Filter.Header>
            <Button variant="primary" onClick={() => handleTab("addShelter")}>
              Add shelter
            </Button>
          </div>
          <Pagination values={shelters} perPage={8}>
            {(currentData) => (
              <Table>
                <Table.Row size={4}>
                  <Table.Header>Name</Table.Header>
                  <Table.Header>City</Table.Header>
                  <Table.Header>Email</Table.Header>
                  <Table.Header>Phone Number</Table.Header>
                  <Table.Header>Actions</Table.Header>
                </Table.Row>
                {currentData.map((request, index) => (
                  <Table.Row size={4} key={index}>
                    <Table.Cell primary>{request.name}</Table.Cell>
                    <Table.Cell>{request.city}</Table.Cell>
                    <Table.Cell>{request.email}</Table.Cell>
                    <Table.Cell>{request.phoneNumber}</Table.Cell>
                    <Table.Actions>
                      <Action onClick={onEdit(request._id)} icon={edit} />
                      <Action
                        onClick={() => onDelete(request._id)}
                        icon={trash}
                      />
                    </Table.Actions>
                  </Table.Row>
                ))}
              </Table>
            )}
          </Pagination>
        </div>
      )}
    </Loader>
  );
};

export default SheltersPage;
