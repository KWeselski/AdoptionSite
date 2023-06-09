import { useCallback, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Dialog, Loader, Table } from '../../components';
import { reviewApplication } from '../../redux/actions/applications';
import authRequest from '../../utils/authRequest';

const AplicationReviewPage = ({ isOpen=false, id, onClose }) => {
  if (!isOpen) return null;
  
  const dispatch = useDispatch();
  const [application, setApplication] = useState(null);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await authRequest.get(`/api/applications/${id}`);
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
        status,
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
              <Table.Data label="Name">
                {personalInformation.firstName}
              </Table.Data>
              <Table.Data label="Name">
                {personalInformation.lastName}
              </Table.Data>
              <Table.Data label="City">
                {personalInformation.address.city}
              </Table.Data>
              <Table.Data label="Street">
                {personalInformation.address.street}
              </Table.Data>
              <Table.Data label="Phone">
                {personalInformation.phoneNumber}
              </Table.Data>
              <Table.Data label="Email">{personalInformation.email}</Table.Data>
              <Table.Data label="Home type">{homeInformation.type}</Table.Data>
              <Table.Data label="Childrens">
                {homeInformation.children}
              </Table.Data>
              <Table.Data label="Previous Pets">
                {experience.previousPets}
              </Table.Data>
              <Table.Data label="Pet duration">
                {experience.petDuration}
              </Table.Data>
              <Table.Data label="Activity plans">
                {careAndActivityPlans.activityType.join(', ')}
              </Table.Data>
              <Table.Data label="Daily exercises plans">
                {careAndActivityPlans.dailyExercise.join(', ')}
              </Table.Data>
            </div>
            {status === 'Pending' && (
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
            )}
          </div>
        </Dialog>
      )}
    </Loader>
  );
};

export default AplicationReviewPage;
