import { createStore, combineReducers, compose } from 'redux';
import * as functions from 'firebase-functions';
import firebase from 'firebase';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';

import { firebaseCredentials } from './utils/config';


// Reducers
import notifyReducer from './reducers/notifyReducer';
import settingsReducer from './reducers/settingsReducer';

const firebaseConfigEnv = {
    apiKey: process.env.REACT_APP_fireBaseApiKey,
    authDomain: process.env.REACT_APP_fireBaseAuthDomain,
    databaseURL: process.env.REACT_APP_firebaseDatabaseURL,
    projectId: process.env.REACT_APP_firebaseProjectId,
    storageBucket: process.env.REACT_APP_firebaseStorageBucket,
    messagingSenderId: process.env.REACT_APP_firebaseMessagingSenderId,
};

const firebaseConf = {
    apiKey: functions.config().firebaseapikey,
    authDomain: functions.config().firebaseauthdomain,
    databaseURL: functions.config().firebasedatabaseurl,
    projectId: functions.config().firebaseprojectid,
    storageBucket: functions.config().firebasestoragebucket,
    messagingSenderId: functions.config().firebasemessagingsenderid
}


const firebaseConfig = {
    apiKey: process.env.REACT_APP_fireBaseApiKey || firebaseCredentials.apiKey,
    authDomain: process.env.REACT_APP_fireBaseAuthDomain || firebaseCredentials.authDomain,
    databaseURL: process.env.REACT_APP_fireBaseDatabaseURL || firebaseCredentials.databaseURL,
    projectId: process.env.REACT_APP_firebaseProjectId || firebaseCredentials.projectId,
    storageBucket: process.env.REACT_APP_firebaseStorageBucket || firebaseCredentials.storageBucket,
    messagingSenderId: process.env.REACT_APP_firebaseMessagingSenderId || firebaseCredentials.messagingSenderId,
};

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true
}
// Init firebase instance
firebase.initializeApp(firebaseConfig);

// Init firestore
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    notify: notifyReducer,
    settings: settingsReducer
});

// Check for settings in localStorage


// Create initial state
const initialState = {};

// Create store
const store = createStoreWithFirebase(
    rootReducer, 
    initialState, 
    composeWithDevTools(
    reactReduxFirebase(firebase),
));


export default store;