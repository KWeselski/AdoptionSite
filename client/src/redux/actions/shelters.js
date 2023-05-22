import axios from 'axios';

import authRequest from '../../utils/authRequest';
import { SET_SHELTERS, DELETE_SHELTER } from '../constants';
import { setError } from './errors';

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
      await authRequest.delete(`/api/shelters/${id}`);
      dispatch(deleteShelterSuccess(id));
    } catch (error) {
      dispatch(setError(error.response.data));
    }
  };
};

export const fetchShelters = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/api/shelters');
      dispatch(setShelters(res.data));
    } catch (error) {
      dispatch(setError(error.response.data));
    }
  };
};
