<template>
  <!-- bloedtype -->
  <label for="bloodType" class="mb-2 block">Bloedtype</label>
  <input
    id="bloodType"
    type="text"
    v-model="bloodType"
    :class="{ 'border-red-500': isBloodTypeInvalid }"
    @input="validateBloodType"
    class="focus:border-tertiary-600 peer block h-fit w-full appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
  />
  <span v-if="isBloodTypeInvalid" class="break-word inline-block text-red-500">
    {{ bloodTypeErrorMessage }}
  </span>
  <span
    v-else-if="bloodType === ''"
    class="break-word inline-block text-gray-500"
  >
    Onbekend
  </span>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const bloodType = ref('')
const isBloodTypeInvalid = ref(false)
const bloodTypeErrorMessage = ref('')

const validateBloodType = () => {
  const value = bloodType.value.trim()
  if (value !== '' && !/^(A|B|AB|O)(\+|\-)?$/.test(value)) {
    isBloodTypeInvalid.value = true
    bloodTypeErrorMessage.value =
      'Voer een geldig bloedtype in (bijv. A+, B-, AB, O+).'
  } else {
    isBloodTypeInvalid.value = false
    bloodTypeErrorMessage.value = ''
  }
}

watch(bloodType, () => {
  validateBloodType()
})
</script>

<style>
.border-red-500 {
  border-color: #ef4444;
}
.text-red-500 {
  color: #ef4444;
}
.text-gray-500 {
  color: #999999;
}
</style>
