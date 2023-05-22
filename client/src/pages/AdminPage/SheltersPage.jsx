import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { edit, trash } from '../../assets';
import {
  Action,
  Button,
  Filter,
  Loader,
  Pagination,
  Paper,
  Table,
} from '../../components';
import { useShelters } from '../../hooks';
import { deleteShelter } from '../../redux/actions/shelters.js';

const SheltersPage = ({ handleTab }) => {
  const dispatch = useDispatch();
  const shelters = useShelters();
  const [filters, setFilters] = useState({
    name: '',
    city: '',
  });
  const handleChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };
  const filteredShelters = shelters.filter((shelter) => {
    return (
      shelter.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      shelter.address.city.toLowerCase().includes(filters.city.toLowerCase())
    );
  });

  const onDelete = async (id) => dispatch(deleteShelter(id));

  return (
    <Loader data={filteredShelters}>
      {(shelters) => (
        <Paper>
          <Filter.Row>
            <Filter.Header>
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
            </Filter.Header>
            <Button variant="primary" onClick={() => handleTab('addShelter')}>
              Add shelter
            </Button>
          </Filter.Row>
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
                {currentData.map(
                  ({ name, address, email, phoneNumber, _id }, index) => (
                    <Table.Row size={4} key={index}>
                      <Table.Cell primary>{name}</Table.Cell>
                      <Table.Cell>{address.city}</Table.Cell>
                      <Table.Cell>{email}</Table.Cell>
                      <Table.Cell>{phoneNumber}</Table.Cell>
                      <Table.Actions>
                        <Action
                          onClick={() => handleTab('editShelter', _id)}
                          icon={edit}
                        />
                        <Action onClick={() => onDelete(_id)} icon={trash} />
                      </Table.Actions>
                    </Table.Row>
                  )
                )}
              </Table>
            )}
          </Pagination>
        </Paper>
      )}
    </Loader>
  );
};

export default SheltersPage;
