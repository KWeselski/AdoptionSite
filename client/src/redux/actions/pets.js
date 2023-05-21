import axios from 'axios';

export const setPets = (pets) => ({
  type: 'SET_PETS',
  payload: pets,
});

export const deletePetSucess = (id) => ({
  type: 'DELETE_PET',
  payload: id,
});

export const deletePet = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`api/animals/${id}`);
      dispatch(deletePetSucess(id));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchPets = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('api/animals/manage');
      dispatch(setPets(res.data));
    } catch (error) {
      console.error(error);
    }
  };
};
