import { Notify } from "quasar";
import { reactive } from "vue";

const home = reactive({
  form: {
    dawr_hming: "",
    neitu_hming: "",
    phone: "",
    Address: "",
  },
  getLocation,
});
async function getLocation() {
  try {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (data) => {
          console.log("data", data);
        },
        (error) => {
          Notify.create("Please enable location access");
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

export { home };
