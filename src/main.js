// main.js
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import "./style.css";
import App from "./App.vue";
import Body from "./components/body.vue";
import Countdown from "vue3-flip-countdown";
import UPDATE from "./components/UPDATE.vue";
import { createStore } from "vuex";
import BookDetailsPage from "./components/BookDetailsPage.vue";

// List of 20 ISBNs to fetch book details
const ISBNs = [
  "9780143128540", // The Goldfinch
  // The Alchemist
];

// Vuex Store
const store = createStore({
  state() {
    return {
      toggleMenu: false,
      books: [],
    };
  },
  mutations: {
    toggleTheMenu(state) {
      state.toggleMenu = !state.toggleMenu;
    },
    SET_BOOKS(state, books) {
      state.books = books;
    },
    CLEAR_BOOKS(state) {
      state.books = [];
    },
  },
  actions: {
    async fetchBooksByISBNs(context) {
      context.commit("CLEAR_BOOKS"); // Clear previous book data

      // List of ISBNs categorized
      const categorizedISBNs = {
        Academic: [
          "9780143128540", // Example Academic ISBN
          // Add more ISBNs for Academic category
        ],
        Novels: [
          "9780439023481", // The Hunger Games
          "9780743273565", // The Great Gatsby
        ],
        // Add more categories as needed
      };

      const allFetchedBooks = []; // Array to store all fetched books across categories

      for (const category in categorizedISBNs) {
        const ISBNs = categorizedISBNs[category];
        const fetchedBooks = []; // Reset fetchedBooks for each category

        for (const isbn of ISBNs) {
          try {
            // Fetch book details from Open Library API
            const response = await fetch(
              `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`
            );

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data[`ISBN:${isbn}`]) {
              const book = data[`ISBN:${isbn}`];

              const bookDetails = {
                title: book.title || "Untitled",
                authors: book.authors
                  ? book.authors.map((author) => author.name)
                  : ["Unknown author"],
                publishers: book.publishers
                  ? book.publishers.map((pub) => pub.name)
                  : ["Unknown publisher"],
                publish_date: book.publish_date || "Unknown date",
                cover: book.cover ? book.cover.medium : "",
                pageCount: book.number_of_pages || 0,
                subjects: book.subjects
                  ? book.subjects.map((subj) => subj.name)
                  : ["Uncategorized"],
                description: book.description
                  ? typeof book.description === "string"
                    ? book.description
                    : book.description.value
                  : "No description available.",
                category, // Add category info
                ISBN: isbn, // Include ISBN for reference
              };

              // Check if the book already exists in Firebase
              const checkResponse = await fetch(
                `https://dashada-books-bf412-default-rtdb.firebaseio.com/books/${category}/${isbn}.json`
              );
              const bookInFirebase = await checkResponse.json();

              if (bookInFirebase) {
                // Book exists, so update it
                await fetch(
                  `https://dashada-books-bf412-default-rtdb.firebaseio.com/books/${category}/${isbn}.json`,
                  {
                    method: "PATCH", // Use PATCH to update existing fields
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(bookDetails),
                  }
                );
                console.log(`Updated book with ISBN: ${isbn} in Firebase.`);
              } else {
                // Book doesn't exist, so add it
                await fetch(
                  `https://dashada-books-bf412-default-rtdb.firebaseio.com/books/${category}/${isbn}.json`,
                  {
                    method: "PUT", // Use PUT to add new book
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(bookDetails),
                  }
                );
                console.log(`Added new book with ISBN: ${isbn} to Firebase.`);
              }

              fetchedBooks.push(bookDetails); // Add book to the fetchedBooks array
            } else {
              console.error(`No book found for ISBN: ${isbn}`);
            }
          } catch (error) {
            console.error(`Error fetching book with ISBN ${isbn}:`, error);
          }
        }

        allFetchedBooks.push(...fetchedBooks); // Add category books to the overall list
      }

      context.commit("SET_BOOKS", allFetchedBooks); // Commit all fetched books across categories to Vuex state
      console.log(context.state.books); // Log the state for debugging
    },
  },

  getters: {
    getBooks: (state) => state.books,
  },
});

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: Body },
    { path: "/update", component: UPDATE },
    {
      path: "/book/:isbn",
      name: "BookDetailsPage",
      component: BookDetailsPage,
      props: true,
    },
  ],
});

const app = createApp(App);
// const { createVuetify } = Vuetify;
// const vuetify = createVuetify();
app.use(store);
app.use(router);
app.use(Countdown);
// app.use(vuetify);
app.mount("#app");
