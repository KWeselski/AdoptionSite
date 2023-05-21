import { useCallback, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import axios from 'axios';

import { Button, Dialog, Loader } from '../../components';
import { reviewApplication } from '../../redux/actions/applications';

const TableData = ({ label, children }) => (
  <div key={label} className="flex w-full py-2 border-b text-start items-start">
    <div className="w-1/3 font-semibold">{label}</div>
    <div className="w-2/3">{children}</div>
  </div>
);

const AplicationReviewPage = ({ id, onClose }) => {
  const dispatch = useDispatch();
  const [application, setApplication] = useState(null);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await axios.get(`/api/applications/${id}`);
        setApplication(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchApplication();
  }, [id]);

  const handleReviewApplication = useCallback(
    (accepted = false) => {
      dispatch(reviewApplication(id, accepted));
      onClose();
    },
    [id, dispatch, onClose]
  );

  return (
    <Loader data={application}>
      {({
        pet,
        personalInformation,
        homeInformation,
        experience,
        careAndActivityPlans,
      }) => (
        <Dialog onClose={onClose}>
          <div className="p-4">
            <h2 className="text-[42px] text-green-700 text-center p-2 font-bold">
              {pet.name}
            </h2>
            <img
              src={pet.image}
              alt={pet.name}
              className="w-full h-[400px] object-contain mb-6 rounded"
            />
            <div className="flex flex-col items-start">
              <TableData label="Name">
                {personalInformation.firstName}
              </TableData>
              <TableData label="Name">{personalInformation.lastName}</TableData>
              <TableData label="City">
                {personalInformation.address.city}
              </TableData>
              <TableData label="Street">
                {personalInformation.address.street}
              </TableData>
              <TableData label="Phone">
                {personalInformation.phoneNumber}
              </TableData>
              <TableData label="Email">{personalInformation.email}</TableData>
              <TableData label="Home type">{homeInformation.type}</TableData>
              <TableData label="Childrens">
                {homeInformation.children}
              </TableData>
              <TableData label="Previous Pets">
                {experience.previousPets}
              </TableData>
              <TableData label="Pet duration">
                {experience.petDuration}
              </TableData>
              <TableData label="Activity plans">
                {careAndActivityPlans.activityType.join(', ')}
              </TableData>
              <TableData label="Daily exercises plans">
                {careAndActivityPlans.dailyExercise.join(', ')}
              </TableData>
            </div>
            <div className="flex flex-row items-center justify-around w-full mt-4">
              <Button
                variant="primary"
                onClick={() => handleReviewApplication()}
              >
                Reject
              </Button>
              <Button
                variant="primary"
                onClick={() => handleReviewApplication(true)}
              >
                Accept
              </Button>
            </div>
          </div>
        </Dialog>
      )}
    </Loader>
  );
};

export default AplicationReviewPage;
