<template>
  <div class="bg-[#5B067D] flex gap-10 pl-20 py-10">
    <div class="w-[30%]">
      <div>
        <p class="text-3xl text-white font-medium">Flash Sale</p>
      </div>
      <div class="my-3">
        <p class="text-sm text-gray-300">
          📚 Flash Sale Alert! 🎉 Grab your favorite books at unbeatable prices
          for a limited time only! Hurry, the clock is ticking—once these deals
          are gone, they’re gone for good!
        </p>
      </div>
      <div>
        <Countdown labelSize="0.5rem" labelColor="#fff" countdownSize="2rem" />
      </div>
    </div>
    <div class="flex gap-3">
      div
      <div
        v-for="book in books[categories[0]]"
        :key="book.ISBN"
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
</template>
<script>
import { Countdown } from "vue3-flip-countdown";

export default {
  name: "FlashSale",
  data() {
    return {
      books: null,
      categories: null,
    };
  },
  components: {
    Countdown,
  },
  methods: {
    async fetchBooks() {
      try {
        // Fetch books data from Firebase
        const response = await fetch(
          "https://dashada-books-bf412-default-rtdb.firebaseio.com/books.json"
        );
        const data = await response.json();

        if (data) {
          this.books = data;

          // Extract categories from the fetched data
          this.categories = Object.keys(data);

          // Set the visible categories (first 5 categories)
          this.visibleCategories = this.categories.slice(0, 5);
        } else {
          console.error("No data found in Firebase");
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    },
  },
  mounted() {
    // Fetch books from Firebase when the component is mounted
    this.fetchBooks();
  },
};
</script>
