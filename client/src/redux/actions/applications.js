import axios from "axios";

export const setApplications = (pets) => {
  return {
    type: "SET_APPLICATIONS",
    payload: pets,
  };
};

export const fetchApplications = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("api/applications", {
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
