import { Shelter } from "../models/shelterModel.js";
import { PetAdoption } from "../models/petAdoptionModel.js";

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
  const filter = partial
    ? { name: 1, "address.city": 1 }
    : { name: 1, "address.city": 1, email: 1, phoneNumber: 1 };
  try {
    const shelters = await Shelter.find({}).select(filter).sort({ name: 1 });
    res.status(200).json(shelters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateShelter = async (req, res) => {
  const { id } = req.params;
  try {
    await Shelter.findOneAndUpdate({ _id: id }, req.body , { new: true });
    res.status(200).json({ message: "Shelter has been updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteShelter = async (req, res) => {
  const { id } = req.params;
  try {
    const shelter = await Shelter.findById(id);
    for (let id of shelter.animals) {
      await PetAdoption.findByIdAndDelete(id);
    }
    await Shelter.findByIdAndDelete(id);

    res.status(200).json({ message: "Shelter has been deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createShelter, getShelter, getShelters, deleteShelter, updateShelter };
