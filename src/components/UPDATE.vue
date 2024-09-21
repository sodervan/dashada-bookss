<template>
  <div class="container mx-auto py-10 px-6">
    <h2 class="text-3xl font-semibold text-secondaryPurple mb-4">
      Upload Book Data
    </h2>

    <!-- Input for Category -->
    <p class="mb-2">Category</p>
    <input
      v-model="category"
      type="text"
      placeholder="Enter category (e.g. Novels)"
      class="w-full p-4 mb-6 border rounded-lg"
    />

    <p class="mb-4">
      Paste the data in the following format:
      <br />
      ISBN, Title, Price, Authors (comma-separated, one per line)
    </p>

    <!-- Textarea for pasting book data -->
    <textarea
      v-model="pastedData"
      placeholder="Paste data here (e.g. 9780439023481, The Hunger Games, 25.99, Suzanne Collins)"
      class="w-full p-4 mb-6 border rounded-lg h-60 resize-none"
    ></textarea>

    <button
      @click="processPastedData"
      class="bg-secondaryPurple text-white font-bold py-2 px-6 rounded hover:bg-secondaryPurpleHover"
    >
      Submit
    </button>

    <div v-if="loading" class="mt-4 text-primaryBlue">
      Processing data, please wait...
    </div>
    <div v-if="errorMessage" class="mt-4 text-red-600">{{ errorMessage }}</div>
    <div v-if="successMessage" class="mt-4 text-green-600">
      {{ successMessage }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      category: "", // Category entered by the client
      pastedData: "", // Where the client pastes the data
      loading: false,
      errorMessage: "",
      successMessage: "",
    };
  },
  methods: {
    async processPastedData() {
      this.loading = true;
      this.errorMessage = "";
      this.successMessage = "";

      try {
        if (!this.category) {
          throw new Error("Category is required.");
        }

        // Split the pasted data into lines
        const rows = this.pastedData.trim().split("\n");
        const books = [];

        // Loop through each line and extract ISBN, title, price, and authors
        for (const row of rows) {
          const [isbn, title, price, authors] = row
            .split(",")
            .map((item) => item.trim());

          if (isbn && title && price && authors) {
            const book = { isbn, title, price, authors: authors.split(",") };

            // Try fetching additional data from Open Library
            const fetchedData = await this.fetchFromOpenLibrary(isbn);

            if (fetchedData) {
              // If fetched, merge fetched data with user-entered data
              book.cover = fetchedData.cover || "";
              book.publish_date = fetchedData.publish_date || "Unknown date";
              book.pageCount = fetchedData.pageCount || 0;
            }

            books.push(book);
          } else {
            throw new Error(
              "Invalid data format. Ensure all rows have ISBN, title, price, and authors."
            );
          }
        }

        // Save books to Firebase
        await this.saveBooksToFirebase(books);
        this.successMessage = "Books processed and saved successfully!";
      } catch (error) {
        this.errorMessage = error.message;
      } finally {
        this.loading = false;
      }
    },

    async fetchFromOpenLibrary(isbn) {
      try {
        const response = await fetch(
          `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`
        );
        const data = await response.json();

        if (data[`ISBN:${isbn}`]) {
          const book = data[`ISBN:${isbn}`];
          return {
            cover: book.cover ? book.cover.medium : "",
            publish_date: book.publish_date || "Unknown date",
            pageCount: book.number_of_pages || 0,
          };
        } else {
          console.error(`No book found for ISBN: ${isbn}`);
          return null; // Book not found on Open Library
        }
      } catch (error) {
        console.error(
          `Error fetching data from Open Library for ISBN ${isbn}:`,
          error
        );
        return null; // Error fetching book
      }
    },

    async saveBooksToFirebase(books) {
      for (const book of books) {
        try {
          // Prepare the book details object
          const bookDetails = {
            title: book.title || "Untitled",
            authors:
              book.authors.length > 0 ? book.authors : ["Unknown author"],
            price: book.price || "Unknown price",
            ISBN: book.isbn,
            cover: book.cover || "",
            publish_date: book.publish_date || "",
            pageCount: book.pageCount || 0,
          };

          // Save to Firebase under the provided category
          await fetch(
            `https://dashada-books-bf412-default-rtdb.firebaseio.com/books/${this.category}/${book.isbn}.json`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(bookDetails),
            }
          );

          console.log(
            `Saved book with ISBN: ${book.isbn} under category: ${this.category}`
          );
        } catch (error) {
          console.error(`Error saving book with ISBN ${book.isbn}:`, error);
        }
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}

.bg-secondaryPurple {
  background-color: #6b5b95;
}

.bg-secondaryPurpleHover {
  background-color: #564d76;
}

.text-secondaryPurple {
  color: #6b5b95;
}

.text-primaryBlue {
  color: #007bff;
}
</style>
