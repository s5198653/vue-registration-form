<script setup lang="ts">
import VInput from './VInput.vue';

const { options } = defineProps<{
  options: string[];
  name: string;
}>();
const model = defineModel();
</script>
<template>
  <fieldset class="v-radio-group">
    <label v-for="option in options" :key="option" class="v-radio-group__item">
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

<style scoped>
.v-radio-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
  align-items: start;
  border: none;
  padding: 0;
}

.v-radio-group__item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
</style>
