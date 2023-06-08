<template>
  <div class="flex gap-4">
    <!-- postal code -->
    <div>
      <label for="postalCode" class="mb-2 block">Post code</label>
      <input
        id="postalCode"
        v-model="postalCode"
        :class="{ 'border-red-500': isPostalCodeInvalid }"
        type="number"
        class="peer block h-fit w-fit appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:border-tertiary-600 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
        @input="validatePostalCode"
      />
      <span
        v-if="isPostalCodeInvalid"
        class="break-word inline-block text-red-500"
      >
        {{ postalCodeErrorMessage }}
      </span>
    </div>

    <!-- house number -->
    <div>
      <label for="houseNumber" class="mb-2 block">Nummer</label>
      <input
        id="houseNumber"
        v-model="houseNumber"
        :class="{ 'border-red-500': isHouseNumberInvalid }"
        class="peer block h-fit w-fit appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:border-tertiary-600 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
        @input="validateHouseNumber"
      />
      <span
        v-if="isHouseNumberInvalid"
        class="break-word inline-block text-red-500"
      >
        {{ houseNumberErrorMessage }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const postalCode = ref('')
const houseNumber = ref('')
const isPostalCodeInvalid = ref(false)
const isHouseNumberInvalid = ref(false)
const postalCodeErrorMessage = ref('')
const houseNumberErrorMessage = ref('')

function validatePostalCode() {
  const numericRegex = /^[0-9]+$/
  isPostalCodeInvalid.value = !numericRegex.test(postalCode.value)
  postalCodeErrorMessage.value = 'Only numeric values are allowed.'
}

function validateHouseNumber() {
  const numericRegex = /^[0-9]+$/
  isHouseNumberInvalid.value = !numericRegex.test(houseNumber.value)
  houseNumberErrorMessage.value = 'Only numeric values are allowed.'
}

watch(postalCode, () => {
  validatePostalCode()
})

watch(houseNumber, () => {
  validateHouseNumber()
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
