import { Shelter } from "../models/shelterModel.js";

const createShelter = async (req, res) => {
  try {
    const shelter = new Shelter(req.body);
    await shelter.save();
    res.status(201).json({ message: "Shelter has created" });
  } catch (err) {
    res.status(400).json({ error: "Unable to create shelter" });
  }
};

const getShelter = async (req, res) => {
  const { id } = req.params;
  try {
    const pet = await Shelter.findById(id);
    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getShelters = async (req, res) => {
  const { partial } = req.query;
  console.log(partial);
  const filter = partial ? "name city" : "name city email phoneNumber";
  try {
    const shelters = await Shelter.find({}, filter).sort({ name: 1 });
    res.status(200).json(shelters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteShelter = async (req, res) => {
  const { id } = req.params;
  try {
    await Shelter.findByIdAndDelete(id);
    res.status(200).json({ message: "Shelter has been deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createShelter, getShelter, getShelters, deleteShelter };
