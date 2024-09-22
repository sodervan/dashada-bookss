<template>
  <div class="bg-gray-100 py-6 px-20 mb-28">
    <h1 class="text-3xl font-bold">Featured Books</h1>
    <p class="mt-4">
      Discover new books, exclusive offers, and popular categories. Browse
      through our collection, or ask the AI chatbot for more information about
      any book!
    </p>
    <h2 class="text-2xl font-bold mt-10">Trending and Featured Books</h2>
    <div class="books-display grid grid-cols-2 gap-6 mt-8">
      <div
        v-for="book in books"
        :key="book.id"
        class="book-item bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105"
      >
        <h3 class="text-xl font-bold">{{ book.title }}</h3>
        <p class="text-gray-600 mt-2">{{ book.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      books: [],
    };
  },
  async mounted() {
    await this.fetchBooks();
  },
  methods: {
    async fetchBooks() {
      try {
        const response = await fetch(
          "https://dashada-books-bf412-default-rtdb.firebaseio.com/trending.json"
        );
        const data = await response.json();
        this.books = Object.values(data || {});
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    },
  },
};
</script>

<style scoped>
.books-display {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.book-item {
  border-radius: 10px;
  transition: transform 0.3s;
}
</style>
