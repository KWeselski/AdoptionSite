import { combineReducers } from 'redux';

import applicationsReducer from './applicationsReducer';
import petsReducer from './petsReducer';
import sheltersReducer from './sheltersReducer';

const rootReducer = combineReducers({
  applications: applicationsReducer,
  pets: petsReducer,
  shelters: sheltersReducer,
});

export default rootReducer;
