<script setup lang="ts">
const { type = 'button', loading = false } = defineProps<{
  type?: 'button' | 'submit' | 'reset';
  loading?: boolean;
}>();
</script>

<template>
  <button :type class="v-button">
    <span v-if="loading" class="v-button__loader">
      <span name="loader"></span>
    </span>
    <slot v-else />
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

.v-button__loader {
  display: inline-block;
  width: auto;
  height: auto;
  padding: 0;
  border: none;
  animation: none;
}

.v-button__loader::before {
  content: '';
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-top-color: #9b59b6;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  vertical-align: middle;
  margin-right: 5px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
