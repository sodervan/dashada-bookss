<template>
  <div class="flex">
    <!-- Chatbot Widget -->
    <div
      :class="['chat-widget', widgetOpen ? 'w-80 h-96' : 'w-16 h-16']"
      class="fixed right-0 bottom-0 mb-4 mr-4 z-[1000] transition-all duration-300 ease-in-out"
    >
      <div
        class="widget-header bg-indigo-600 text-white p-2 cursor-pointer w-full"
        @click="toggleWidget"
      >
        <span v-if="!widgetOpen">Chat</span>
        <span v-if="widgetOpen">Ask Our Ai About Books</span>
      </div>

      <!-- Chat Window (only shown if widget is open) -->
      <div
        v-if="widgetOpen"
        class="chat-box bg-white shadow-lg rounded-lg p-4 h-full w-full overflow-y-scroll"
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

        <!-- Input field and button taking full width -->
        <div class="flex mt-2 space-x-2">
          <input
            v-model="userInput"
            @keydown.enter="sendMessage"
            class="flex-grow p-2 border rounded-lg w-[60%]"
            placeholder="Ask me anything about books..."
          />
          <button
            @click="sendMessage"
            class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500 transition w-[30%] mr-10"
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
      try {
        const response = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "gpt-3.5-turbo",
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
    messageClass(message) {
      return message.role === "user" ? "self-end" : "self-start";
    },
  },
};
</script>

<style scoped>
.chat-widget {
  transition: all 0.3s ease;
  background-color: #f0f0f0;
  border-radius: 8px;
}

.widget-header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  cursor: pointer;
}

.chat-box {
  max-height: 50vh; /* Increased height */
  width: 350px; /* Increased width */
}

input {
  border-radius: 12px;
}
</style>
