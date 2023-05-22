import { useState } from 'react';

import Button from '../../components/Button';
import SectionHero from '../../components/SectionHero';
import AdminForms from './AdminForms';
import AnimalsPage from './AnimalsPage';
import ApplicationsPage from './ApplicationsPage';
import SheltersPage from './SheltersPage';

const Tabs = {
  ADD_ANIMAL: 'addAnimal',
  ADD_SHELTER: 'addShelter',
  ANIMALS: 'animals',
  APPLICATIONS: 'applications',
  EDIT_SHELTER: 'editShelter',
  SHELTERS: 'shelters',
};

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('animals');
  const [editId, setEditId] = useState(null);

  const handleTabClick = (tab, editId) => {
    setActiveTab(tab);
    editId && setEditId(editId);
  };
  const initialTabs = [
    {
      id: Tabs.ANIMALS,
      component: (active) =>
        active && <AnimalsPage handleTab={handleTabClick} />,
    },
    {
      id: Tabs.APPLICATIONS,
      component: (active) => active && <ApplicationsPage />,
    },
    {
      id: Tabs.SHELTERS,
      component: (active) =>
        active && <SheltersPage handleTab={handleTabClick} />,
    },
    {
      id: Tabs.ADD_ANIMAL,
      component: (active) => active && <AdminForms type={Tabs.ADD_ANIMAL} />,
    },
    {
      id: Tabs.ADD_SHELTER,
      component: (active) => active && <AdminForms type={Tabs.ADD_SHELTER} />,
    },
    {
      id: Tabs.EDIT_SHELTER,
      component: (active) =>
        active && <AdminForms type={Tabs.EDIT_SHELTER} id={editId} />,
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <SectionHero title="Administrator dashboard" />
      <div className="flex space-x-4 mb-4">
        <Button variant="primary" onClick={() => handleTabClick(Tabs.ANIMALS)}>
          Manage animals
        </Button>
        <Button
          variant="primary"
          onClick={() => handleTabClick(Tabs.APPLICATIONS)}
        >
          Manage applications
        </Button>
        <Button variant="primary" onClick={() => handleTabClick(Tabs.SHELTERS)}>
          Manage shelters
        </Button>
      </div>
      {initialTabs.map((tab) => (
        <div key={tab.id} className={activeTab === tab.id ? 'block' : 'hidden'}>
          {tab.component(activeTab === tab.id)}
        </div>
      ))}
    </div>
  );
};

export default AdminPage;
