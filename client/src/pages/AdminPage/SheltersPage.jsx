import { edit, trash } from "../../assets";
import axios from "axios";
import { Action, Button, Filter, Loader, Pagination, Table } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { fetchShelters, deleteShelter } from "../../redux/actions/shelters.js";
import { useEffect , useState} from "react";

const SheltersPage = ({ handleTab }) => {
  const dispatch = useDispatch();
  const shelters = useSelector((state) => state.shelters);
  const [filters, setFilters] = useState({
    name: "",
    city: "",
  });
  const handleChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };
  const filteredShelters = shelters.filter((shelter) => {
    return shelter.name.toLowerCase().includes(filters.name.toLowerCase()) && shelter.address.city.toLowerCase().includes(filters.city.toLowerCase());
  });

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
    <Loader data={filteredShelters}>
      {(shelters) => (
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex flex-col sm:flex-row justify-between items-center p-4">
            <Filter.Header>
              <Filter.Input name="name" value={filters.name} onChange={handleChange} />
              <Filter.Input name="city" value={filters.city} onChange={handleChange} />
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
                {currentData.map(({name, address, email, phoneNumber, _id}, index) => (
                  <Table.Row size={4} key={index}>
                    <Table.Cell primary>{name}</Table.Cell>
                    <Table.Cell>{address.city}</Table.Cell>
                    <Table.Cell>{email}</Table.Cell>
                    <Table.Cell>{phoneNumber}</Table.Cell>
                    <Table.Actions>
                      <Action onClick={onEdit(_id)} icon={edit} />
                      <Action
                        onClick={() => onDelete(_id)}
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
