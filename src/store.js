import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer }from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';

import { firebaseCredentials } from './utils/config'


// Reducers
const firebaseConfig = {
    apiKey: firebaseCredentials.apiKey,
    authDomain: firebaseCredentials.authDomain,
    databaseURL: firebaseCredentials.databaseURL,
    projectId: firebaseCredentials.projectId,
    storageBucket: firebaseCredentials.storageBucket,
    messagingSenderId: firebaseCredentials.messagingSenderId,
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
    firestore: firestoreReducer
});

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