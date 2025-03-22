<script setup lang="ts">
import { computed, reactive } from 'vue';
import VTitle from './VTitle.vue';
import InputWrapper from './InputWrapper.vue';
import VInput from './VInput.vue';
import VButton from './VButton.vue';

type Gender = 'male' | 'female' | 'reptilian' | 'prefer not to say';

type FormField<T extends string | boolean | Gender = string> = {
  value: T;
  error: string;
  required: boolean;
};
type FormFields = {
  firstName: FormField;
  lastName: FormField;
  phone: FormField;
  email: FormField;
  password: FormField;
  confirmPassword: FormField;
  gender: FormField<Gender>;
  isConfirmTerms: FormField<boolean>;
};

type PreparedFormFields = {
  [K in keyof FormFields]: FormFields[K]['value'];
};

const formFields = reactive<FormFields>({
  firstName: { value: '', error: '', required: true },
  lastName: { value: '', error: '', required: true },
  phone: { value: '', error: '', required: true },
  email: { value: '', error: '', required: true },
  password: { value: '', error: '', required: true },
  confirmPassword: { value: '', error: '', required: true },
  gender: { value: 'prefer not to say', error: '', required: true },
  isConfirmTerms: { value: false, error: '', required: true },
});

const preparedFormFields = computed<PreparedFormFields>(() => {
  return Object.fromEntries(
    Object.entries(formFields).map(([key, value]) => [key, value.value]),
  ) as PreparedFormFields;
});

function onSubmit() {
  console.log('preparedFormFields :>> ', preparedFormFields.value);
}
</script>

<template>
  <form class="registration-form" @submit.prevent="onSubmit">
    <VTitle tag="h2">Please register</VTitle>
    <div class="form-fields">
      <InputWrapper label="First Name" :error="formFields.firstName.error">
        <VInput
          v-model="formFields.firstName.value"
          label="First Name"
          placeholder="Enter your first name"
        />
      </InputWrapper>
      <InputWrapper label="Last Name" :error="formFields.lastName.error">
        <VInput
          v-model="formFields.lastName.value"
          label="Last Name"
          placeholder="Enter your last name"
        />
      </InputWrapper>
      <InputWrapper label="Phone" :error="formFields.phone.error">
        <VInput
          v-model="formFields.phone.value"
          label="Phone"
          type="tel"
          placeholder="Enter your phone number"
        />
      </InputWrapper>
      <InputWrapper label="Email" :error="formFields.email.error">
        <VInput
          v-model="formFields.email.value"
          label="Email"
          type="email"
          placeholder="Enter your email"
        />
      </InputWrapper>
      <InputWrapper label="Password" :error="formFields.password.error">
        <VInput
          v-model="formFields.password.value"
          label="Password"
          type="password"
          placeholder="Enter your password"
        />
      </InputWrapper>
      <InputWrapper label="Confirm password" :error="formFields.confirmPassword.error">
        <VInput
          v-model="formFields.confirmPassword.value"
          label="Confirm password"
          type="password"
          placeholder="Confirm your password"
        />
      </InputWrapper>
      <InputWrapper label="Confirm terms" :error="formFields.isConfirmTerms.error">
        <VInput v-model="formFields.isConfirmTerms.value" label="Confirm terms" type="checkbox" />
      </InputWrapper>
    </div>
    <VButton type="submit">Register</VButton>
  </form>
</template>

<style scoped>
.registration-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 700px;
  width: 100%;
  background-color: #fff;
  padding: 25px 30px;
  border-radius: 5px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
}
.form-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 30px;
}
</style>
