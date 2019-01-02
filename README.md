# Tutor Panel with React
## Track tutoring account balances 

## Simple balance tracking web app
- Create a tutor:
1. First Name
2. Last Name
3. Email
4. Phone Number
5. Current Balance
- Edit tutors
- Delete tutors
- Change settings to allow registration for outside users

## Technologies
- React (frontend) & Redux (state management w/ React-Redux-Firebase driver)
- Firebase Cloud Firestore (for cloud-hosted NOSQL database)

## Set Up
- Clone repo, cd into directory
- Run `npm install` or `yarn`
- Run `npm start` or `yarn start`
- Modify /src/utils/config_default.js: rename to config.js and add your Firebase credentials
- Connect to Firebase

## Notes
- React-Redux-Firebase: allows us to integrate Firebase into Redux store without
having to create new reducers: Firebase and Firestore in state, also auth
