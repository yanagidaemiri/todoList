<script setup lang="ts">
import { ref } from 'vue';

const drawer = ref(false);

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

</script>
<template>
  <v-app>
    <v-system-bar color="secondary">
      System Bar
    </v-system-bar>

    <v-app-bar color="primary">
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-app-bar-title>
        サンプルアプリ
      </v-app-bar-title>
      <NuxtLink to="/">
        <v-btn>
          <v-icon>
            mdi-home
          </v-icon>
        </v-btn>
      </NuxtLink>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" permanent>
      <v-list>
        <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home" :to="'/'"></v-list-item>
        <v-list-item prepend-icon="mdi-forum" title="TodoList" value="todolist" :to="'/todo'"></v-list-item>
        <v-list-item prepend-icon="mdi-delete-empty" title="StressBreak" value="stressbreak" :to="'/stressBreak'"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <NuxtPage />
      </v-container>
    </v-main>

      <v-footer color="primary" app>
        {{ new Date().getFullYear() }} — (c) Emily
      </v-footer>
      </v-app>
</template>
<style>
header {
    background: #000;
    color: #fff;
}

html {
font-family: "Permanent Marker", cursive;
}
</style>