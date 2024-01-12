const firebaseConfig = {
  apiKey: "AIzaSyAmWzot2dA6fIbHxlkcQS7qABRjvjBnE6o",
  authDomain: "mizo-tea.firebaseapp.com",
  projectId: "mizo-tea",
  storageBucket: "mizo-tea.appspot.com",
  messagingSenderId: "435207357488",
  appId: "1:435207357488:web:6ad44ec866c56613a0d9f5",
  measurementId: "G-FBC3JQLNNG",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

// FirebaseUI config.
var uiConfig = {
  signInSuccessUrl: "/",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    {
      provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      defaultCountry: "IN",
      recaptchaParameters: {
        type: "image", // 'audio'
        size: "invisible", //'normal', 'invisible' or 'compact'
        badge: "bottomleft", //' bottomright' or 'inline' applies to invisible.
      },
    },
  ],

  privacyPolicyUrl: function () {
    window.location.assign("#privacy");
  },
};
