import { combineReducers } from 'redux';

import applicationsReducer from './applicationsReducer';
import authReducer from './authReducer';
import { errorReducer } from './errorReducer';
import petsReducer from './petsReducer';
import sheltersReducer from './sheltersReducer';

const rootReducer = combineReducers({
  applications: applicationsReducer,
  auth: authReducer,
  errors: errorReducer,
  pets: petsReducer,
  shelters: sheltersReducer,
});

export default rootReducer;
