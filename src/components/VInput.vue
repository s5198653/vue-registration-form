<script setup lang="ts">
const { type = 'text' } = defineProps<{
  type?: 'text' | 'password' | 'email' | 'number' | 'checkbox' | 'radio' | 'tel';
}>();
const model = defineModel();
</script>

<template>
  <input v-model="model" :type="type" class="v-input" />
</template>

<style scoped>
.v-input {
  height: 45px;
  width: 100%;
  outline: none;
  font-size: 16px;
  border-radius: 5px;
  padding-left: 10px;
  border: 1px solid #ccc;
  border-bottom-width: 2px;
  transition: all 0.3s ease;
}
.v-input::placeholder {
  color: #999;
  font-size: 14px;
  opacity: 1;
}
.v-input[type='checkbox'],
.v-input[type='radio'] {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.v-input:hover {
  border-color: #9b59b6;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
}

.v-input:focus {
  border-color: #71b7e6;
  box-shadow: 0 0 5px rgba(66, 185, 131, 0.5);
}

.v-input:active {
  border-color: #71b7e6;
  box-shadow: none;
}
</style>
