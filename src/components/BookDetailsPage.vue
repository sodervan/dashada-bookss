<template>
  <div class="container mx-auto p-8 fade-in max-w-5xl">
    <!-- Book Details Section -->
    <div
      v-if="book"
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
          <button
            @click="orderBook"
            class="bg-green-600 text-white py-3 px-8 rounded-lg hover:bg-green-500 transition-colors duration-300"
          >
            Order Now
          </button>
        </div>

        <!-- Call to Order Button -->
        <div class="mt-6">
          <button
            @click="callToOrder"
            class="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-500 transition-colors duration-300"
          >
            Call to Order
          </button>
        </div>
      </div>
    </div>

    <!-- Similar Books Section -->
    <div v-if="similarBooks.length" class="mt-16">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">
        Books in the same category
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="similarBook in similarBooks"
          :key="similarBook.ISBN"
          class="bg-white p-4 rounded-lg shadow-lg cursor-pointer transform transition-transform duration-500 hover:scale-105"
        >
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
    <ContactOrder
      v-if="showOrderPage"
      :book="book"
      @close="showOrderPage = false"
    />
  </div>
</template>

<script>
import ContactOrder from "./ContactOrder.vue";

export default {
  props: ["isbn"],
  data() {
    return {
      book: null,
      similarBooks: [],
      showOrderPage: false, // State to toggle the Order Page
    };
  },
  methods: {
    async fetchBookDetails() {
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
      }
    },
    orderBook() {
      this.showOrderPage = true; // Show the order page when "Order Now" is clicked
    },
    callToOrder() {
      window.open("tel:+234XXXXXXXXXX", "_self"); // Replace with actual phone number
    },
    selectSimilarBook(isbn) {
      this.$emit("book-selected", isbn); // Emits an event to update the page with the selected book
    },
  },
  mounted() {
    this.fetchBookDetails();
  },
  components: {
    ContactOrder,
  },
};
</script>

<style scoped>
.container {
  margin-top: 5rem;
  animation: fadeIn 0.5s ease-out;
}

.fade-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.grid {
  gap: 2rem;
}

.shadow-lg {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}
</style>
