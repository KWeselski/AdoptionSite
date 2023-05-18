import React, { useState } from "react";
import Button from "../../components/Button";
import { adoptionRequests } from "../../mocks";
import Pagination from "../../components/Pagination";
import Table from "../../components/Table";
import AplicationReviewPage from "./AplicationReviewPage";

const ApplicationsPage = () => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0);
  const handleCheck = (id) => {
    return () => {
      setOpen(true);
      setId(id);
    };
  };

  return (
    <>
      {open ? (
        <AplicationReviewPage id={id} onClose={() => setOpen(false)} />
      ) : null}
      <div className="bg-white p-6 rounded-lg shadow">
        <Pagination values={adoptionRequests} perPage={8}>
          {(currentData) => (
            <Table>
              <Table.Row key={10} size={5}>
                <Table.Header>Name</Table.Header>
                <Table.Header>Email</Table.Header>
                <Table.Header>City</Table.Header>
                <Table.Header>Applicant</Table.Header>
                <Table.Header>Actions</Table.Header>
              </Table.Row>
              {currentData.map((request, index) => (
                <Table.Row key={index} size={5}>
                  <Table.Cell primary>{request.name}</Table.Cell>
                  <Table.Cell>{request.email}</Table.Cell>
                  <Table.Cell>{request.city}</Table.Cell>
                  <Table.Cell>{request.applicantName}</Table.Cell>
                  <Table.Actions>
                    <Button variant="primary" onClick={handleCheck(index)}>
                      Check
                    </Button>
                  </Table.Actions>
                </Table.Row>
              ))}
            </Table>
          )}
        </Pagination>
      </div>
    </>
  );
};

export default ApplicationsPage;
