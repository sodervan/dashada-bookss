<template>
  <div class="flex flex-col gap-8 items-center justify-center my-32">
    <div>
      <p class="text-2xl font-semibold">Trending this week</p>
    </div>
    <div>
      <p class="text-sm w-[50%] text-center mx-auto text-gray-500">
        Have an overview of the trending books this week—dive into the latest
        reads and discover new stories and insights. Whether you're looking for
        inspiration, knowledge, or just a good escape, you might find the
        perfect one that suits you. Explore and let your next great read find
        you!
      </p>
    </div>
    <div class="w-[50%] flex mx-auto">
      <carousel
        :itemsToShow="3.5"
        :wrapAround="true"
        :transition="500"
        autoplay="1000"
        snap-align="center"
      >
        <slide v-for="(slide, i) in slides" :key="i">
          <img :src="slide" alt="" class="carousel__item" />
        </slide>

        <template #addons="{ slideWidth }">
          <navigation />
          <pagination />
        </template>
      </carousel>
    </div>
  </div>
</template>
<script>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

export default {
  name: "App",
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  data() {
    return {
      slides: [
        "https://res.cloudinary.com/dmlgns85e/image/upload/v1726066756/Harry_Potter_and_the_Cursed_Child_Special_Rehearsal_Edition_Book_Cover_nxkcx2.jpg",
        "https://res.cloudinary.com/dmlgns85e/image/upload/v1726066756/The-Godfather-Book-Cover-399x600_jxxhlk.jpg",
        "https://res.cloudinary.com/dmlgns85e/image/upload/v1726066756/teaspoonearthandsea_fxi3nh.jpg",
        "https://res.cloudinary.com/dmlgns85e/image/upload/v1726066756/The-Catcher-in-the-Rye-First-Edition-cover-E.-Michael-Mitchell_ce16mc.jpg",
        "https://res.cloudinary.com/dmlgns85e/image/upload/v1726066756/9780593422182_xkil0r.jpg",
        "https://res.cloudinary.com/dmlgns85e/image/upload/v1726066755/images_phmhr5.jpg",
      ],
    };
  },
};
</script>

<style scoped></style>
