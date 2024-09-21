<!-- CategoryPage.vue -->
<template>
  <div class="flex flex-col items-center">
    <h2 class="text-4xl font-bold mb-8 text-secondaryPurple">
      Select a Category
    </h2>

    <!-- Category Selection and Dropdown -->
    <div
      class="flex items-center gap-6 justify-center flex-wrap px-20 py-16 bg-gray-100"
    >
      <div
        v-for="category in visibleCategories"
        :key="category"
        @click="selectCategory(category)"
        class="bg-white shadow-md cursor-pointer transition-transform transform hover:scale-105 duration-300 ease-in-out text-gray-700 font-semibold py-4 px-8 rounded-lg"
      >
        {{ category }}
      </div>

      <!-- Dropdown for Other Categories -->
      <div class="relative">
        <button
          @click="toggleDropdown"
          class="bg-white shadow-md cursor-pointer transition-transform transform hover:scale-105 duration-300 ease-in-out text-gray-700 font-semibold py-4 px-8 rounded-lg"
        >
          More Categories
        </button>
        <div
          v-if="dropdownVisible"
          class="absolute bg-white shadow-lg rounded-lg mt-2 py-2 w-48 z-10"
        >
          <div
            v-for="category in dropdownCategories"
            :key="category"
            @click="
              selectCategory(category);
              toggleDropdown();
            "
            class="py-2 px-4 hover:bg-gray-100 cursor-pointer"
          >
            {{ category }}
          </div>
        </div>
      </div>

      <!-- View All Books Button -->
      <button
        @click="viewAllBooks"
        class="bg-[#F5227A] text-white py-4 px-8 rounded-lg font-semibold transition-transform transform hover:scale-105 duration-300 ease-in-out"
      >
        View All Books
      </button>
    </div>

    <!-- Selected Category and Books -->
    <div v-if="selectedCategory" class="my-12">
      <h3 class="text-2xl font-semibold text-secondaryPurple px-20">
        {{ selectedCategory }} Books
      </h3>
      <transition name="fade" mode="out-in">
        <div
          class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8 mt-8 px-20"
        >
          <div
            v-for="book in books[selectedCategory]"
            :key="book.ISBN"
            @click="goToBookDetails(book.ISBN)"
            class="bg-white p-6 shadow-md rounded-lg cursor-pointer transition-transform transform flex flex-col justify-between my-3 hover:scale-105 duration-300 ease-in-out"
          >
            <div>
              <img
                :src="book.cover"
                alt=""
                class="h-48 w-full object-cover rounded-lg mb-4"
              />
              <h4 class="text-md font-semibold text-gray-800">
                {{ book.title }}
              </h4>
              <p class="text-sm text-gray-500 my-2">
                {{ book.authors.join(", ") }}
              </p>
            </div>
            <div
              class="bg-[#DBCEE0] flex items-center justify-between px-3 py-3 rounded-[12px]"
            >
              <div class="text-[16px] font-medium">N{{ book.price }}</div>
              <div
                class="bg-primaryPurple flex items-center justify-center w-10 h-10 rounded-full"
              >
                <i class="fi fi-rr-shop text-white"></i>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- View All Books Section -->
    <div v-if="viewAll" class="mt-12">
      <h3 class="text-2xl font-semibold text-secondaryPurple px-20">
        All Books
      </h3>
      <transition name="fade" mode="out-in">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8 px-20"
        >
          <div v-for="category in categories" :key="category">
            <div
              v-for="book in books[category]"
              :key="book.ISBN"
              @click="goToBookDetails(book.ISBN)"
              class="bg-white p-6 shadow-md my-8 rounded-lg transition-transform transform hover:scale-105 duration-300 ease-in-out"
            >
              <img
                :src="book.cover"
                alt=""
                class="h-48 w-full object-cover rounded-lg mb-4"
              />
              <h4 class="text-lg font-semibold text-gray-800">
                {{ book.title }}
              </h4>
              <p class="text-sm text-gray-500">{{ book.authors.join(", ") }}</p>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [],
      visibleCategories: [],
      dropdownVisible: false,
      selectedCategory: null,
      viewAll: false,
      books: {},
    };
  },
  computed: {
    dropdownCategories() {
      // Return categories not currently visible
      return this.categories.filter(
        (category) => !this.visibleCategories.includes(category)
      );
    },
  },
  methods: {
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
    selectCategory(category) {
      this.selectedCategory = category;
      this.viewAll = false;

      // Ensure selected category is added to visibleCategories if it's from the dropdown
      if (!this.visibleCategories.includes(category)) {
        this.visibleCategories.push(category);
      }

      // Hide the dropdown after selecting a category
      this.dropdownVisible = false;
    },
    viewAllBooks() {
      this.viewAll = true;
      this.selectedCategory = null;
    },
    async fetchBooks() {
      try {
        const response = await fetch(
          "https://dashada-books-bf412-default-rtdb.firebaseio.com/books.json"
        );
        const data = await response.json();

        if (data) {
          this.books = data;
          this.categories = Object.keys(data);
          this.visibleCategories = this.categories.slice(0, 5);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    },
    goToBookDetails(isbn) {
      this.$router.push({ name: "BookDetailsPage", params: { isbn } });
    },
  },
  mounted() {
    this.fetchBooks();
  },
};
</script>

<style scoped>
/* Transition for books grid */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
