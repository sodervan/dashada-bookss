<template>
  <div class="bg-[#380B46] py-12 px-20 w-full flex justify-center">
    <div class="flex gap-12">
      <div class="flex justify-center gap-2 flex-col items-center">
        <div class="flex items-center gap-2">
          <div>
            <i class="fi fi-rr-store-alt text-white text-3xl"></i>
          </div>
          <div class="text-white text-3xl">2</div>
        </div>
        <p class="text-gray-400 text-sm">Located at ...</p>
      </div>
      <div class="flex justify-center gap-2 flex-col items-center">
        <div class="flex items-center gap-2">
          <div>
            <i class="fi fi-rr-people text-white text-3xl"></i>
          </div>
          <div class="text-white text-3xl">1000</div>
        </div>
        <p class="text-gray-400 text-sm">Over 1k happy customers</p>
      </div>
      <div class="flex justify-center gap-2 flex-col items-center">
        <div class="flex items-center gap-2">
          <div>
            <i class="fi fi-rr-books text-white text-3xl"></i>
          </div>
          <div class="text-white text-3xl">20+k</div>
        </div>
        <p class="text-gray-400 text-sm">Books collection</p>
      </div>
    </div>
  </div>
  <!--FOOTER-->
  <footer class="bg-gray-900 text-gray-200 py-10">
    <div
      class="container mx-auto flex flex-col md:flex-row justify-between items-start px-4"
    >
      <!-- Company Info Section -->
      <div class="mb-6 md:mb-0 md:w-1/4">
        <h2 class="text-xl font-semibold mb-4">Dashada Books</h2>
        <p class="text-gray-400 mb-4">
          Your one-stop online store for academic books, novels, and more.
          Explore our vast collection of quality books!
        </p>
        <p class="text-gray-400">© 2024 Dashada Books. All rights reserved.</p>
      </div>

      <!-- Quick Links Section -->
      <div class="mb-6 md:mb-0 md:w-1/4">
        <h2 class="text-xl font-semibold mb-4">Quick Links</h2>
        <ul>
          <li class="mb-2">
            <router-link to="/" class="text-gray-400 hover:text-white"
              >Home
            </router-link>
          </li>
          <li class="mb-2">
            <router-link
              to="/collections"
              class="text-gray-400 hover:text-white"
              >Collections
            </router-link>
          </li>
          <li class="mb-2">
            <router-link to="/about" class="text-gray-400 hover:text-white"
              >About Us
            </router-link>
          </li>
          <li class="mb-2">
            <router-link to="/contact" class="text-gray-400 hover:text-white"
              >Contact Us
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Contact Section -->
      <div class="mb-6 md:mb-0 md:w-1/4">
        <h2 class="text-xl font-semibold mb-4">Contact Us</h2>
        <ul>
          <li class="mb-2 text-gray-400">Phone: +234 800 123 4567</li>
          <li class="mb-2 text-gray-400">Email: info@dashadabooks.com</li>
          <li class="mb-2 text-gray-400">WhatsApp: +234 800 765 4321</li>
        </ul>
      </div>

      <!-- Social Media Section -->
      <div class="md:w-1/4">
        <h2 class="text-xl font-semibold mb-4">Follow Us</h2>
        <div class="flex space-x-4">
          <a href="#" class="text-gray-400 hover:text-white">
            <i class="fi fi-brands-facebook"></i>
          </a>
          <a href="#" class="text-gray-400 hover:text-white">
            <i class="fi fi-brands-twitter"></i>
          </a>
          <a href="#" class="text-gray-400 hover:text-white">
            <i class="fi fi-brands-instagram"></i>
          </a>
          <a href="#" class="text-gray-400 hover:text-white">
            <i class="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped></style>
<script setup lang="ts"></script>
