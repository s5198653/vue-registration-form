<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import VTitle from '@/components/VTitle.vue';

const route = useRoute();

onMounted(() => {
  document.title = route.meta.title as string;
});
</script>

<template>
  <main>
    <VTitle
      tag="h1"
      class="registration-form__title"
      :style="{ color: 'white', fontWeight: 'bold' }"
      >Hello!</VTitle
    >
  </main>
</template>
