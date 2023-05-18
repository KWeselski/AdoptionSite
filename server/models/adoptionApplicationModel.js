import mongoose from "mongoose";
const { Schema } = mongoose;

const adoptionApplicationSchema = new Schema({
  personalInformation: {
    firstName: String,
    lastName: String,
    address: {
      street: String,
      city: String,
      postalCode: String,
      country: String,
    },
    phoneNumber: String,
    email: String,
  },
  homeInformation: {
    type: String,
    ownership: String,
    yard: String,
    children: String,
    otherPets: String,
  },
  experienceWithDogs: {
    previousPets: String,
    previousBreed: String,
    durationOfOwnership: String,
  },
  careAndActivityPlans: {
    dailyExercise: String,
    careDuringAbsence: String,
    activityType: String,
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
});

export const AdoptionApplication = mongoose.model(
  "AdoptionApplication",
  adoptionApplicationSchema
);
