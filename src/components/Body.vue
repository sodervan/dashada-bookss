<template>
  <div
    class="bg-secondaryPurple min-h-screen flex flex-col pt-24 md:flex-row items-center md:py-48 gap-10 md:gap-[40px] px-5 md:px-20"
  >
    <!-- Left side: Text content -->
    <div class="w-full md:w-[45%]">
      <div class="flex flex-col gap-7">
        <div>
          <p class="text-white text-3xl md:text-5xl">
            Welcome to <span class="font-semibold">Dashada</span> online book
            store
          </p>
        </div>
        <div>
          <p class="text-gray-200 text-sm md:text-base">
            Discover a world of books with our curated selection, from timeless
            classics to the latest bestsellers. Whether you’re an avid reader or
            just starting your literary journey, we have something for everyone.
          </p>
        </div>
        <div
          class="flex flex-col md:flex-row items-start md:items-center gap-5"
        >
          <div>
            <div class="flex gap-2 items-center">
              <i class="fi fi-rr-album-collection text-white"></i>
              <p class="text-white text-[20px]">500+</p>
            </div>
            <div>
              <p class="text-gray-400 text-sm">Books Collection</p>
            </div>
          </div>

          <div>
            <div class="flex gap-2 items-center">
              <i class="fi fi-rr-users text-white"></i>
              <p class="text-white text-[20px]">20,000</p>
            </div>
            <div>
              <p class="text-gray-400 text-sm">Trusted Customers</p>
            </div>
          </div>
        </div>
        <div>
          <button
            @click="scrollToSelections"
            class="px-4 py-3 flex bg-[#F5227A] justify-between rounded-lg items-center w-full md:w-[49%]"
          >
            <span class="text-white">Go to collections</span>
            <i class="fi fi-rr-arrow-right text-white"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Right side: Images -->
    <div class="w-full md:w-[55%] overflow-x-auto flex gap-4 relative">
      <div
        v-for="item in popularImages"
        :key="item"
        class="flex-shrink-0 w-[calc(75%_-_1rem)] sm:w-[calc(50%_-_1rem)] md:w-[calc(33.333%_+_1rem)]"
      >
        <img :src="item" alt="" class="w-full h-auto object-cover rounded-lg" />
      </div>
      <div
        class="absolute top-0 right-0 h-full w-40 pointer-events-none"
        style="
          background: linear-gradient(to left, hsl(286, 64%, 21%), transparent);
        "
      ></div>
    </div>
  </div>

  <Features />
  <Trending />
  <ChatBot />
  <Categories ref="categoriesSection" />
  <CantFindBook />
  <!-- <FlashSale /> -->
  <News />
  <Testimonial />
  <Footer />
</template>

<script>
import Features from "./Features.vue";
import Trending from "./Trending.vue";
import Footer from "./Footer.vue";
import Categories from "./Categories.vue";
import Testimonial from "./Testimonial.vue";
import News from "./News.vue";
import CantFindBook from "./CantFindBook.vue";
import ChatBot from "./ChatBot.vue";

export default {
  components: {
    Features,
    Trending,
    Footer,
    Categories,
    CantFindBook,
    Testimonial,
    News,
    ChatBot,
  },
  data() {
    return {
      popularImages: [
        "https://res.cloudinary.com/dmlgns85e/image/upload/v1726066756/Harry_Potter_and_the_Cursed_Child_Special_Rehearsal_Edition_Book_Cover_nxkcx2.jpg",
        "https://res.cloudinary.com/dmlgns85e/image/upload/v1726066756/The-Godfather-Book-Cover-399x600_jxxhlk.jpg",
        "https://res.cloudinary.com/dmlgns85e/image/upload/v1726066756/teaspoonearthandsea_fxi3nh.jpg",
        "https://res.cloudinary.com/dmlgns85e/image/upload/v1726066756/The-Catcher-in-the-Rye-First-Edition-cover-E.-Michael-Mitchell_ce16mc.jpg",
        "https://res.cloudinary.com/dmlgns85e/image/upload/v1726066756/9780593422182_xkil0r.jpg",
        "https://res.cloudinary.com/dmlgns85e/image/upload/v1726066755/images_phmhr5.jpg",
      ],
    };
  },
  methods: {
    scrollToSelections() {
      const target = this.$refs.categoriesSection;
      if (target) {
        target.$el.scrollIntoView({
          behavior: "smooth",
        });
      }
    },
  },
};
</script>
