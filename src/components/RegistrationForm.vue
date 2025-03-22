<script setup lang="ts">
import { reactive } from 'vue';
import VTitle from './VTitle.vue';

type FormFields = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: 'male' | 'female' | 'reptilian' | 'prefer not to say';
  isConfirmTerms: boolean;
};

const formFields = reactive<FormFields>({
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
  gender: 'prefer not to say',
  isConfirmTerms: false,
});
</script>

<template>
  <form>
    <VTitle tag="h2">Registration Form</VTitle>
  </form>
</template>

<style scoped></style>
