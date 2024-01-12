<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <!-- <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        /> -->
        <q-toolbar-title>
          Firebase Authentication
        </q-toolbar-title>
        <q-space></q-space>
        <q-btn
          flat
          dense
          round
          @click="user.logout()"
          icon="logout"
        ></q-btn>
      </q-toolbar>
    </q-header>

    <!-- <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>

      </q-list>
    </q-drawer> -->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script setup>
import { user } from 'src/scripts/auth/user';
import { ref } from 'vue';

const leftDrawerOpen = ref(false);
</script>
