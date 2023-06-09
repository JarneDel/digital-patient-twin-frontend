<script setup lang="ts">
import { ref } from 'vue'
import fitbit from '../svg/fitbit.vue'

const dummydata = [
  {
    id: '#101',
  },
  {
    id: '#402',
  },
  {
    id: '#888',
  },
]

const firstName = ref('')
const firstNameError = ref(false)
const firstNameErrorMessage = ref('')

const email = ref('')
const emailError = ref(false)
const emailErrorMessage = ref('')

const selectedDate = ref('')
const birthdateError = ref(false)
const birthdateErrorMessage = ref('')

const validateForm = () => {
  firstNameError.value = false
  firstNameErrorMessage.value = ''
  emailError.value = false
  emailErrorMessage.value = ''
  birthdateError.value = false
  birthdateErrorMessage.value = ''

  if (!firstName.value) {
    firstNameError.value = true
    firstNameErrorMessage.value = 'Vul uw voornaam in.'
  } else if (firstName.value.length < 2) {
    firstNameError.value = true
    firstNameErrorMessage.value =
      'Uw voornaam moet minstens 2 karakters bevatten.'
  }

  if (!email.value) {
    emailError.value = true
    emailErrorMessage.value = 'voer uw email in.'
  } else if (!validateEmail(email.value)) {
    emailError.value = true
    emailErrorMessage.value =
      'Voer een geldig email adres in. het moet een @ en een domein (bv: hotmail) bevatten.'
  }

  if (!selectedDate.value) {
    birthdateError.value = true
    birthdateErrorMessage.value = 'Voer uw geboortedatum in.'
  } else {
    birthdateError.value = false
    birthdateErrorMessage.value = ''
  }
}

const validateEmail = (email: string): boolean => {
  const emailValidation = /^[^\s@]+@(hotmail|gmail|yahoo|)\.[^\s@]+$/
  return emailValidation.test(email)
}

const submitForm = () => {
  validateForm()

  if (!firstNameError.value && !emailError.value) {
    // Form is valid, perform submission logic here
    console.log('Form submitted successfully!')
  }
}

const clearFirstNameError = () => {
  firstNameError.value = false
  firstNameErrorMessage.value = ''
}

const clearEmailError = () => {
  emailError.value = false
  emailErrorMessage.value = ''
}

const clearDateError = () => {
  birthdateError.value = false
  birthdateErrorMessage.value = ''
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <div class="mb-4">
      <!-- voornaam -->
      <label for="firstname" class="mb-2 block">Voornaam</label>
      <input
        id="firstname"
        v-model="firstName"
        :class="{ 'border-red-500': firstNameError }"
        class="peer w-full appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
        @input="clearFirstNameError"
      />
      <span v-if="firstNameError" class="text-red-500">{{
        firstNameErrorMessage
      }}</span>
    </div>
    <!-- email -->
    <div class="mb-4">
      <label for="email" class="mb-2 block">Email</label>
      <input
        id="email"
        v-model="email"
        :class="{ 'border-red-500': emailError }"
        class="peer w-full appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
        @input="clearEmailError"
      />
      <span v-if="emailErrorMessage" class="text-red-500">{{
        emailErrorMessage
      }}</span>
    </div>
    <!-- geboortedatum -->
    <div class="mb-4">
      <label for="birthdate" class="mb-2 block">geboortedatum</label>
      <input
        id="birthdate"
        input
        type="date"
        v-model="selectedDate"
        :class="{ 'border-red-500': birthdateError }"
        class="peer w-full appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
        @input="clearDateError"
      />
      <span v-if="birthdateErrorMessage" class="text-red-500">{{
        birthdateErrorMessage
      }}</span>
    </div>

    <!-- select device id  -->
    <div class="mt-5 flex items-center">
      <label for="device">
        <fitbit />
      </label>

      <select
        @input="validateForm"
        required
        name="device"
        id="device"
        class="peer h-fit w-fit appearance-none rounded-lg border-2 border-gray-400 text-sm focus:border-2 focus:border-tertiary-500 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
      >
        <option
          v-for="d of dummydata"
          :key="d.id"
          :value="d.id"
          class="rounded-lg"
        >
          {{ d.id }}
        </option>
      </select>
    </div>
    <!-- test pressable -->
    <button
      type="submit"
      class="duration-400 mt-5 w-10 min-w-max rounded-lg text-tertiary-600 ring-2 ring-tertiary-300 bg-tertiary-100/30 p-5 transition-all hover:cursor-pointer hover:bg-tertiary-200/40"
    >
      Submit
    </button>
  </form>
</template>

<style scoped>
.text-red-500 {
  color: #f56565;
}
.border-red-500 {
  border-color: #f56565;
}
</style>
