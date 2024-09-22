<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="loader"></div>
  </div>
</template>

<script>
export default {
  name: "Loader",
};
</script>

<style scoped>
.loader {
  border: 6px solid rgba(243, 243, 243, 0.6); /* Lighter transparent border */
  border-top: 6px solid #3498db; /* Primary color for top border */
  border-radius: 50%;
  width: 60px; /* Reduced size */
  height: 60px;
  animation: spin 1.2s ease-in-out infinite; /* Smoother animation */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
