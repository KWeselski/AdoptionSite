import mongoose from 'mongoose';
const { Schema } = mongoose;

const petAdoptionSchema = new Schema(
  {
    name: {
      type: String,
      maxLength: 50,
      validate: {
        validator: function (v) {
          return !/\s/.test(v);
        },
      },
      required: true,
    },
    species: {
      type: String,
      enum: ['Dog', 'Cat'],
      required: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female'],
      required: true,
    },
    age: {
      type: Number,
      min: 0,
      max: 20,
      required: true,
    },
    breed: {
      type: String,
      maxLength: 70,
      required: false,
      default: 'Mixed',
    },
    city: {
      type: String,
      maxLength: 70,
      required: true,
    },
    size: {
      type: String,
      enum: ['Small', 'Medium', 'Large'],
      required: true,
    },
    description: {
      type: String,
      maxLength: 1500,
      required: true,
    },
    image: String,
    status: {
      type: String,
      enum: ['Adopted', 'Available'],
      default: 'Available',
    },
    adoptedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    shelter: {
      type: Schema.Types.ObjectId,
      ref: 'Shelter',
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const PetAdoption = mongoose.model('PetAdoption', petAdoptionSchema);
