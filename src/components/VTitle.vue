<script setup lang="ts">
const { tag = 'h1' } = defineProps<{ tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' }>();
</script>

<template>
  <component :is="tag">
    <slot />
  </component>
</template>

<style scoped></style>
