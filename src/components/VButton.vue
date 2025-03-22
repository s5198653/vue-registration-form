<script setup lang="ts">
const { type = 'button' } = defineProps<{ type?: 'button' | 'submit' | 'reset' }>();
</script>

<template>
  <button :type>
    <slot />
  </button>
</template>

<style scoped></style>
