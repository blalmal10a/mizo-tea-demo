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
console.log("app is: ", app);
// FirebaseUI config.
var uiConfig = {
  signInSuccessUrl: "/",
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    {
      provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      defaultCountry: "IN",
    },
    // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
  ],
  // tosUrl and privacyPolicyUrl accept either url string or a callback
  // function.
  // Terms of service url/callback.
  // tosUrl: null,
  // Privacy policy url/callback.
  privacyPolicyUrl: function () {
    window.location.assign("#privacy");
  },
};
