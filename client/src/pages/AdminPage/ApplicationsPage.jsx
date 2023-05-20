import React, { useEffect, useState } from "react";
import AplicationReviewPage from "./AplicationReviewPage";
import { Button, Pagination, Table, Loader } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { fetchApplications } from "../../redux/actions/applications.js";

const ApplicationsPage = () => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const dispatch = useDispatch();
  const applications = useSelector((state) => state.applications);

  const onEdit = (id) => {};
  const onDelete = (id) => {};

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
          <div className="bg-white p-6 rounded-lg shadow">
            <Pagination values={applications} perPage={8}>
              {(currentData) => (
                <Table>
                  <Table.Row key={10} size={5}>
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
          </div>
        </>
      )}
    </Loader>
  );
};

export default ApplicationsPage;
