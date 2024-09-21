<template>
  <NavBar />
  <main>
    <router-view></router-view>
  </main>
</template>

<script>
import Body from "./components/Body.vue";
import NavBar from "./components/NavBar.vue";
import Menu from "./components/Menu.vue";

export default {
  components: {
    Body,
    NavBar,
    Menu,
},
};
</script>
