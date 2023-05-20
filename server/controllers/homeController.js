import { PetAdoption } from "../models/petAdoptionModel.js";
const AVAILABLE = "Available";

const getHomeData = async (req, res) => {
  try {
    const availablePets = await PetAdoption.find({ status: "Available" })
      .select("name size image city age")
      .limit(12);

    const dogCount = await PetAdoption.countDocuments({
      species: "Dog",
      status: "Available",
    });

    const catCount = await PetAdoption.countDocuments({
      species: "Cat",
      status: "Available",
    });

    const adoptedCount = await PetAdoption.countDocuments({
      status: "Adopted",
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
    console.error(error);
    res.status(500).json({ message: "An error occurred." });
  }
};

export { getHomeData };
