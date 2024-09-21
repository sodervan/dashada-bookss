<template>
  <div
    class="w-full h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 to-teal-300"
  >
    <div
      class="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden p-8"
    >
      <h2 class="text-3xl font-bold text-gray-800 mb-4">
        Subscribe to Our Newsletter
      </h2>
      <p class="text-gray-600 mb-6">
        Stay updated with the latest news, articles, and offers from us. Enter
        your email below to join our mailing list.
      </p>
      <form @submit.prevent="handleSubmit" class="flex flex-col space-y-4">
        <div>
          <label
            for="email"
            class="block text-gray-700 text-sm font-medium mb-2"
            >Email Address</label
          >
          <input
            v-model="email"
            type="email"
            id="email"
            required
            placeholder="you@example.com"
            class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p v-if="emailError" class="text-red-500 text-sm mt-2">
            {{ emailError }}
          </p>
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg focus:outline-none"
        >
          Subscribe
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      emailError: "",
    };
  },
  methods: {
    handleSubmit() {
      if (!this.validateEmail(this.email)) {
        this.emailError = "Please enter a valid email address.";
        return;
      }
      this.emailError = "";
      // Handle the form submission (e.g., send email to backend)
      console.log("Email submitted:", this.email);
      // Reset the form
      this.email = "";
    },
    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },
  },
};
</script>

<style scoped>
/* Custom styles for newsletter subscription */
button:focus {
  outline: none;
}
</style>
