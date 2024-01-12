import { reactive } from "vue";
import { home } from "../home/script";

const user = reactive({
  data: null,
  check_auth: check_auth,
  logout,
  ui: null,
});
async function check_auth(router) {
  try {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var uid = user.uid;
        console.log(user);
        home.getLocation();
        // ...
      } else {
        router.push({
          name: "login",
        });
      }
    });
  } catch (error) {
    router.push({
      name: "login",
    });
  }
}

async function logout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      window.location = "/auth/login";
    })
    .catch((error) => {
      window.location = "/auth/login";
      // An error happened.
    });
}

export { user };
