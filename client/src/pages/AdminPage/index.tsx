import { useState } from "react";
import SectionHero from "../../components/SectionHero";
import Button from "../../components/Button";
import AnimalsPage from "./AnimalsPage";
import ApplicationsPage from "./ApplicationsPage";
import SheltersPage from "./SheltersPage";
import AdminForms from "./AdminForms";

const Tabs = {
  DOGS: "dogs",
  APPLICATIONS: "applications",
  SHELTERS: "shelters",
  ADD_ANIMAL: "addAnimal",
  ADD_SHELTER: "addShelter",
};

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("dogs");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const initialTabs = [
    {
      id: Tabs.DOGS,
      label: "Manage animals",
      component: (active) =>
        active && <AnimalsPage handleTab={handleTabClick} />,
    },
    {
      id: Tabs.APPLICATIONS,
      label: "Manage applications",
      component: (active) => active && <ApplicationsPage />,
    },
    {
      id: Tabs.SHELTERS,
      label: "Manage shelters",
      component: (active) =>
        active && <SheltersPage handleTab={handleTabClick} />,
    },
    {
      id: Tabs.ADD_ANIMAL,
      label: "Add animal",
      component: (active) => active && <AdminForms type={Tabs.ADD_ANIMAL} />,
    },
    {
      id: Tabs.ADD_SHELTER,
      label: "Add shelter",
      component: (active) => active && <AdminForms type={Tabs.ADD_SHELTER} />,
    },
  ];

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
        <Button variant="primary" onClick={() => handleTabClick("shelters")}>
          Manage shelters
        </Button>
      </div>
      {initialTabs.map((tab) => (
        <div key={tab.id} className={activeTab === tab.id ? "block" : "hidden"}>
          {tab.component(activeTab === tab.id)}
        </div>
      ))}
    </div>
  );
};

export default AdminPage;
