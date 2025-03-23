<script setup lang="ts">
defineProps<{ label: string; error: string; horizontal?: boolean }>();
</script>

<template>
  <label :class="['input-wrapper', { 'input-wrapper--horizontal': horizontal }]">
    <span class="input-wrapper__label">{{ label }}</span>
    <slot />
    <span class="input-wrapper__error">{{ error }}</span>
  </label>
</template>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.input-wrapper--horizontal {
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
}
.input-wrapper--horizontal > * {
  order: 0;
}
.input-wrapper--horizontal > .input-wrapper__label {
  order: 2;
}
.input-wrapper--horizontal > slot {
  order: 1;
}
.input-wrapper--horizontal > .input-wrapper__error {
  order: 3;
}
.input-wrapper__label {
  font-size: 16px;
}
.input-wrapper__error {
  color: red;
}
</style>
