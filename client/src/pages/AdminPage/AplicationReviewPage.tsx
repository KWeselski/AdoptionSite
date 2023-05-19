import Button from "../../components/Button";
import Dialog from "../../components/Dialog";
import axios from "axios";
import { useEffect, useState } from "react";

const TableData = ({ label, children }) => (
  <div key={label} className="flex w-full py-2 border-b text-start items-start">
    <div className="w-1/3 font-semibold">{label}</div>
    <div className="w-2/3">{children}</div>
  </div>
);

const AplicationReviewPage = ({ id, onClose }) => {
  const [application, setApplation] = useState(null);
  const [loading, setLoading] = useState(true);

  const reviewApplication = (accepted = false) => {
    axios
      .put(`/api/applications/${id}`, { accepted: accepted })
      .then(() => {
        onClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const getApplication = async () => {
      try {
        const { data } = await axios.get(`/api/applications/${id}`);
        setApplation(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(true);
      }
    };
    getApplication();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Dialog onClose={onClose}>
      <div className="p-4">
        <h2 className="text-[42px] text-green-700 text-center p-2 font-bold">
          {application.pet.name}
        </h2>
        <img
          src={application.pet.image}
          alt={application.pet.name}
          className="w-full h-[400px] object-contain mb-6 rounded"
        />
        <div className="flex flex-col items-start">
          <TableData label="Name">
            {application.personalInformation.firstName}
          </TableData>
          <TableData label="Name">
            {application.personalInformation.lastName}
          </TableData>
          <TableData label="City">
            {application.personalInformation.address.city}
          </TableData>
          <TableData label="Street">
            {application.personalInformation.address.street}
          </TableData>
          <TableData label="Phone">
            {application.personalInformation.phoneNumber}
          </TableData>
          <TableData label="Email">
            {application.personalInformation.email}
          </TableData>
          <TableData label="Home type">
            {application.homeInformation.type}
          </TableData>
          <TableData label="Childrens">
            {application.homeInformation.children}
          </TableData>
          <TableData label="Previous Pets">
            {application.experience.previousPets}
          </TableData>
          <TableData label="Pet duration">
            {application.experience.petDuration}
          </TableData>
          <TableData label="Activity plans">
            {application.careAndActivityPlans.activityType.join(", ")}
          </TableData>
          <TableData label="Daily exercises plans">
            {application.careAndActivityPlans.dailyExercise.join(", ")}
          </TableData>
        </div>
        <div className="flex flex-row items-center justify-around w-full mt-4">
          <Button variant="primary" onClick={() => reviewApplication()}>
            Reject
          </Button>
          <Button variant="primary" onClick={() => reviewApplication(true)}>
            Accept
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default AplicationReviewPage;
