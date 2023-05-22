import axios from 'axios';

import { SET_APPLICATIONS, DELETE_APPLICATION } from '../constants';

export const setApplications = (pets) => ({
  type: SET_APPLICATIONS,
  payload: pets,
});

export const deleteApplication = (id) => ({
  type: DELETE_APPLICATION,
  payload: id,
});

export const fetchApplications = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('api/applications', {
        params: {
          partial: true,
        },
      });
      dispatch(setApplications(res.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const reviewApplication = (id, accepted) => async (dispatch) => {
  try {
    await axios.put(`/api/applications/${id}`, { accepted });
    dispatch(deleteApplication(id));
    dispatch(fetchApplications());
  } catch (error) {
    console.error(error);
  }
};
