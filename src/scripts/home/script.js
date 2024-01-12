import { Notify } from "quasar";
import { db } from "src/boot/firebase";
import { reactive } from "vue";
import { user } from "../auth/user";

const home = reactive({
  form: {
    dawr_hming: "",
    neitu_hming: "",
    phone: "",
    address: "",
    latitude: "",
    longitude: "",
    created_at: null,
  },
  innerLoading: false,
  show_form: true,
  sold_list: [],
  loadingSubmit: false,
  getLocation,
  onSubmit,
  getList,
});
async function getList() {
  try {
    db.collection(user.data.phone ?? user.data.email ?? user.data.id)
      .orderBy("created_at", "desc")
      .get()
      .then((colleciton) => {
        colleciton.forEach((doc) => home.sold_list.push(doc.data()));
      });
  } catch (error) {
    console.error(error.message);
  }
}
async function onSubmit(route, router) {
  try {
    home.loadingSubmit = true;
    getLocation(true);
  } catch (error) {
    home.loadingSubmit = false;
    console.error(error.message);
  }
}

async function storeDataToFirestore() {
  try {
    home.form.created_at = Date.now();
    db.collection(user.data.phone ?? user.data.email ?? user.data.id)
      .add(home.form)
      .then((docRef) => {
        home.sold_list.upsert(home.form);
        resetForm();
        Notify.create("Data added");
      })
      .catch((error) => {
        Notify.create("Error: ", error);

        console.error("Error adding document: ", error);
      });
    home.loadingSubmit = false;
  } catch (error) {
    console.error(error.message);
  }
}
async function getLocation(add) {
  try {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (data) => {
          console.log("data", data);
          home.form.latitude = data.coords.latitude;
          home.form.longitude = data.coords.longitude;
          if (add) storeDataToFirestore();
        },
        (error) => {
          alert("Please turn on location");
          if (add) storeDataToFirestore();
          // Notify.create("Please enable location access");
        }
      );
    } else {
      alert("not supported");
    }
  } catch (error) {
    alert("geo location is not allowed");
    //
  }
}
function resetForm() {
  home.form = {
    dawr_hming: "",
    neitu_hming: "",
    phone: "",
    address: "",
    latitude: "",
    longitude: "",
  };
}
export { home };
