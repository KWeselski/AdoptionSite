import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { adoptionRequests } from "../../mocks";
import Pagination from "../../components/Pagination";
import Table from "../../components/Table";
import AplicationReviewPage from "./AplicationReviewPage";
import axios from "axios";

const ApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);

  const handleCheck = (id) => {
    return () => {
      setOpen(true);
      setId(id);
    };
  };

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get("api/applications", {
          params: {
            partial: true,
          },
        });
        setApplications(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
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
              {currentData.map(({ _id, pet, personalInformation }, index) => (
                <Table.Row key={index} size={5}>
                  <Table.Cell primary>{pet.name}</Table.Cell>
                  <Table.Cell>{personalInformation.email}</Table.Cell>
                  <Table.Cell>{personalInformation.address.city}</Table.Cell>
                  <Table.Cell>{personalInformation.applicantName}</Table.Cell>
                  <Table.Actions>
                    <Button variant="primary" onClick={handleCheck(_id)}>
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
