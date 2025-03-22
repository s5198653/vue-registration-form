<script setup lang="ts">
defineProps<{ label: string; error: string }>();
</script>

<template>
  <label class="input-wrapper">
    <span>{{ label }}</span>
    <slot />
    <span>{{ error }}</span>
  </label>
</template>

<style scoped>
.input-wrapper {
  display: grid;
  grid-template-columns: 1fr;
}
</style>
