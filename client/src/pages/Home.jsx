import styles from "../styles";
import { partners, statistics } from "../constants";
import PetsList from "../components/PetsList";
import SectionHero from "../components/SectionHero";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState({
    pets: [],
    stats: {
      dogsCount: 0,
      catsCount: 0,
      adoptedCount: 0,
    }
  })

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("/api/");
      setData(result.data);
    };
    fetchData();
  }, []);


  return (
    <>
      <section className="flex md:flex-row flex-col p-4 bg-hero-image bg-center bg-cover bg-no-repeat bg h-[370px] relative">
        <div
          className={`${styles.flexCenter} w-full flex-col xl:px-0 sm:px-16 px-6`}
        >
          <p className="text-[48px] text-white font-semibold">
            Discover the unconditional love of an adopted pet
          </p>
        </div>
      </section>
      <SectionHero
        title="Find your new best friend"
        description="Search for dogs and cats who need a home."
      />
      <section className="flex md:flex-row flex-col p-4 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          <PetsList pets={data.pets} />
        </div>
      </section>
      <SectionHero
        title="Statistics"
        description="Our statistics show that we have helped over 100 animals find a new home."
      >
        <div className="flex flex-row flex-wrap justify-between mt-10 p-16">
          {statistics.map((statistic, index) => (
            <div
              key={index}
              className="max-w-sm mx-auto mb-10 md:mb-10 w-[420px] bg-white rounded-xl shadow-md flex flex-col items-center hover:shadow-lg  transform transition duration-500 ease-in-out hover:scale-105 cursor-pointer px-5 py-3"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="flex-shrink-0 relative w-full">
                <div className="flex flex-col md:flex-row items-center justify-between ">
                  <img
                    src={statistic.icon}
                    alt={statistic.title}
                    className="w-[64px] h-[64px] mr-2 animate-fade-in-up"
                  />
                  <span className="text-xl">
                    <p className="text-green-700 font-bold text-[32px] p-2 animate-fade-in-up">
                      {data.stats[statistic.key]}
                    </p>
                    <span className="text-gray-500 font-semibold animate-fade-in-up">
                      {statistic.title}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionHero>
      <SectionHero
        title="Partners and sponsors"
        description="We are proud to work with these partners and sponsors:"
      >
        <div className="flex flex-row flex-wrap justify-between mt-10 p-16">
          {partners.map((partner, index) => (
            <img
              key={index}
              src={partner.image}
              alt={partner.name}
              className="w-[128px] h-[128px] mr-2"
            />
          ))}
        </div>
      </SectionHero>
    </>
  );
};

export default Home;
