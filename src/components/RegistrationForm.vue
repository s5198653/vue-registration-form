<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import VTitle from './VTitle.vue';
import InputWrapper from './InputWrapper.vue';
import VInput from './VInput.vue';
import VButton from './VButton.vue';
import VRadioGroup from './VRadioGroup.vue';

enum Gender {
  Male = 'male',
  Female = 'female',
  Reptilian = 'reptilian',
  PreferNotToSay = 'prefer not to say',
}

type Validator = (fieldName: keyof FormFields, confirmFieldName?: keyof FormFields) => boolean;

type FormField<T extends string | boolean | Gender = string> = {
  value: T;
  error: string;
  validators: Validator[];
};

type FormFields = {
  firstName: FormField;
  lastName: FormField;
  phone: FormField;
  email: FormField;
  password: FormField;
  confirmPassword: FormField;
  gender: FormField<Gender>;
  receiveNews: FormField<boolean>;
  isConfirmTerms: FormField<boolean>;
};

type PreparedFormFields = {
  [K in keyof FormFields]: FormFields[K]['value'];
};

const formFields = reactive<FormFields>({
  firstName: { value: '', error: '', validators: [isRequired] },
  lastName: { value: '', error: '', validators: [isRequired] },
  phone: { value: '', error: '', validators: [isRequired, isValidPhoneNumber] },
  email: { value: '', error: '', validators: [isRequired, isValidEmail] },
  password: { value: '', error: '', validators: [isRequired, isValidPassword] },
  confirmPassword: { value: '', error: '', validators: [isRequired, isPasswordConfirm] },
  gender: { value: Gender.PreferNotToSay, error: '', validators: [] },
  receiveNews: { value: false, error: '', validators: [] },
  isConfirmTerms: { value: false, error: '', validators: [isRequired] },
});

const isFormValid = computed(() => {
  return Object.values(formFields).every((field) => !field.error);
});

const preparedFormFields = computed<PreparedFormFields>(() => {
  return Object.fromEntries(
    Object.entries(formFields).map(([key, value]) => [key, value.value]),
  ) as PreparedFormFields;
});

function isRequired(fieldName: keyof FormFields): boolean {
  const isValid = Boolean(formFields[fieldName].value);
  formFields[fieldName].error = isValid ? '' : 'Field is required';
  return isValid;
}
function isValidPhoneNumber(fieldName: keyof FormFields): boolean {
  const regex = /^\+?[1-9]\d{1,14}$/;
  const isValid = regex.test(String(formFields[fieldName].value));
  formFields[fieldName].error = isValid ? '' : 'Invalid phone number';
  return isValid;
}

function isValidEmail(fieldName: keyof FormFields): boolean {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValid = regex.test(String(formFields[fieldName].value));
  formFields[fieldName].error = isValid ? '' : 'Invalid email';
  return isValid;
}

function isValidPassword(fieldName: keyof FormFields): boolean {
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/;
  const isValid = regex.test(String(formFields[fieldName].value));
  formFields[fieldName].error = isValid ? '' : 'Invalid password';
  return isValid;
}

function isPasswordConfirm(
  fieldName: keyof FormFields,
  confirmFieldName?: keyof FormFields,
): boolean {
  if (!confirmFieldName) return false;
  const isValid = formFields[fieldName].value === formFields[confirmFieldName].value;
  formFields[fieldName].error = isValid ? '' : 'Passwords do not match.';
  return isValid;
}

function validate(fieldName: keyof FormFields) {
  const validators = formFields[fieldName].validators;
  validators.forEach((validator) => {
    console.log('validator :>> ', validator);
    validator(fieldName, fieldName === 'confirmPassword' ? 'password' : undefined);
  });
}

function onSubmit() {
  Object.entries(formFields).forEach(([fieldName]) => {
    validate(fieldName as keyof FormFields);
  });
  console.log('preparedFormFields :>> ', preparedFormFields.value);
}

watch(
  () => formFields.password.value,
  () => validate('confirmPassword'),
);
</script>

<template>
  <form class="registration-form" @submit.prevent="onSubmit">
    <VTitle tag="h2" class="registration-form__title">Please register</VTitle>
    <div class="registration-form__fields">
      <InputWrapper label="First name" :error="formFields.firstName.error">
        <VInput
          v-model="formFields.firstName.value"
          placeholder="Enter your first name"
          @input="validate('firstName')"
        />
      </InputWrapper>
      <InputWrapper label="Last Name" :error="formFields.lastName.error">
        <VInput
          v-model="formFields.lastName.value"
          placeholder="Enter your last name"
          @input="validate('lastName')"
        />
      </InputWrapper>
      <InputWrapper label="Phone" :error="formFields.phone.error">
        <VInput
          v-model="formFields.phone.value"
          type="tel"
          placeholder="Enter your phone number"
          @input="validate('phone')"
        />
      </InputWrapper>
      <InputWrapper label="Email" :error="formFields.email.error">
        <VInput
          v-model="formFields.email.value"
          type="email"
          placeholder="Enter your email"
          @input="validate('email')"
        />
      </InputWrapper>
      <InputWrapper label="Password" :error="formFields.password.error">
        <VInput
          v-model="formFields.password.value"
          type="password"
          placeholder="Enter your password"
          @input="validate('password')"
        />
      </InputWrapper>
      <InputWrapper label="Confirm password" :error="formFields.confirmPassword.error">
        <VInput
          v-model="formFields.confirmPassword.value"
          type="password"
          placeholder="Confirm your password"
          @input="validate('confirmPassword')"
        />
      </InputWrapper>
    </div>
    <InputWrapper label="Choice gender" :error="formFields.gender.error">
      <VRadioGroup
        name="gender"
        :options="Object.values(Gender)"
        v-model="formFields.gender.value"
      />
    </InputWrapper>
    <InputWrapper label="Receive news" :error="formFields.receiveNews.error" horizontal>
      <VInput
        v-model="formFields.receiveNews.value"
        type="checkbox"
        @input="validate('receiveNews')"
      />
    </InputWrapper>
    <InputWrapper label="Confirm terms" :error="formFields.isConfirmTerms.error" horizontal>
      <VInput
        v-model="formFields.isConfirmTerms.value"
        type="checkbox"
        @input="validate('isConfirmTerms')"
      />
    </InputWrapper>
    <VButton type="submit" :disabled="!isFormValid">Register</VButton>
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

.registration-form__title {
  font-size: 28px;
}

.registration-form__fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
</style>
