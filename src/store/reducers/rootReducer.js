// here we are combining our reducers into one root reducer
// because redux accepts only a single reducer

import authReducer from "./authReducer";
import projectReducer from "./projectReducer";
import { combineReducers } from "redux"; // this is combining the reducers
import { firestoreReducer } from 'redux-firestore'; // used for syncing firestore data with the background
import { firebaseReducer } from "react-redux-firebase";// used for syncing firebase information such as authentication

const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    firestore: firestoreReducer, // responsible for syncing our data
    firebase: firebaseReducer, // responsible for auth. info.
});

export default rootReducer;