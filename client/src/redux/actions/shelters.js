import axios from "axios";

export const setShelters = (shelters) => {
  return {
    type: "SET_SHELTERS",
    payload: shelters,
  };
};

export const fetchShelters = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("api/shelters");
      dispatch(setShelters(res.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteShelter = (id) => {
  return {
    type: "DELETE_SHELTER",
    payload: id,
  };
};
