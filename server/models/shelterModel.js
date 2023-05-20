import mongoose from "mongoose";

const ShelterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    address: {
      city: { type: String, required: true },
      street: { type: String, required: true },
    },
    email: {
      type: String,
      required: true,
    },
    animals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PetAdoption",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Shelter = mongoose.model("Shelter", ShelterSchema);
