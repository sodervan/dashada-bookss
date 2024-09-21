<template>
  <div class="w-full h-screen flex items-center justify-center">
    <!-- Testimonial Wrapper -->
    <div class="flex w-4/5 h-3/4 bg-white shadow-lg rounded-lg overflow-hidden">
      <!-- Left Side (Intro with Stacked Circles) -->
      <div
        class="w-1/2 p-8 flex flex-col justify-center bg-gradient-to-br from-purple-400 to-blue-600"
      >
        <h2 class="text-4xl font-bold text-white mb-6">
          What Our Customers Say
        </h2>
        <p class="text-white text-lg mb-10">
          Our customers love us. Read their testimonials below to learn why we
          are trusted by thousands of happy users.
        </p>
        <!-- Stacked Circles -->
        <div class="flex -space-x-4">
          <div
            v-for="n in 5"
            :key="n"
            class="w-12 h-12 bg-white text-gray-800 rounded-full border-4 border-gray-200 flex items-center justify-center text-lg font-bold"
          >
            U{{ n }}
          </div>
        </div>
      </div>

      <!-- Right Side (Testimonial Cards) -->
      <div class="w-1/2 relative p-8 flex flex-col items-center justify-center">
        <div class="relative w-full h-64">
          <!-- Stacked Cards -->
          <div
            v-for="(testimonial, index) in testimonials"
            :key="index"
            :class="{
              'opacity-0 scale-90 z-0': index !== currentTestimonial,
              'opacity-100 scale-100 z-10': index === currentTestimonial,
            }"
            class="absolute inset-0 bg-white p-6 shadow-lg rounded-lg transition-all duration-500 ease-in-out"
          >
            <p class="text-gray-600 mb-4">{{ testimonial.message }}</p>
            <div class="mt-4 flex items-center space-x-4">
              <img
                :src="testimonial.image"
                alt="profile"
                class="w-12 h-12 rounded-full"
              />
              <div>
                <p class="font-bold">{{ testimonial.name }}</p>
                <p class="text-sm text-gray-500">{{ testimonial.position }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Buttons -->
        <div class="mt-6 flex space-x-4">
          <button
            @click="prevTestimonial"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none"
          >
            Prev
          </button>
          <button
            @click="nextTestimonial"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTestimonial: 0,
      testimonials: [
        {
          message:
            "This product has changed my life for the better. I'm so glad I found it!",
          name: "Jane Doe",
          position: "Marketing Manager",
          image: "https://randomuser.me/api/portraits/women/1.jpg",
        },
        {
          message:
            "Excellent customer service, and the features are unbeatable.",
          name: "John Smith",
          position: "CEO at TechCorp",
          image: "https://randomuser.me/api/portraits/men/2.jpg",
        },
        {
          message: "Highly recommend! Great value for the price.",
          name: "Alice Johnson",
          position: "Freelance Designer",
          image: "https://randomuser.me/api/portraits/women/3.jpg",
        },
      ],
    };
  },
  methods: {
    prevTestimonial() {
      if (this.currentTestimonial > 0) {
        this.currentTestimonial--;
      } else {
        this.currentTestimonial = this.testimonials.length - 1;
      }
    },
    nextTestimonial() {
      if (this.currentTestimonial < this.testimonials.length - 1) {
        this.currentTestimonial++;
      } else {
        this.currentTestimonial = 0;
      }
    },
  },
};
</script>

<style scoped>
/* Custom styles for testimonial stacking and transitions */
.relative > div {
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
}

button:focus {
  outline: none;
}
</style>
