import authRequest from '../../utils/authRequest';
import { SET_APPLICATIONS, DELETE_APPLICATION } from '../constants';
import { setError } from './errors';

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
      const res = await authRequest.get('api/applications', {
        params: {
          partial: true,
        },
      });
      dispatch(setApplications(res.data));
    } catch (error) {
      dispatch(setError(error.response.data));
    }
  };
};

export const fetchUserApplications = () => {
  return async (dispatch) => {
    try {
      const res = await authRequest.get('api/applications/user');
      dispatch(setApplications(res.data));
    } catch (error) {
      dispatch(setError(error.response.data));
    }
  };
};

export const reviewApplication = (id, accepted) => async (dispatch) => {
  try {
    await authRequest.put(`/api/applications/${id}`, { accepted });
    dispatch(deleteApplication(id));
    dispatch(fetchApplications());
  } catch (error) {
    dispatch(setError(error.response.data));
  }
};

export const deleteApplicationById = (id) => async (dispatch) => {
  try {
    await authRequest.delete(`/api/applications/${id}`);
    dispatch(deleteApplication(id));
  } catch (error) {
    dispatch(setError(error.response.data));
  }
};
