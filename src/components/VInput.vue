<script setup lang="ts">
const { type = 'text' } = defineProps<{
  type?: 'text' | 'password' | 'email' | 'number' | 'checkbox' | 'radio' | 'tel';
}>();
const model = defineModel();
</script>

<template>
  <input v-model="model" :type />
</template>

<style scoped></style>
