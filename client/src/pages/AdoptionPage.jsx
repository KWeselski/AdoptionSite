import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import axios from 'axios';

import { Button, Loader, Table } from '../components';
import { useShelters } from '../hooks';
import styles from '../styles';

const ShelterInfo = ({ shelter }) => (
  <Loader data={shelter}>
    {(shelter) => (
      <>
        <h2 className="text-2xl font-bold mb-2">{shelter.name}</h2>
        <p className="font-bold text-[18px]">{shelter.address.city}</p>
        <p>Phone number: {shelter.phoneNumber}</p>
        <p>
          <strong>Email: </strong>
          {shelter.email}
        </p>
      </>
    )}
  </Loader>
);

const AdoptionPage = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [shelter, setShelter] = useState(null);

  const shelters = useShelters();

  useEffect(() => {
    const fetchPet = async () => {
      const { data } = await axios.get(`/api/animals/${id}`);
      setPet(data);

      setShelter(shelters.find((shelter) => shelter._id === data.shelter));
    };

    fetchPet();
  }, []);

  return (
    <div className={`${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Loader data={pet}>
          {(pet) => (
            <>
              <section className="flex md:flex-row flex-col p-4 opacity-100 bg-hero-adoption bg-center bg-cover bg md:h-[370px] relative">
                <div
                  className={`${styles.flexCenter} w-full flex-col xl:px-0 sm:px-16 px-6`}
                >
                  <p className="text-[48px] text-white font-semibold">
                    {pet.name}
                  </p>
                </div>
              </section>
              <div className="flex flex-col sm:flex-row justify-around items-start p-6 gap-4">
                <div className={`${styles.paper} w-full`}>
                  <img
                    src={pet.image}
                    alt={pet.name}
                    className="w-full h-[400px] object-contain mb-6 rounded"
                  />
                  <div className="flex flex-col items-start">
                    <Table.Data label="Name">{pet.name}</Table.Data>
                    <Table.Data label="City">{pet.city}</Table.Data>
                    <Table.Data label="Species">{pet.species}</Table.Data>
                    <Table.Data label="Gender">{pet.gender}</Table.Data>
                    <Table.Data label="Size">{pet.size}</Table.Data>
                    <Table.Data label="Age">{pet.age}</Table.Data>
                    <Table.Data label="Breed">{pet.breed}</Table.Data>
                  </div>
                  <div className="w-full text-left p-4 overflow-hidden">
                    <p className="text-md  md:text-base leading-relaxed whitespace-pre-wrap break-words">
                      {pet.description}
                    </p>
                  </div>
                </div>
                <div
                  className={`${styles.paper} w-full md:w-1/3 flex flex-col items-center gap-2`}
                >
                  <ShelterInfo shelter={shelter} />
                  <Link to={`/application/${pet._id}`}>
                    <Button variant="primary">Send Application</Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </Loader>
      </div>
    </div>
  );
};

export default AdoptionPage;
