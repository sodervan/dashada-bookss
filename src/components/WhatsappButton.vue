<template>
  <div class="flex gap-2">
    <a
      href="https://wa.me/2348038181988"
      target="_blank"
      rel="noopener noreferrer"
      class="whatsapp-btn"
    >
      Chat with us on WhatsApp
    </a>
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
.whatsapp-btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: #25d366; /* WhatsApp green */
  color: white;
  font-weight: 600;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  position: relative;
}

.whatsapp-btn:hover {
  background-color: #22c05b; /* Slightly darker green on hover */
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15); /* Larger shadow on hover */
  transform: translateY(-3px); /* Small lift effect */
}

.whatsapp-btn::before {
  content: "";
  position: absolute;
  top: -6px;
  right: -6px;
  bottom: -6px;
  left: -6px;
  border-radius: 50px;
  background: rgba(37, 211, 102, 0.2); /* Pulsing effect */
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.whatsapp-btn:hover::before {
  opacity: 1;
  transform: scale(1.1); /* Subtle pulse animation on hover */
}
</style>
