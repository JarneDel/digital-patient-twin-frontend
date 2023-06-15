<script setup lang="ts">
import { defineProps, defineEmits, watch } from 'vue'

const props = defineProps({
  textStreetNameValue: {
    type: String,
    required: true,
  },
  isValid: {
    type: Boolean,
    required: false,
    default: true,
  },
})

const emits = defineEmits(['update:textStreetNameValue', 'update:isValid'])

const validateInput = (value: string) => {
  // Perform your form validation logic here
  // Example: Check if the input value has a length greater than 3
  return value.length > 3 || value.length === 0
}

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement | null //target is input als event niet bestaat is null

  if (target) {
    const value = target.value
    const isValid = validateInput(value)

    emits('update:isValid', isValid)

    if (isValid) {
      emits('update:textStreetNameValue', value)
    }
  }
}

watch(
  () => props.textStreetNameValue,
  newValue => {
    const isValid = validateInput(newValue)

    emits('update:isValid', isValid)
  },
)
</script>

<template>
  <label for="straat">straatnaam</label>
  <textarea
    id="straat"
    :value="textStreetNameValue"
    @input="updateValue($event)"
    class="peer block h-fit w-full appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:border-tertiary-500 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
  >
  </textarea>
  <div v-if="!isValid" class="mt-1 text-sm text-primary-500">
    <p>Invalid input</p>
  </div>
</template>

<style scoped></style>
