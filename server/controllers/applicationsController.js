import { AdoptionApplication } from "../models/adoptionApplicationModel.js";
import { PetAdoption } from "../models/petAdoptionModel.js";

const createApplication = async (req, res) => {
  try {
    const application = new AdoptionApplication(req.body);
    await application.save();
    res.status(201).json({ message: "Application created" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Unable to create application" });
  }
};

const reviewApplication = async (req, res) => {
  const { id } = req.params;
  const { accepted } = req.body;
  try {
    const application = await AdoptionApplication.findById(id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    if (accepted) {
      application.status = "Accepted";
      const pet = await PetAdoption.findById(application.pet);
      if (!pet) {
        return res.status(404).json({ message: "Pet not found" });
      }
      pet.status = "Adopted";
      await pet.save();
    } else {
      application.status = "Rejected";
    }
    await application.save();
    res.status(200).json({ message: "Application reviewed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getApplication = async (req, res) => {
  const { id } = req.params;
  try {
    const application = await AdoptionApplication.findById(id).populate({
      path: "pet",
      select: "-_id name image",
    });
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getApplications = async (req, res) => {
  try {
    const applications = await AdoptionApplication.aggregate([
      {
        $match: { status: "Pending" },
      },
      {
        $lookup: {
          localField: "pet",
          from: "petadoptions",
          foreignField: "_id",
          as: "pet",
        },
      },
      { $unwind: "$pet" },
      {
        $project: {
          "personalInformation.applicantName": {
            $concat: [
              "$personalInformation.firstName",
              " ",
              "$personalInformation.lastName",
            ],
          },
          "personalInformation.email": 1,
          "personalInformation.address.city": 1,
          "pet.name": 1,
          status: 1,
        },
      },
      {
        $sort: { createdAt: 1 },
      },
    ]);
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createApplication,
  getApplication,
  getApplications,
  reviewApplication,
};
