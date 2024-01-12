<template>
  <div>
    <div class="card-container">
      <div class="card">
        <div class="card-overlay"></div>
        <div
          class="card-inner"
          style="min-width: min(400px, 90vw);"
        >

          <div id="firebaseui-auth-container">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { user } from 'src/scripts/auth/user';
import { onMounted, ref } from 'vue';
var ui
let phoneField = null;
onMounted(() => {
  if (!ui)
    ui = new firebaseui.auth.AuthUI(firebase.auth())
  ui.start("#firebaseui-auth-container", uiConfig)
});

function listenPhoneField() {
  //
}
</script>
<style>
.firebaseui-id-page-callback {
  min-height: 1px !important;
  max-height: 1px !important;
  width: 200px;
}
</style>
