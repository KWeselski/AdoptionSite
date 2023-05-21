const applicationsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_APPLICATIONS':
      return action.payload;
    case 'DELETE_APPLICATION':
      return state.filter((application) => application._id !== action.payload);
    default:
      return state;
  }
};

export default applicationsReducer;
