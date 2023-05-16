import { useState } from "react";
import SectionHero from "../components/SectionHero";
import Button from "../components/Button";
import { AnimalData, adoptionRequests } from "../mocks";
import { edit, trash } from "../assets";
import Action from "../components/Action";
import Pagination from "../components/Pagination";
import Table from "../components/Table";

const Tabs = {
  DOGS: "dogs",
  APPLICATIONS: "applications",
};

const AnimalsPage = () => {
  const onEdit = (id) => {};
  const onDelete = (id) => {};

  return (
    <div className="bg-white p-6 rounded-lg shadow">
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

const ApplicationsPage = () => {
  const handleCheck = (id) => {};

  return (
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
                  <Button variant="primary" onClick={handleCheck(1)}>
                    Check
                  </Button>
                </Table.Actions>
              </Table.Row>
            ))}
          </Table>
        )}
      </Pagination>
    </div>
  );
};

const AdminPage = () => {
  const initialTabs = [
    { id: Tabs.DOGS, label: "Manage animals", component: <AnimalsPage /> },
    {
      id: Tabs.APPLICATIONS,
      label: "Manage applications",
      component: <ApplicationsPage />,
    },
  ];
  const [activeTab, setActiveTab] = useState("dogs");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container mx-auto py-8">
      <SectionHero title="Administrator dashboard" />
      <div className="flex space-x-4 mb-4">
        <Button variant="primary" onClick={() => handleTabClick("dogs")}>
          Manage animals
        </Button>
        <Button
          variant="primary"
          onClick={() => handleTabClick("applications")}
        >
          Manage applications
        </Button>
      </div>
      {initialTabs.map((tab) => (
        <div key={tab.id} className={activeTab === tab.id ? "block" : "hidden"}>
          {tab.component}
        </div>
      ))}
    </div>
  );
};

export default AdminPage;
