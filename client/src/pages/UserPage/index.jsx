import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { trash } from '../../assets';
import {
  Table,
  Action,
  Pagination,
  Paper,
  SectionHero,
  Button,
} from '../../components';
import {
  deleteApplicationById,
  fetchUserApplications,
} from '../../redux/actions/applications';
import ApplicationReviewPage from '../AdminPage/ApplicationReviewPage';

const UserPage = () => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const dispatch = useDispatch();

  const applications = useSelector((state) => state.applications);

  useEffect(() => {
    dispatch(fetchUserApplications());
  }, [dispatch]);

  const handleDelete = (id) => dispatch(deleteApplicationById(id));

  const handleCheck = (id) => {
    return () => {
      setOpen(true);
      setId(id);
    };
  };

  return (
    <div className="container mx-auto py-8">
      <SectionHero
        title="User dashboard"
        description={'Manage yours applications'}
      />
      <ApplicationReviewPage
        isOpen={open}
        id={id}
        onClose={() => setOpen(false)}
      />
      <Paper>
        <Pagination values={applications} perPage={8}>
          {(currentData, key) => (
            <Table>
              <Table.Row key={key} size={5}>
                <Table.Header>Name</Table.Header>
                <Table.Header>Status</Table.Header>
                <Table.Header>Actions</Table.Header>
              </Table.Row>
              {currentData.map(({ _id, pet, status }, index) => (
                <Table.Row key={index} size={5}>
                  <Table.Cell primary>
                    <Link to={`/animals/${pet._id}`}>{pet.name}</Link>
                  </Table.Cell>
                  <Table.Cell>{status}</Table.Cell>
                  <Table.Actions>
                    {status === 'Pending' ? (
                      <Action
                        variant="primary"
                        icon={trash}
                        onClick={() => handleDelete(_id)}
                      />
                    ) : (
                      <Button variant="primary" onClick={handleCheck(_id)}>
                        Check
                      </Button>
                    )}
                  </Table.Actions>
                </Table.Row>
              ))}
            </Table>
          )}
        </Pagination>
      </Paper>
    </div>
  );
};

export default UserPage;
