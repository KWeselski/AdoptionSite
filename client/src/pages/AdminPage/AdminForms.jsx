import React from 'react';

import { Paper } from '../../components';
import { ShelterForm, PetForm } from '../../forms';
import {styles} from "../../styles"

const components = {
  addShelter: <ShelterForm />,
  addAnimal: <PetForm />,
  editShelter: <ShelterForm isEdit />,
};

const AdminForms = ({ type, id }) => (
  <Paper>
    <div
      className={`${styles.flexCenter} md:flex-row justify-center items-center p-4`}
    >
      {React.cloneElement(components[type], { id: id })}
    </div>
  </Paper>
);

export default AdminForms;
