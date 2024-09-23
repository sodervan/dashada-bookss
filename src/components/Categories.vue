<template>
  <div class="flex flex-col items-center">
    <h2 class="text-4xl font-bold mb-8 text-secondaryPurple">
      Select a Category
    </h2>

    <!-- Loader -->
    <div v-if="loading" class="flex justify-center items-center h-48">
      <div class="loader"></div>
    </div>

    <!-- Category Selection and Dropdown -->
    <div
      v-else
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
              toggleDropdown;
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

    <!-- Category Books Modal -->
    <transition name="modal">
      <div
        v-if="showModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20 mt-20"
      >
        <div
          class="bg-white rounded-lg shadow-lg overflow-hidden w-[90%] max-w-4xl max-h-[90%] overflow-y-auto relative"
          @scroll="handleScroll"
        >
          <!-- Category Header (Sticky) -->
          <div
            ref="modalHeader"
            class="sticky top-0 w-full bg-white z-[1000] py-4 px-8 flex justify-between items-center transition-shadow"
            :class="{ 'shadow-lg': isScrolled }"
          >
            <!-- Category Books Title -->
            <h3 class="text-2xl font-semibold text-secondaryPurple text-center">
              {{ selectedCategory }} Books
            </h3>
            <!-- Close Modal Button (Back Arrow) -->
            <button
              @click="closeModal"
              class="text-gray-600 hover:text-gray-800"
            >
              <i class="fi fi-rr-arrow-small-left text-2xl"></i>
            </button>
          </div>

          <!-- Dynamic Grid of Books -->
          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center p-8"
          >
            <div
              v-for="book in books[selectedCategory]"
              :key="book.ISBN"
              @click="goToBookDetails(book.ISBN)"
              class="bg-white p-6 shadow-md rounded-lg cursor-pointer transition-transform transform flex flex-col justify-between my-3 hover:scale-105 duration-300 ease-in-out w-full max-w-xs"
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
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true, // Loading state
      categories: [],
      visibleCategories: [],
      dropdownVisible: false,
      selectedCategory: null,
      viewAll: false,
      showModal: false,
      books: {},
      isScrolled: false, // For adding shadow on scroll
    };
  },
  computed: {
    dropdownCategories() {
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
      this.showModal = true;

      if (!this.visibleCategories.includes(category)) {
        this.visibleCategories.push(category);
      }

      this.dropdownVisible = false;
    },
    closeModal() {
      this.showModal = false;
      this.isScrolled = false;
    },
    viewAllBooks() {
      this.viewAll = true;
      this.selectedCategory = null;
      this.showModal = false;
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
      } finally {
        this.loading = false; // Hide the loader once fetching is complete
      }
    },
    goToBookDetails(isbn) {
      this.$router.push({ name: "BookDetailsPage", params: { isbn } });
    },
    handleScroll(event) {
      const scrollTop = event.target.scrollTop;
      this.isScrolled = scrollTop > 0;
    },
  },
  mounted() {
    this.fetchBooks();
  },
};
</script>

<style scoped>
/* Loader Styles */
.loader {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #4f46e5;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Modal transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;
}

/* Fade transition for books grid */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
