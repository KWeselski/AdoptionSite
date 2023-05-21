import axios from 'axios';

export const setShelters = (shelters) => ({
  type: 'SET_SHELTERS',
  payload: shelters,
});

export const deleteShelter = (id) => ({
  type: 'DELETE_SHELTER',
  payload: id,
});

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
