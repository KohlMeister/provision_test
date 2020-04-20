import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBe_nlfGuaC4Aeqwoff7YUiOl2prBCNPQk",
  authDomain: "provision-test-32bad.firebaseapp.com",
  databaseURL: "https://provision-test-32bad.firebaseio.com",
  projectId: "provision-test-32bad",
  storageBucket: "provision-test-32bad.appspot.com",
  messagingSenderId: "818033766487"
}

firebase.initializeApp(config);

export const firebaseDB = firebase.database().ref();