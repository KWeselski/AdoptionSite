import React from "react";
import styles from "../styles";
import Button from "../components/Button";

const TableData = ({ label, value }) => (
  <div key={label} className="flex w-full py-2 border-b text-start items-start">
    <div className="w-1/3 font-semibold">{label}</div>
    <div className="w-2/3">{value}</div>
  </div>
);

const AdoptionPage = () => {
  const dogData = {
    name: "Burek",
    city: "Warszawa",
    species: "Dog",
    sex: "Male",
    size: "Medium",
    age: 3,
    breed: "Labrador Retriever",
    image: "../src/assets/dog.jpg",
    description: `
    Rex był małym, czarnym szczeniakiem, który znalazł się w schronisku dla zwierząt po tym, jak został porzucony przez swojego poprzedniego właściciela. Miał nadzieję na drugą szansę i nowy dom, który mógłby nazwać swoim.
    
    W pierwszych dniach spędzonych w schronisku Rex był bardzo zestresowany. Czuł się zagubiony i smutny, tęsknił za ciepłym łóżkiem i miłością, jaką otrzymywał od człowieka. Jednak personel schroniska nie zostawił go samego. Starali się dać mu jak najwięcej uwagi i opieki.
    
    Rex miał wielkie serce i szybko zyskał sympatię personelu schroniska. Był oddany i pełen energii. Niezależnie od trudności, zawsze miał ogon wesoło machający, gotowy do zabawy i przytulania.
    
    Codziennie Rex miał możliwość biegać na dużym wybiegu ze swoimi towarzyszami ze schroniska. Uwielbiał to. Był bardzo dobry w łapaniu frisbee i gonił za piłką, jakby był najszybszym psem na świecie.
    
    Czasami wolontariusze z pobliskiej szkoły przychodzili do schroniska, aby czytać książki psom. Rex był zawsze jednym z pierwszych na liście oczekujących na swoją porcję czytanej historii. Słuchanie ludzkiego głosu sprawiało mu radość i dawało mu poczucie bezpieczeństwa.
    
    Jednak mimo troski i uwagi personelu schroniska, Rex nadal czuł tęsknotę za prawdziwym domem i rodziną. Miał nadzieję, że ktoś go zauważy i pokocha tak bardzo, jak on chciałby pokochać swojego nowego właściciela.
    
    Pewnego pięknego dnia przybyła rodzina zainteresowana adopcją psa. Miała dwójkę dzieci, które od razu zwróciły uwagę na uroczego i energicznego Rextera. Był zadowolony, że ktoś zechciał dać mu szansę na nowe życie.
    
    Rodzina spędzała dużo czasu z Rexem, bawiąc się z nim i ucząc go nowych sztuczek. Szybko stał się nieodłącznym członkiem rodziny, z którym wszyscy uwielbiali spędzać czas.
    
    Rex zyskał również nowych przyjaciół w sąsiedztwie. Z innymi psami spotykał się na spacerach i zabawach na pobliskiej psiej łące. Stał się prawdziwą gwiazdą dzięki swojej przyjacielskiej naturze i entuzjazmowi, którym dzielił się ze wszystkimi wokół.`,
  };

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
        <section className="flex md:flex-row flex-col p-4 opacity-100 bg-hero-adoption bg-center bg-cover bg md:h-[370px] relative">
          <div
            className={`${styles.flexCenter} w-full flex-col xl:px-0 sm:px-16 px-6`}
          >
            <p className="text-[48px] text-white font-semibold">
              {dogData.name}
            </p>
          </div>
        </section>
        <div className="flex  flex-col sm:flex-row justify-around items-start p-6 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full">
            <img
              src={dogData.image}
              alt={dogData.name}
              className="w-full h-[400px] object-contain mb-6 rounded"
            />
            <div className="flex flex-col items-start">
              <TableData label="Name" value={dogData.name} />
              <TableData label="City" value={dogData.city} />
              <TableData label="Species" value={dogData.species} />
              <TableData label="Sex" value={dogData.sex} />
              <TableData label="Size" value={dogData.size} />
              <TableData label="Age" value={dogData.age} />
              <TableData label="Breed" value={dogData.breed} />
            </div>
            <p className="mt-4">{dogData.description}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/3">
            <h2 className="text-2xl font-bold mb-2">{shelterData.name}</h2>
            <span>
              <p>{shelterData.street}</p>{" "}
            </span>
            <p>
              <strong>Kontakt telefoniczny: </strong>
              {shelterData.phoneNumber}
            </p>
            <p>
              <strong>Email: </strong>
              {shelterData.email}
            </p>
            <Button variant="primary">Contact</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdoptionPage;
