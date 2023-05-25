<template>
  <div class="mb-4">
    <label for="birthdate" class="mb-2 block">Birthdate:</label>
    <input
      id="birthdate"
      type="date"
      v-model="birthdate"
      :class="{ 'border-red-500': showError }"
      class="focus:border-tertiary-600 peer w-fit block appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
      @input="validateBirthdate"
    />
    <span v-if="showError" class="text-red-500 ">{{ errorMessage }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const birthdate = ref('')
const showError = ref(false)

const validateBirthdate = () => {
  const dateParts = birthdate.value.split('-')

  // Check if all date components (day, month, year) are filled
  const isFilled =
    dateParts.length === 3 && dateParts.every(part => part !== '')

  showError.value = !isFilled
}

const errorMessage = computed(() => {
  if (showError.value) {
    return 'Please enter a valid birthdate (day, month, and year are required).'
  } else {
    return ''
  }
})
</script>

<style scoped>
/* Styles for the birthdate input component */
</style>
