import axios from "axios";
import { useState, useEffect } from "react";
import styles from "../styles";
import Button from "../components/Button";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";

const TableData = ({ label, value }) => (
  <div key={label} className="flex w-full py-2 border-b text-start items-start">
    <div className="w-1/3 font-semibold">{label}</div>
    <div className="w-2/3">{value}</div>
  </div>
);

const AdoptionPage = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    axios.get(`/api/animals/${id}`).then(({ data }) => setPet(data));
  }, []);

  const shelterData = {
    name: "Schronisko dla bezdomnych zwierząt",
    phoneNumber: "+48 123 456 789",
    email: "kontakt@schronisko.pl",
    street: "ul. Przykładowa 1",
    city: "Warszawa",
  };

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
              <div className="flex  flex-col sm:flex-row justify-around items-start p-6 gap-4">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full">
                  <img
                    src={pet.image}
                    alt={pet.name}
                    className="w-full h-[400px] object-contain mb-6 rounded"
                  />
                  <div className="flex flex-col items-start">
                    <TableData label="Name" value={pet.name} />
                    <TableData label="City" value={pet.city} />
                    <TableData label="Species" value={pet.species} />
                    <TableData label="Gender" value={pet.gender} />
                    <TableData label="Size" value={pet.size} />
                    <TableData label="Age" value={pet.age} />
                    <TableData label="Breed" value={pet.breed} />
                  </div>
                  <p className="mt-4">{pet.description}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/3">
                  <h2 className="text-2xl font-bold mb-2">
                    {shelterData.name}
                  </h2>
                  <span>
                    <p>{shelterData.street}</p>
                  </span>
                  <p>
                    <strong>Kontakt telefoniczny: </strong>
                    {shelterData.phoneNumber}
                  </p>
                  <p>
                    <strong>Email: </strong>
                    {shelterData.email}
                  </p>
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
