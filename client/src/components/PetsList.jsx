import AnimalCard from './AnimalCard';

const PetsList = ({ pets, maxCol }) => (
  <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${maxCol} gap-6 w-full`}>
    {pets.map((pet) => (
      <AnimalCard key={pet._id} {...pet} />
    ))}
  </div>
);

export default PetsList;
