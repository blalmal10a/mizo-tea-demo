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
    firebase.auth().onAuthStateChanged((usr) => {
      if (usr) {
        var uid = usr.uid;
        localStorage.setItem("user", usr);
        user.data = usr;
        home.getLocation();
        home.getList(usr);
        home.innerLoading = false;
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
