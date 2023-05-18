import mongoose from "mongoose";
const { Schema } = mongoose;

const petAdoptionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    species: {
      type: String,
      enum: ["Dog", "Cat"],
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    breed: {
      type: String,
      required: false,
      default: "Mieszaniec",
    },
    city: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      enum: ["Small", "Medium", "Large"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: String,
    status: {
      type: String,
      enum: ["Adopted", "Available"],
      default: "Available",
    },
    adoptedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    shelter: {
      type: Schema.Types.ObjectId,
      ref: "Shelter",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const PetAdoption = mongoose.model("PetAdoption", petAdoptionSchema);
