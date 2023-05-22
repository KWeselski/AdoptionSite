import axios from 'axios';

import { SET_SHELTERS, DELETE_SHELTER } from '../constants';

export const setShelters = (shelters) => ({
  type: SET_SHELTERS,
  payload: shelters,
});

export const deleteShelterSuccess = (id) => ({
  type: DELETE_SHELTER,
  payload: id,
});

export const deleteShelter = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/shelters/${id}`);
      dispatch(deleteShelterSuccess(id));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchShelters = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/api/shelters');
      dispatch(setShelters(res.data));
    } catch (error) {
      console.error(error);
    }
  };
};
