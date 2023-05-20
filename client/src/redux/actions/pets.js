import axios from "axios";

export const setPets = (pets) => {
  return {
    type: "SET_PETS",
    payload: pets,
  };
};

export const fetchPets = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("api/animals/manage");
      dispatch(setPets(res.data));
    } catch (error) {
      console.error(error);
    }
  };
};
