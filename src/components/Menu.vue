<template>
  <div
    class="w-full flex items-center justify-center gap-5 py-4 bg-primaryPurple"
  >
    <router-link to="/">
      <p class="text-gray-100">Home</p>
    </router-link>

    <router-link to="/home">
      <p class="text-gray-100">Books</p>
    </router-link>

    <router-link to="/home">
      <p class="text-gray-100">TextBooks</p>
    </router-link>

    <router-link to="/home">
      <p class="text-gray-100">Popular</p>
    </router-link>

    <div class="flex items-center justify-center gap-2">
      <p class="text-gray-100">Show categories</p>
      <i class="fi fi-rr-caret-down text-white"></i>
    </div>
  </div>
</template>
