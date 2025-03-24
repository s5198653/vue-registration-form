<script setup lang="ts">
const { tag = 'h1' } = defineProps<{ tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' }>();
</script>

<template>
  <component :is="tag" class="v-title">
    <slot />
  </component>
</template>

<style scoped>
.v-title {
  font-weight: bold;
  color: #333;
}

h1 {
  font-size: 36px;
}

h2 {
  font-size: 28px;
}

h3 {
  font-size: 24px;
}

h4 {
  font-size: 20px;
}

h5 {
  font-size: 18px;
}

h6 {
  font-size: 16px;
}
</style>
