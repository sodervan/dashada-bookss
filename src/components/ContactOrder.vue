<template>
  <transition name="fade">
    <div
      v-if="showOrderPage"
      class="order-page fixed inset-0 bg-white z-50 flex items-center justify-center overflow-y-auto pt-20"
    >
      <div
        class="order-container w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 relative overflow-hidden transform transition-transform flex flex-col md:flex-row md:space-x-6"
      >
        <!-- Close Button -->
        <button
          @click="closeOrderPage"
          class="close-button absolute top-3 right-3 text-gray-500 hover:text-red-600"
        >
          &times;
        </button>

        <!-- Book Image and Details -->
        <div class="w-full md:w-1/3 flex flex-col items-center md:items-start">
          <img
            :src="book.cover"
            alt="Book Cover"
            class="rounded-lg shadow-lg w-32 h-48 object-cover mb-4"
          />
          <h3 class="text-2xl font-bold text-gray-800">{{ book.title }}</h3>
          <p class="text-gray-600">{{ book.authors.join(", ") }}</p>
          <p class="text-gray-700">{{ book.price }} NGN</p>

          <!-- Quantity Selector -->
          <div class="flex items-center mt-4">
            <button
              @click="decreaseQuantity"
              class="bg-gray-200 text-gray-600 px-3 py-1 rounded-l-lg"
            >
              -
            </button>
            <input
              type="text"
              class="w-12 text-center border border-gray-300"
              v-model="quantity"
              readonly
            />
            <button
              @click="increaseQuantity"
              class="bg-gray-200 text-gray-600 px-3 py-1 rounded-r-lg"
            >
              +
            </button>
          </div>
        </div>

        <!-- Order Form -->
        <div class="w-full md:w-2/3">
          <h2 class="text-3xl font-bold text-indigo-600 mb-4">
            Place Your Order
          </h2>
          <p class="text-gray-600 mb-6">
            Fill in the form below to order your selected book.
          </p>

          <form @submit.prevent="submitOrder" class="space-y-4">
            <div class="flex flex-wrap gap-4">
              <div class="flex-1">
                <label
                  for="name"
                  class="block text-sm font-semibold text-gray-600"
                  >Name</label
                >
                <input
                  v-model="formData.name"
                  type="text"
                  id="name"
                  class="w-full p-3 border rounded-lg focus:ring focus:ring-indigo-300"
                  placeholder="Your name"
                  required
                />
              </div>

              <div class="flex-1">
                <label
                  for="email"
                  class="block text-sm font-semibold text-gray-600"
                  >Email</label
                >
                <input
                  v-model="formData.email"
                  type="email"
                  id="email"
                  class="w-full p-3 border rounded-lg focus:ring focus:ring-indigo-300"
                  placeholder="Your email"
                  required
                />
              </div>
            </div>

            <div class="flex flex-wrap gap-4">
              <div class="flex-1">
                <label
                  for="phone"
                  class="block text-sm font-semibold text-gray-600"
                  >Phone</label
                >
                <input
                  v-model="formData.phone"
                  type="tel"
                  id="phone"
                  class="w-full p-3 border rounded-lg focus:ring focus:ring-indigo-300"
                  placeholder="Your phone number"
                  required
                />
              </div>

              <div class="flex-1">
                <label
                  for="address"
                  class="block text-sm font-semibold text-gray-600"
                  >Address</label
                >
                <input
                  v-model="formData.address"
                  type="text"
                  id="address"
                  class="w-full p-3 border rounded-lg focus:ring focus:ring-indigo-300"
                  placeholder="Your address"
                  required
                />
              </div>
            </div>

            <div>
              <label
                for="message"
                class="block text-sm font-semibold text-gray-600"
                >Additional Order Details</label
              >
              <textarea
                v-model="formData.message"
                id="message"
                rows="3"
                class="w-full p-3 border rounded-lg focus:ring focus:ring-indigo-300"
                placeholder="Your order details"
              ></textarea>
            </div>

            <!-- Call Button -->
            <button
              @click="callToOrder"
              type="button"
              class="bg-blue-600 text-white py-3 w-full rounded-lg hover:bg-blue-500 transition-all duration-300"
            >
              Call to Order
            </button>

            <button
              type="submit"
              class="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-500 transition-all duration-300"
            >
              Submit Order
            </button>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ["book"],
  data() {
    return {
      showOrderPage: true,
      formData: {
        name: "",
        email: "",
        phone: "",
        address: "",
        message: "",
      },
      quantity: 1, // Default quantity
    };
  },
  methods: {
    closeOrderPage() {
      this.showOrderPage = false;
    },
    submitOrder() {
      console.log("Order Submitted:", this.formData, this.book, this.quantity);
      alert("Your order has been submitted!");
      this.formData = {
        name: "",
        email: "",
        phone: "",
        address: "",
        message: "",
      };
      this.quantity = 1; // Reset quantity after order
      this.closeOrderPage();
    },
    callToOrder() {
      window.open("tel:+234XXXXXXXXXX", "_self");
    },
    increaseQuantity() {
      this.quantity++;
    },
    decreaseQuantity() {
      if (this.quantity > 1) this.quantity--;
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.order-page {
  background-color: rgba(0, 0, 0, 0.6);
}

.order-container {
  animation: slideUp 0.6s ease;
  max-height: calc(100vh - 80px); /* Adjust height */
  overflow-y: auto; /* Enable scrolling */
}

@keyframes slideUp {
  0% {
    transform: translateY(50px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.close-button {
  font-size: 24px;
  cursor: pointer;
}
</style>
