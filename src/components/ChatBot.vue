<template>
  <div class="flex h-screen">
    <!-- Chatbot Widget -->
    <div
      :class="['chat-widget', widgetOpen ? 'w-80' : 'w-16']"
      class="fixed right-0 bottom-0 mb-4 mr-4"
    >
      <div
        class="widget-header bg-indigo-600 text-white p-2 cursor-pointer"
        @click="toggleWidget"
      >
        <span v-if="!widgetOpen">Chat</span>
        <span v-if="widgetOpen">Ask AI About Books</span>
      </div>

      <!-- Chat Window (only shown if widget is open) -->
      <div
        v-if="widgetOpen"
        class="chat-box bg-white shadow-lg rounded-lg p-4 h-5/6 overflow-y-scroll"
      >
        <div
          v-for="message in messages"
          :key="message.id"
          :class="messageClass(message)"
        >
          <div
            class="rounded-lg p-2 mb-4"
            :class="
              message.role === 'user'
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-300 text-gray-800'
            "
          >
            {{ message.content }}
          </div>
        </div>
        <div class="flex mt-2">
          <input
            v-model="userInput"
            @keydown.enter="sendMessage"
            class="flex-grow p-2 border rounded-lg mr-2"
            placeholder="Ask me anything about books..."
          />
          <button
            @click="sendMessage"
            class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500 transition"
          >
            Send
          </button>
        </div>
      </div>

      <!-- Loading Indicator -->
      <div v-if="loading" class="text-gray-500 text-center mt-4">
        Thinking...
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="main-content flex-grow bg-gray-100 p-6">
      <h1 class="text-3xl font-bold">Featured Books</h1>
      <p class="mt-4">
        Discover new books, exclusive offers, and popular categories. Browse
        through our collection, or ask the AI chatbot for more information about
        any book!
      </p>

      <!-- FeaturedBooks Component -->
      <FeaturedBooks />
    </div>
  </div>
</template>

<script>
import FeaturedBooks from "./FeaturedBooks.vue";

export default {
  components: {
    FeaturedBooks,
  },
  data() {
    return {
      userInput: "",
      messages: [],
      loading: false,
      widgetOpen: false,
    };
  },
  methods: {
    toggleWidget() {
      this.widgetOpen = !this.widgetOpen; // Toggle widget open/closed state
    },
    async sendMessage() {
      if (this.userInput.trim() === "") return;

      // Add user message to chat
      const userMessage = {
        id: Date.now(),
        role: "user",
        content: this.userInput,
      };
      this.messages.push(userMessage);

      // Clear input
      this.userInput = "";
      this.loading = true;


      try {
        const aiResponse = await this.getAIResponse(userMessage.content);
        this.messages.push({ id: Date.now(), role: "ai", content: aiResponse });
      } catch (error) {
        this.messages.push({
          id: Date.now(),
          role: "ai",
          content: "Oops! Something went wrong.",
        });
        console.error(error);
      }

      this.loading = false;
    },
    async getAIResponse(message) {
      // const apiKey = "your-api-key-here"; // Add your actual key
      try {
        const response = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // Authorization: Bearer ${apiKey},
            },
            body: JSON.stringify({
              model: "gpt-3.5-turbo", // Use "gpt-4" if needed
              messages: [
                {
                  role: "system",
                  content: "You are an expert in books and literature.",
                },
                { role: "user", content: message },
              ],
              max_tokens: 150,
              temperature: 0.7,
            }),
          }
        );

        const data = await response.json();
        if (response.ok && data.choices && data.choices.length > 0) {
          return data.choices[0].message.content.trim();
        } else {
          return "I'm sorry, I couldn't retrieve the answer right now.";
        }
      } catch (error) {
        return "Oops! Something went wrong while contacting the AI service.";
      }
    },
    //   async fetchBooks() {
    //     try {
    //       const response = await fetch(
    //           "https://dashada-books-bf412-default-rtdb.firebaseio.com/trending.json"
    //       );
    //       const data = await response.json();
    //       this.books = Object.values(data || {});
    //     } catch (error) {
    //       console.error("Error fetching books:", error);
    //     }
    //   },
    messageClass(message) {
      return message.role === "user" ? "self-end" : "self-start";
    },
  },
};
</script>

<style scoped>
.chat-widget {
  transition: width 0.3s ease;
  background-color: #f0f0f0;
}

.widget-header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  cursor: pointer;
}

.chat-box {
  max-height: 400px;
}

input {
  border-radius: 12px;
}
</style>
