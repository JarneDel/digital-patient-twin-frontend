<template>
  <!-- phone number -->
  <label for="phone" class="mb-2 block">telefoon nummer</label>
  <input
    id="phone"
    v-model="phoneNumber"
    :class="{ 'border-red-500': isPhoneNumberInvalid }"
    class="peer block h-fit w-full appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:border-tertiary-600 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
    @input="validatePhoneNumber"
  />
  <span
    v-if="isPhoneNumberInvalid"
    class="break-word inline-block text-red-500"
  >
    {{ phoneNumberErrorMessage }}
  </span>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const phoneNumber = ref('')
const isPhoneNumberInvalid = ref(false)
const phoneNumberErrorMessage = ref('')

function validatePhoneNumber() {
  const numericRegex = /^[0-9]+$/
  isPhoneNumberInvalid.value = !numericRegex.test(phoneNumber.value)
  phoneNumberErrorMessage.value = 'Only numeric values are allowed.'
}

watch(phoneNumber, () => {
  validatePhoneNumber()
})
</script>

<style>
.border-red-500 {
  border-color: #ef4444;
}
.text-red-500 {
  color: #ef4444;
}
</style>
