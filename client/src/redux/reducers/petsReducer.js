import { SET_PETS, DELETE_PET } from '../constants';

const petsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_PETS:
      return action.payload;
    case DELETE_PET:
      return state.filter((pet) => pet._id !== action.payload);
    default:
      return state;
  }
};

export default petsReducer;
