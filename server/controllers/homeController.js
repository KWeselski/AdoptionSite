import { PetAdoption } from '../models/petAdoptionModel.js';

const AVAILABLE = 'Available';
const ADOPTED = 'Adopted';

const getHomeData = async (req, res) => {
  try {
    const availablePets = await PetAdoption.find({ status: AVAILABLE })
      .select('name size image city age')
      .limit(12);

    const dogCount = await PetAdoption.countDocuments({
      species: 'Dog',
      status: AVAILABLE,
    });

    const catCount = await PetAdoption.countDocuments({
      species: 'Cat',
      status: AVAILABLE,
    });

    const adoptedCount = await PetAdoption.countDocuments({
      status: ADOPTED,
    });

    const response = {
      pets: availablePets,
      stats: {
        dogsCount: dogCount,
        catsCount: catCount,
        adoptedCount: adoptedCount,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred.' });
  }
};

export { getHomeData };
