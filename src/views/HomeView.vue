<script setup lang="ts">
import RegistrationForm from '@/components/RegistrationForm.vue';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';

const route = useRoute();

onMounted(() => {
  document.title = route.meta.title as string;
});
</script>

<template>
  <main>
    <RegistrationForm />
  </main>
</template>
