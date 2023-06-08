<template>
  <!-- voornaam -->
  <label for="length" class="mb-2 block">Lengte</label>
  <input
    id="length"
    type="text"
    v-model="length"
    :class="{ 'border-red-500': isLengthInvalid }"
    @input="validateLength"
    class="focus:border-tertiary-600 peer block h-fit w-full appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
  />
  <span v-if="isLengthInvalid" class="break-word inline-block text-red-500">
    {{ lengthErrorMessage }}
  </span>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const length = ref('')
const isLengthInvalid = ref(false)
const lengthErrorMessage = ref('')

const validateLength = () => {
  const value = length.value.trim()
  if (value === '') {
    isLengthInvalid.value = true
    lengthErrorMessage.value = 'Voer een lengte in.'
  } else if (!/^\d+(cm)?$/.test(value)) {
    isLengthInvalid.value = true
    lengthErrorMessage.value =
      'Voer een geldige lengte in (bijv. 180 of 180cm).'
  } else {
    isLengthInvalid.value = false
    lengthErrorMessage.value = ''
  }
}

watch(length, () => {
  validateLength()
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
