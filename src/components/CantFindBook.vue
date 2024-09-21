<template>
  <div
    class="cant-find-book-container bg-gray-50 p-8 rounded-lg shadow-lg mt-16 max-w-4xl mx-auto"
  >
    <!-- Section asking if the user can't find the book -->
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">
        Can't find the book you're looking for?
      </h2>
      <p class="text-gray-600 mb-6">Let us know, and we'll help you find it!</p>
      <button
        @click="toggleForm"
        class="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-500 transition-colors duration-300"
      >
        Request Book
      </button>
    </div>

    <!-- Form for book request (shown when user clicks "Request Book") -->
    <div v-if="showForm" class="mt-8">
      <h3 class="text-xl font-semibold text-gray-800 mb-4 text-center">
        Fill in the book details and we'll get it for you
      </h3>

      <form @submit.prevent="submitRequest" class="grid grid-cols-1 gap-6">
        <div>
          <label for="book-title" class="block text-gray-700 font-medium mb-2">
            Book Title
          </label>
          <input
            v-model="bookTitle"
            type="text"
            id="book-title"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter the title of the book"
            required
          />
        </div>

        <div>
          <label for="book-author" class="block text-gray-700 font-medium mb-2">
            Author(s)
          </label>
          <input
            v-model="bookAuthor"
            type="text"
            id="book-author"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter the author's name"
            required
          />
        </div>

        <div>
          <label
            for="book-description"
            class="block text-gray-700 font-medium mb-2"
          >
            Description
          </label>
          <textarea
            v-model="bookDescription"
            id="book-description"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Provide a brief description or any additional details"
            rows="4"
          ></textarea>
        </div>

        <div class="text-center">
          <button
            type="submit"
            class="bg-green-600 text-white py-3 px-8 rounded-lg hover:bg-green-500 transition-colors duration-300"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showForm: false,
      bookTitle: "",
      bookAuthor: "",
      bookDescription: "",
    };
  },
  methods: {
    toggleForm() {
      this.showForm = !this.showForm;
    },
    submitRequest() {
      if (this.bookTitle && this.bookAuthor) {
        // Code to handle form submission
        alert(
          `Book Request Submitted:\nTitle: ${this.bookTitle}\nAuthor: ${this.bookAuthor}\nDescription: ${this.bookDescription}`
        );

        // Clear the form
        this.bookTitle = "";
        this.bookAuthor = "";
        this.bookDescription = "";

        // Hide the form
        this.showForm = false;
      } else {
        alert("Please fill in the required fields.");
      }
    },
  },
};
</script>

<style scoped>
.cant-find-book-container {
  margin-top: 5rem;
}

button:focus {
  outline: none;
}
</style>
