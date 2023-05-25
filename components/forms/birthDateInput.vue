<template>
  <div class="mb-4">
    <label for="birthdate" class="mb-2 block">geboortedatum</label>
    <input
      id="birthdate"
      input
      type="date"
      v-model="birthdate"
      :class="{ 'border-red-500': birthdateError }"
      class="focus:border-tertiary-600 peer w-full appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
    />
    <span v-if="birthdateErrorMessage" class="text-red-500">{{
      birthdateErrorMessage
    }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const birthdate = ref('')
const birthdateError = ref(false)
const birthdateErrorMessage = ref('')

watch(birthdate, birthValue => {
  birthValue = birthdate.value
  if (!birthValue || birthValue === '') {
    birthdateError.value = true
    birthdateErrorMessage.value = 'Uw geboortedatum is verplicht.'
  } else {
    const parts = birthdate.value.split('-')
    const year = parseInt(parts[0])
    const month = parseInt(parts[1])
    const day = parseInt(parts[2])
    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      birthdateError.value = true
      birthdateErrorMessage.value = 'Please enter a valid birthdate.'
    }
  }
})
</script>

<style scoped>
.border-red-500 {
  border-color: #ef4444;
}
.text-red-500 {
  color: #ef4444;
}
</style>
