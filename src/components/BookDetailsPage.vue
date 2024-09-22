<template>
  <div class="container mt-20 mx-auto p-8 fade-in max-w-5xl">
    <!-- Show loader while the book is being fetched -->
    <Loader v-if="isLoading" />

    <!-- Book Details Section -->
    <div
      v-if="!isLoading && book"
      class="flex flex-col md:flex-row items-center justify-center bg-white p-6 rounded-lg shadow-lg"
    >
      <!-- Book Cover -->
      <div class="w-full md:w-1/3 mb-8 md:mb-0 flex justify-center">
        <img
          :src="book.cover"
          alt="Book Cover"
          class="rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105"
        />
      </div>

      <!-- Book Details -->
      <div class="w-full md:w-2/3 md:pl-8 text-center md:text-left">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">{{ book.title }}</h1>
        <p class="text-xl text-gray-600 mb-4">
          by {{ book.authors.join(", ") }}
        </p>
        <p class="text-gray-700 mb-6">{{ book.description }}</p>

        <div
          class="flex flex-col md:flex-row items-center md:justify-between mt-6"
        >
          <p class="text-3xl font-semibold text-gray-900 mb-4 md:mb-0">
            {{ book.price }} NGN
          </p>
        </div>

        <!-- Call to Order Button -->
        <div class="mt-6 flex gap-3">
          <button
            @click="callToOrder"
            class="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-500 transition-colors duration-300"
          >
            Call to Order
          </button>
          <button
            @click="orderBook"
            class="bg-green-600 text-white py-3 px-8 rounded-lg hover:bg-green-500 transition-colors duration-300"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>

    <!-- Similar Books Section -->
    <div v-if="!isLoading && similarBooks.length" class="mt-16">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">
        Books in the same category
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="similarBook in similarBooks"
          :key="similarBook.ISBN"
          class="bg-white p-4 rounded-lg flex flex-col justify-between shadow-lg transform transition-transform duration-500 hover:scale-105"
        >
          <div>
            <img
              :src="similarBook.cover"
              alt="Book Cover"
              class="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              {{ similarBook.title }}
            </h3>
            <p class="text-gray-600 mb-2">
              by {{ similarBook.authors.join(", ") }}
            </p>
            <p class="text-gray-700 mb-4">{{ similarBook.price }} NGN</p>
          </div>
          <button
            @click="selectSimilarBook(similarBook.ISBN)"
            class="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-500 transition-colors duration-300"
          >
            View Details
          </button>
        </div>
      </div>
    </div>

    <!-- Order Page Modal -->
    <ContactOrder v-if="showOrderPage" :book="book" @click="closeOrderPage" />
  </div>
</template>

<script>
import ContactOrder from "./ContactOrder.vue";
import Loader from "./Loader.vue"; // Import your Loader

export default {
  props: ["isbn"],
  data() {
    return {
      book: null,
      similarBooks: [],
      showOrderPage: false, // State to toggle the Order Page
      isLoading: true, // State to track loading
    };
  },
  methods: {
    async fetchBookDetails() {
      this.isLoading = true; // Set loading to true before fetching data
      try {
        const response = await fetch(
          `https://dashada-books-bf412-default-rtdb.firebaseio.com/books.json`
        );
        const data = await response.json();

        for (const category in data) {
          const booksInCategory = Array.isArray(data[category])
            ? data[category]
            : Object.values(data[category]);

          const foundBook = booksInCategory.find((b) => b.ISBN === this.isbn);
          if (foundBook) {
            this.book = foundBook;
            // Fetch books in the same category excluding the current book
            this.similarBooks = booksInCategory.filter(
              (b) => b.ISBN !== this.isbn
            );
            break;
          }
        }
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        this.isLoading = false; // Set loading to false after fetching data
      }
    },
    orderBook() {
      this.showOrderPage = true; // Show the order page when "Order Now" is clicked
    },
    closeOrderPage() {
      this.showOrderPage = false; // Close the order page modal and reset the state
    },
    callToOrder() {
      window.open("tel:+2348038181988", "_self"); // Replace with actual phone number
    },
    selectSimilarBook(isbn) {
      this.$router.push({ name: "BookDetailsPage", params: { isbn } }); // Update the route with the new ISBN
    },
  },
  watch: {
    isbn: {
      immediate: true,
      handler() {
        this.fetchBookDetails(); // Re-fetch book details when isbn changes
      },
    },
  },
  components: {
    ContactOrder,
    Loader, // Register the loader
  },
};
</script>
