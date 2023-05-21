import mongoose from "mongoose";

const ShelterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: 70,
      required: true,
    },
    phoneNumber: {
      type: String,
      validate: {
        validator: function (v) {
          return /^\d{10,15}$/.test(v);
        },
      },
      required: true,
    },
    address: {
      city: { type: String, maxlength: 70, required: true },
      street: { type: String, maxlength: 70, required: true },
    },
    email: {
      type: String,
      maxlength: 70,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
      },
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
