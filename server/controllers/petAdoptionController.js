import { AdoptionApplication } from "../models/adoptionApplicationModel.js";

const createApplication = async (req, res) => {
  try {
    const application = new AdoptionApplication(req.body);
    await application.save();
    res.status(201).json({ message: "Application created" });
  } catch (err) {
    res.status(400).json({ error: "Unable to create application" });
  }
};

const getApplication = async (req, res) => {
  // TODO: implement this
};

const getApplications = async (req, res) => {
  try {
    const applications = await AdoptionApplication.find(
      { status: "Pending" },
      "personalInformation.firstName personalInformation.lastName personalInformation.address.city personalInformation.phoneNumber personalInformation.email"
    ).sort({ status: "1" });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createApplication, getApplication, getApplications };
