<script setup lang="ts">
import { defineProps, defineEmits, watch } from 'vue'

const props = defineProps({
  lengthValue: {
    type: Number,
    required: true,
  },
  isValid: {
    type: Boolean,
    required: false,
    default: true,
  },
})

const emits = defineEmits(['update:lengthValue', 'update:isValid'])

const validateInput = (value: number) => {
  return value > 3 || value === 0
}

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement | null

  if (target) {
    const value = parseInt(target.value)
    const isValid = validateInput(value)

    emits('update:isValid', isValid)

    if (isValid) {
      emits('update:lengthValue', value)
    }
  }
}

watch(
  () => props.lengthValue,
  (newValue: number) => {
    const isValid = validateInput(newValue)

    emits('update:isValid', isValid)
  },
)
</script>

<template>
  <label for="lengte">lengte (in cm)</label>
  <input
    type="number"
    id="lengte"
    :value="lengthValue"
    @input="updateValue($event)"
    class="peer block h-fit w-full appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:border-tertiary-500 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
  />

  <div v-if="!isValid" class="mt-1 text-sm text-primary-500">
    <p>Invalid input</p>
  </div>
</template>

<style scoped></style>
