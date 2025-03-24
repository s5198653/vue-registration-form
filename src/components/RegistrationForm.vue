<script setup lang="ts">
import { computed, reactive, watch, ref } from 'vue';
import VTitle from './VTitle.vue';
import InputWrapper from './InputWrapper.vue';
import VInput from './VInput.vue';
import VButton from './VButton.vue';
import VRadioGroup from './VRadioGroup.vue';
import { sendRegistrationForm } from '@/api/fakeBackend';
import router from '@/router';

enum Gender {
  Male = 'male',
  Female = 'female',
  Reptilian = 'reptilian',
  PreferNotToSay = 'prefer not to say',
}

type Validator = (fieldName: keyof FormFields, fieldForMatching?: keyof FormFields) => boolean;

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

type BackendError = {
  [k in keyof FormFields | 'nonFieldError']?: string;
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

const isLoading = ref(false);
const backendNonFieldError = ref('');
const showErrorAnimation = ref(false);

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
  const fieldValue = formFields[fieldName].value;
  if (!fieldValue) return true;
  const regex = /^\+?[1-9]\d{1,14}$/;
  const isValid = regex.test(String(fieldValue));
  formFields[fieldName].error = isValid ? '' : 'Invalid phone number format. Use +?[1-9]\d{1,14}.';
  return isValid;
}

function isValidEmail(fieldName: keyof FormFields): boolean {
  const fieldValue = formFields[fieldName].value;
  if (!fieldValue) return true;
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValid = regex.test(String(fieldValue));
  formFields[fieldName].error = isValid
    ? ''
    : 'Invalid email format. Must match pattern: username@domain.com."';
  return isValid;
}

function isValidPassword(fieldName: keyof FormFields): boolean {
  const fieldValue = formFields[fieldName].value;
  if (!fieldValue) return true;
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/;
  const isValid = regex.test(String(fieldValue));
  formFields[fieldName].error = isValid
    ? ''
    : 'Password: 8+ chars, uppercase, lowercase, number, special.';
  return isValid;
}

function isPasswordConfirm(
  fieldName: keyof FormFields,
  fieldForMatching?: keyof FormFields,
): boolean {
  if (!fieldForMatching) return false;
  const isValid = formFields[fieldName].value === formFields[fieldForMatching].value;
  formFields[fieldName].error = isValid ? '' : 'Passwords do not match.';
  return isValid;
}

function validate(fieldName: keyof FormFields) {
  formFields[fieldName].error = '';
  const validators = formFields[fieldName].validators;
  validators.forEach((validator) => {
    validator(fieldName, fieldName === 'confirmPassword' ? 'password' : undefined);
  });
}

function validateOnSubmit() {
  Object.entries(formFields).forEach(([fieldName]) => {
    validate(fieldName as keyof FormFields);
  });
}

function resetForm() {
  Object.entries(formFields).forEach(([fieldName]) => {
    if (fieldName === 'isConfirmTerms' || fieldName === 'receiveNews') {
      formFields[fieldName as keyof FormFields].value = false;
    } else if (fieldName === 'gender') {
      formFields[fieldName as keyof FormFields].value = Gender.PreferNotToSay;
    } else {
      formFields[fieldName as keyof FormFields].value = '';
    }
  });
}

function handleBackendErrors(error: BackendError) {
  showErrorAnimation.value = true;
  if (error.nonFieldError) {
    backendNonFieldError.value = error.nonFieldError;
    return;
  }
  const errorFieldNames = Object.keys(error) as (keyof FormFields)[];
  Object.keys(formFields).forEach((fieldName) => {
    if (errorFieldNames.includes(fieldName as keyof FormFields)) {
      const currentErrorFieldName = errorFieldNames.find(
        (name: keyof FormFields) => name === fieldName,
      );
      formFields[fieldName as keyof FormFields].error = currentErrorFieldName
        ? (error[currentErrorFieldName] as string)
        : '';
    }
  });
}

function resetBackendErrors() {
  backendNonFieldError.value = '';
  showErrorAnimation.value = false;
}

async function onSubmit() {
  resetBackendErrors();
  validateOnSubmit();
  if (!isFormValid.value) return;

  try {
    isLoading.value = true;
    await sendRegistrationForm(preparedFormFields.value);
    resetForm();
    router.push({ name: 'greeting' });
  } catch (error) {
    handleBackendErrors(error as BackendError);
  } finally {
    isLoading.value = false;
  }
}

watch(
  () => formFields.password.value,
  () => validate('confirmPassword'),
);
</script>

<template>
  <form
    :class="[
      'registration-form',
      {
        ['registration-form--error']: showErrorAnimation,
      },
    ]"
    @submit.prevent="onSubmit"
  >
    <VTitle tag="h2" class="registration-form__title">Please register</VTitle>
    <div class="registration-form__text-fields">
      <InputWrapper label="First name" :error="formFields.firstName.error">
        <VInput
          v-model="formFields.firstName.value"
          placeholder="Enter your first name"
          @input="validate('firstName')"
        />
      </InputWrapper>
      <InputWrapper label="Last name" :error="formFields.lastName.error">
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
    <div class="registration-form__check-fields">
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
          @change="validate('receiveNews')"
        />
      </InputWrapper>
      <InputWrapper label="Confirm terms" :error="formFields.isConfirmTerms.error" horizontal>
        <VInput
          v-model="formFields.isConfirmTerms.value"
          type="checkbox"
          @change="validate('isConfirmTerms')"
        />
      </InputWrapper>
    </div>
    <VButton type="submit" :disabled="!isFormValid || isLoading" :loading="isLoading"
      >Register</VButton
    >
    <span v-if="backendNonFieldError" class="registration-form__error"
      >{{ backendNonFieldError }} Try register again.</span
    >
  </form>
</template>
`
<style scoped>
.registration-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 700px;
  width: 100%;

  position: relative;
  background-color: #fff;
  padding: 30px 25px;
  border-radius: 5px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
}

.registration-form--error {
  border: 1px solid red;
  box-shadow: inset 0 0 5px red;
  animation: shake 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) both;
}

@keyframes shake {
  10%,
  90% {
    transform: translateX(-0.5px);
  }
  20%,
  80% {
    transform: translateX(1px);
  }
  30%,
  50%,
  70% {
    transform: translateX(-2px);
  }
  40%,
  60% {
    transform: translateX(2px);
  }
}

.registration-form__title {
  font-size: 28px;
}

.registration-form__text-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.registration-form__check-fields {
  display: flex;
  flex-direction: column;
}
.registration-form__error {
  position: absolute;
  bottom: 10px;
  font-size: 12px;
  color: red;
}
</style>
