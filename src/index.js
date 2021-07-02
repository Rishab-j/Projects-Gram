import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers/rootReducer';
import { createFirestoreInstance ,reduxFirestore, getFirestore } from 'redux-firestore';
import { getFirebase, ReactReduxFirebaseProvider } from 'react-redux-firebase';
import firebaseConfig from './config/firbaseConfig';
import firebase from 'firebase';

const store = createStore(
  rootReducer,
  compose(
      applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
      reduxFirestore(firebase, firebaseConfig)
  )
);

const cred = {  // used to get logged in user data, (it's passed down below in rrfProps)
  userProfile: 'users', // where profiles are stored in database,
  useFirestoreForProfile: true
};

const rrfProps = {
  firebase,
  config: cred, firebaseConfig, // custom config, firebase config
  dispatch: store.dispatch,
  createFirestoreInstance,
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store = { store }>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <App /> 
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
