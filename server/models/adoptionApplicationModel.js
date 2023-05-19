import mongoose from "mongoose";
const { Schema } = mongoose;

const adoptionApplicationSchema = new Schema(
  {
    personalInformation: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      email: { type: String, required: true },
      address: {
        city: { type: String, required: true },
        street: { type: String, required: true },
      },
    },
    homeInformation: {
      type: { type: String, required: true },
      children: { type: String, required: true },
    },
    experience: {
      previousPets: { type: String, required: true },
      petDuration: { type: String, required: true },
    },
    careAndActivityPlans: {
      dailyExercise: [{ type: String, required: true }],
      activityType: [{ type: String, required: true }],
    },
    pet: {
      type: Schema.Types.ObjectId,
      ref: "PetAdoption",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export const AdoptionApplication = mongoose.model(
  "AdoptionApplication",
  adoptionApplicationSchema
);
