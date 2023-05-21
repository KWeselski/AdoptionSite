import React from 'react';

import { ShelterForm, PetForm } from '../../forms';

const components = {
  addShelter: <ShelterForm />,
  addAnimal: <PetForm />,
  editShelter: <ShelterForm isEdit />,
};

const AdminForms = ({ type, id }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="flex flex-col md:flex-row justify-center items-center p-4">
      {React.cloneElement(components[type], { id: id })}
    </div>
  </div>
);

export default AdminForms;
