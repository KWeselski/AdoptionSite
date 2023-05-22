import mongoose from 'mongoose';
const { Schema } = mongoose;

const adoptionApplicationSchema = new Schema(
  {
    personalInformation: {
      firstName: {
        type: String,
        maxlength: 50,
        required: true,
      },
      lastName: {
        type: String,
        maxlength: 50,
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
      address: {
        city: { type: String, maxlength: 50, required: true },
        street: { type: String, maxlength: 50, required: true },
      },
    },
    homeInformation: {
      type: { type: String, enum: ['Apartment', 'House'], required: true },
      children: { type: String, enum: ['Yes', 'No'], required: true },
    },
    experience: {
      previousPets: { type: String, enum: ['Yes', 'No'], required: true },
      petDuration: {
        type: String,
        enum: [
          '< 1 year',
          '1-3 years',
          '4-6 years',
          '6-8 years',
          'More than 8 years',
        ],
        required: true,
      },
    },
    careAndActivityPlans: {
      dailyExercise: [
        {
          type: String,
          enum: [
            'Short walks',
            'Medium-length walks',
            'Long walks or runs',
            'Home exercises and games',
            'Joint exercises',
          ],
          required: true,
        },
      ],
      activityType: [
        {
          type: String,
          enum: [
            'Outdoor activities',
            'Training',
            'Home games',
            'Spending time with other dogs',
            'Relaxation',
          ],
          required: true,
        },
      ],
    },
    pet: {
      type: Schema.Types.ObjectId,
      ref: 'PetAdoption',
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'Rejected'],
      default: 'Pending',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const AdoptionApplication = mongoose.model(
  'AdoptionApplication',
  adoptionApplicationSchema
);
