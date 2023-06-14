<script setup lang="ts">
import { f } from 'ofetch/dist/error-04138797'
import { defineProps, defineEmits, watch } from 'vue'

const props = defineProps({
  birthDateValue: {
    type: String,
    required: true,
  },
  isValid: {
    type: Boolean,
    required: false,
    default: true,
  },
})

const emits = defineEmits(['update:birthDateValue', 'update:isValid'])

const validateInput = (value: string) => {
  // Perform your form validation logic here
  // Example: Check if the input value has a length greater than 3
  return value.length > 3
}

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement | null

  if (target) {
    const dateValue = target.valueAsDate // Get the date object from the input value
    const value = dateValue ? dateValue.toISOString().substring(0, 10) : '' // Convert date to string

    const isValid = validateInput(value)

    emits('update:isValid', isValid)

    if (isValid) {
      emits('update:birthDateValue', value)
    }
  }
}

watch(
  () => props.birthDateValue,
  newValue => {
    if (newValue) {
      emits('update:isValid', true)
      emits('update:birthDateValue', newValue)
    } else {
      emits('update:isValid', false)
    }
  },
)
</script>

<template>
  <label for="geboortedatum">Geboortedatum</label>
  <input
    id="geboortedatum"
    type="date"
    :value="birthDateValue"
    @input="updateValue($event)"
    class="peer block h-fit w-full appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:border-tertiary-500 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
  />
</template>

<style scoped></style>
