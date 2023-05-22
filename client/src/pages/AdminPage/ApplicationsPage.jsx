import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Pagination, Table, Loader, Paper } from '../../components';
import { fetchApplications } from '../../redux/actions/applications.js';
import AplicationReviewPage from './AplicationReviewPage';

const ApplicationsPage = () => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const dispatch = useDispatch();
  const applications = useSelector((state) => state.applications);

  useEffect(() => {
    dispatch(fetchApplications());
  }, [dispatch]);

  const handleCheck = (id) => {
    return () => {
      setOpen(true);
      setId(id);
    };
  };

  return (
    <Loader data={applications}>
      {(applications) => (
        <>
          {open ? (
            <AplicationReviewPage id={id} onClose={() => setOpen(false)} />
          ) : null}
          <Paper>
            <Pagination values={applications} perPage={8}>
              {(currentData, key) => (
                <Table>
                  <Table.Row key={key} size={5}>
                    <Table.Header>Name</Table.Header>
                    <Table.Header>Email</Table.Header>
                    <Table.Header>City</Table.Header>
                    <Table.Header>Applicant</Table.Header>
                    <Table.Header>Actions</Table.Header>
                  </Table.Row>
                  {currentData.map(
                    ({ _id, pet, personalInformation }, index) => (
                      <Table.Row key={index} size={5}>
                        <Table.Cell primary>{pet.name}</Table.Cell>
                        <Table.Cell>{personalInformation.email}</Table.Cell>
                        <Table.Cell>
                          {personalInformation.address.city}
                        </Table.Cell>
                        <Table.Cell>
                          {personalInformation.applicantName}
                        </Table.Cell>
                        <Table.Actions>
                          <Button variant="primary" onClick={handleCheck(_id)}>
                            Check
                          </Button>
                        </Table.Actions>
                      </Table.Row>
                    )
                  )}
                </Table>
              )}
            </Pagination>
          </Paper>
        </>
      )}
    </Loader>
  );
};

export default ApplicationsPage;
