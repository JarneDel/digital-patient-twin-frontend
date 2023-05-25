<template>
  <!-- voornaam -->
  <label for="firstname" class="mb-2 block">Voornaam</label>
  <input
    id="firstname"
    v-model="firstName"
    :class="{ 'border-red-500': isFirstNameInvalid }"
    class="focus:border-tertiary-600 peer w-64 appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
  />
  <span v-if="isFirstNameInvalid" class="text-red-500">
    {{ firstNameErrorMessage }}
  </span>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'

const firstName = ref('')
const isFirstNameInvalid = ref(false)
const firstNameErrorMessage = ref('')

watch(firstName, newValue => {
  if (newValue.trim().length === 0) {
    isFirstNameInvalid.value = true
  } else if (newValue.trim().length < 2) {
    isFirstNameInvalid.value = true
    firstNameErrorMessage.value =
      'Uw voornaam moet minstens 2 karakters bevatten.'
  } else {
    isFirstNameInvalid.value = false
  }
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
