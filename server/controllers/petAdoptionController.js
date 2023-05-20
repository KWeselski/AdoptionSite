import cloudinary from "cloudinary";
import { PetAdoption } from "../models/petAdoptionModel.js";

const AVAILABLE = "Available";

const createPetAdoption = async (req, res) => {
  const petAdoption = new PetAdoption(req.body);
  try {
    console.log(petAdoption);
    const result = await cloudinary.uploader.upload(req.file.path);
    petAdoption.image = result.url;
    await petAdoption.save();
    res.status(201).json({ message: "Pet for adoption created" });
  } catch (err) {
    console.log(err);
    await petAdoption.deleteOne({ _id: petAdoption._id });
    res.status(400).json({ error: "Unable to create pet for adoption" });
  }
};

const getPet = async (req, res) => {
  const { id } = req.params;
  try {
    const pet = await PetAdoption.findById(id);
    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPets = async (req, res) => {
  const { partial, limit } = req.query;
  try {
    const animals = partial
      ? await PetAdoption.find(
          { status: AVAILABLE },
          "name size image city age"
        ).limit(parseInt(limit))
      : await PetAdoption.find({ status: AVAILABLE });
    res.status(200).json(animals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPetsManage = async (req, res) => {
  try {
    console.log("elo");
    const animals = await PetAdoption.find();
    res.status(200).json(animals);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export { createPetAdoption, getPet, getPets, getPetsManage };
