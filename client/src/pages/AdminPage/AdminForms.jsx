import { ShelterForm, PetForm } from "../../forms";

const components = {
  addShelter: <ShelterForm />,
  addAnimal: <PetForm />,
};

const AdminForms = ({ type }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="flex flex-col md:flex-row justify-center items-center p-4">
      {components[type]}
    </div>
  </div>
);

export default AdminForms;
