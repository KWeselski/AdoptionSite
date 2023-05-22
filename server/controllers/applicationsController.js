import { AdoptionApplication } from '../models/adoptionApplicationModel.js';
import { PetAdoption } from '../models/petAdoptionModel.js';

const STATUS = {
  ACCEPTED: 'Accepted',
  REJECTED: 'Rejected',
  PENDING: 'Pending',
};
const ADOPTED = 'Adopted';

const createApplication = async (req, res) => {
  try {
    const application = new AdoptionApplication({
      user: req.user._id,
      ...req.body,
    });
    await application.save();

    res.status(201).json({ message: 'Application created' });
  } catch (err) {
    res.status(400).json({ error: 'Unable to create application' });
  }
};

const reviewApplication = async (req, res) => {
  const { id } = req.params;
  const { accepted } = req.body;
  try {
    const application = await AdoptionApplication.findById(id);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    if (accepted) {
      application.status = STATUS.ACCEPTED;
      const pet = await PetAdoption.findById(application.pet);
      if (!pet) {
        return res.status(404).json({ error: 'Pet not found' });
      }
      pet.status = REJECTED;
      await pet.save();
    } else {
      application.status = STATUS.REJECTED;
    }
    await application.save();
    res.status(200).json({ message: 'Application reviewed' });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const getApplication = async (req, res) => {
  const { id } = req.params;
  try {
    const application = await AdoptionApplication.findById(id).populate({
      path: 'pet',
      select: '-_id name image',
    });
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const getApplications = async (req, res) => {
  try {
    const applications = await AdoptionApplication.aggregate([
      {
        $match: { status: STATUS.PENDING },
      },
      {
        $lookup: {
          localField: 'pet',
          from: 'petadoptions',
          foreignField: '_id',
          as: 'pet',
        },
      },
      { $unwind: '$pet' },
      {
        $project: {
          'personalInformation.applicantName': {
            $concat: [
              '$personalInformation.firstName',
              ' ',
              '$personalInformation.lastName',
            ],
          },
          'personalInformation.email': 1,
          'personalInformation.address.city': 1,
          'pet.name': 1,
          status: 1,
        },
      },
      {
        $sort: { createdAt: 1 },
      },
    ]);
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const getUserApplications = async (req, res) => {
  try {
    const applications = await AdoptionApplication.find({
      user: req.user._id,
    })
      .populate({ path: 'pet', select: 'name' })
      .select({ status: 1, pet: 1 })
      .sort({ createdAt: -1 });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const deleteApplication = async (req, res) => {
  const { id } = req.params;
  try {
    const application = await AdoptionApplication.findById(id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    if (application.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    await application.remove();
    res.status(200).json({ message: 'Application deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export {
  createApplication,
  deleteApplication,
  getApplication,
  getApplications,
  getUserApplications,
  reviewApplication,
};
