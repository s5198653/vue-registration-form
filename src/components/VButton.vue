<script setup lang="ts">
const { type = 'button' } = defineProps<{ type?: 'button' | 'submit' | 'reset' }>();
</script>

<template>
  <button :type class="v-button">
    <slot />
  </button>
</template>

<style scoped>
.v-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background: linear-gradient(135deg, #71b7e6, #9b59b6);
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.v-button:hover {
  opacity: 0.7;
}

.v-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 87, 179, 0.5);
}

.v-button:active {
  opacity: 0.7;
}

.v-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
  background: linear-gradient(135deg, #ccc, #ddd);
  color: #666;
}
</style>
