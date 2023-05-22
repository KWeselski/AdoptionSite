import cloudinary from 'cloudinary';
import { Shelter } from '../models/shelterModel.js';
import { PetAdoption } from '../models/petAdoptionModel.js';
import { AdoptionApplication } from '../models/adoptionApplicationModel.js';

const AVAILABLE = 'Available';

const createPetAdoption = async (req, res) => {
  const petAdoption = new PetAdoption(req.body);
  try {
    const result = await cloudinary.uploader.upload(req.body.image);
    petAdoption.image = result.url;
    const shelter = await Shelter.findById(req.body.shelter);
    const savedPet = await petAdoption.save();

    shelter.animals.push(savedPet._id);
    await shelter.save();

    res.status(201).json({ message: 'Pet for adoption created' });
  } catch (err) {
    await petAdoption.deleteOne({ _id: petAdoption._id });
    res.status(400).json({ error: 'Unable to create pet for adoption' });
  }
};

const deletePet = async (req, res) => {
  const { id } = req.params;
  try {
    await PetAdoption.findByIdAndDelete(id);
    await AdoptionApplication.deleteMany({ pet: id });
    res.status(200).json({ message: 'Pet has been deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const getPet = async (req, res) => {
  const { id } = req.params;
  try {
    const pet = await PetAdoption.findById(id);
    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const getPets = async (req, res) => {
  const allowedFilters = [
    'name',
    'city',
    'species',
    'gender',
    'size',
    'age',
    'breed',
  ];

  let query = {};
  for (let key in req.query) {
    if (allowedFilters.includes(key) && req.query[key].trim() !== '') {
      query[key] = req.query[key];
    }
  }

  query.status = AVAILABLE;
  try {
    const animals = await PetAdoption.find(query).select(
      'name city age size image'
    );
    res.status(200).json(animals);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const getPetsManage = async (req, res) => {
  try {
    const animals = await PetAdoption.find({}, 'name breed status').sort({
      createdAt: -1,
    });
    res.status(200).json(animals);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export { createPetAdoption, deletePet, getPet, getPets, getPetsManage };
