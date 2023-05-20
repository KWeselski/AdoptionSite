import applicationsReducer from "./applicationsReducer";
import sheltersReducer from "./sheltersReducer";
import petsReducer from "./petsReducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  applications: applicationsReducer,
  pets: petsReducer,
  shelters: sheltersReducer,
});

export default rootReducer;
