<script setup lang="ts">
import VInput from './VInput.vue';

const { options } = defineProps<{
  options: string[];
  name: string;
}>();
const model = defineModel();
</script>
<template>
  <fieldset>
    <label v-for="option in options" :key="option">
      <VInput
        :name
        :value="option"
        type="radio"
        @input="model = option"
        :checked="model === option"
      />
      <span>{{ option }}</span>
    </label>
  </fieldset>
</template>

<style scoped></style>
