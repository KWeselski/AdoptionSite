const sheltersReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_SHELTERS":
      return action.payload;
    case "DELETE_SHELTER":
      return state.filter((shelter) => shelter._id !== action.payload);
    default:
      return state;
  }
};

export default sheltersReducer;
