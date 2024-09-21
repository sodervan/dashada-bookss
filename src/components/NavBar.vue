<template>
  <div class="fixed top-0 left-0 w-full bg-white shadow-md z-[2000]">
    <div
      class="flex flex-wrap items-center px-4 py-3 justify-between lg:px-10 lg:py-5"
    >
      <!-- Brand Logo/Name -->
      <div class="flex-shrink-0">
        <p class="font-semibold text-xl lg:text-2xl">DASHADA</p>
      </div>

      <!-- Menu Button for Small Screens -->
      <div class="block lg:hidden">
        <div
          @click="toggleMenu"
          class="flex items-center py-2 px-4 bg-primaryPurple rounded-lg gap-2 cursor-pointer"
        >
          <p class="text-white">Menu</p>
          <i
            :class="{
              'fi fi-rr-caret-down': !$store.state.toggleMenu,
              'fi fi-rr-caret-up': $store.state.toggleMenu,
              'text-white': true,
            }"
          ></i>
        </div>
      </div>

      <!-- Search Bar and Links for Larger Screens -->
      <div class="hidden lg:flex items-center gap-4">
        <!-- Search Input -->
        <div
          class="flex items-center px-4 py-2 border border-gray-200 bg-[#F3F3F3] rounded-lg"
        >
          <input
            type="text"
            placeholder="Find books here"
            class="bg-transparent focus:outline-none w-full"
          />
          <i class="fi fi-rr-search text-gray-500 ml-2"></i>
        </div>

        <!-- Login and Signup Links -->
        <div class="flex gap-2">
          <router-link
            to="/login"
            class="text-gray-700 hover:text-primaryPurple"
            >Login</router-link
          >
          <router-link
            to="/signup"
            class="text-gray-700 hover:text-primaryPurple"
            >Sign up</router-link
          >
        </div>
      </div>
    </div>

    <!-- Menu for Small Screens -->
    <transition
      name="menu-transition"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <Menu v-if="$store.state.toggleMenu" class="block lg:hidden" />
    </transition>

    <!-- Search and Links for Small Screens -->
    <div v-if="$store.state.toggleMenu" class="block lg:hidden">
      <div class="flex flex-col items-center gap-2 py-2">
        <!-- Search Input for Small Screens -->
        <div
          class="flex items-center px-4 py-2 w-11/12 border border-gray-200 bg-[#F3F3F3] rounded-lg"
        >
          <input
            type="text"
            placeholder="Find books here"
            class="bg-transparent focus:outline-none w-full"
          />
          <i class="fi fi-rr-search text-gray-500 ml-2"></i>
        </div>

        <!-- Login and Signup Links for Small Screens -->
        <div class="flex flex-col gap-2 w-11/12">
          <router-link
            to="/login"
            class="text-center text-gray-700 hover:text-primaryPurple py-2"
          >
            Login
          </router-link>
          <router-link
            to="/signup"
            class="text-center text-gray-700 hover:text-primaryPurple py-2"
          >
            Sign up
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from "./Menu.vue";

export default {
  components: { Menu },
  data() {
    return {};
  },
  methods: {
    toggleMenu() {
      this.$store.commit("toggleTheMenu");
    },

    beforeEnter(el) {
      el.style.transform = "translateY(-20%)";
      el.style.opacity = "0";
    },
    enter(el, done) {
      el.offsetHeight; // Trigger reflow to restart the transition
      el.style.transition = "transform 0.3s ease, opacity 0.5s ease";
      el.style.transform = "translateY(0)";
      el.style.opacity = "1";
      done();
    },
    leave(el, done) {
      el.style.transition = "transform 0.3s ease, opacity 0.5s ease";
      el.style.opacity = "0";
      done();
    },
  },
};
</script>

<style scoped>
.menu-transition-enter-active,
.menu-transition-leave-active {
  transition: opacity 0.5s ease, transform 0.3s ease;
}

.menu-transition-enter,
.menu-transition-leave-to {
  opacity: 0;
  transform: translateY(-20%);
}
</style>
