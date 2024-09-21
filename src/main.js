// main.js
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import "./style.css";
import App from "./App.vue";
import Body from "./components/Body.vue";
import Countdown from "vue3-flip-countdown";
import UPDATE from "./components/UPDATE.vue";
import { createStore } from "vuex";
import BookDetailsPage from "./components/BookDetailsPage.vue";


// // Vuex Store
const store = createStore({
  state() {
    return {
      toggleMenu: false,
      books: [],
    };
  },
});

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: Body },
    { path: "/update", component: UPDATE },
    {
      path: "/book/:isbn",
      name: "BookDetailsPage",
      component: BookDetailsPage,
      props: true,
    },
  ],
});

const app = createApp(App);
// const { createVuetify } = Vuetify;
// const vuetify = createVuetify();
app.use(store);
app.use(router);
app.use(Countdown);
// app.use(vuetify);
app.mount("#app");
