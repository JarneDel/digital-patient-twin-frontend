<script setup lang="ts">
import { defineEmits, defineProps, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  isValid: {
    type: Boolean,
    required: false,
    default: true,
  },
})

const emits = defineEmits(['update:modelValue', 'update:isValid'])

const validateInput = (value: string) => {
  // Perform your form validation logic here
  return value === 'male' || value === 'female' || value === 'other'
}

watch(
  () => props.modelValue,
  newValue => {
    const isValid = validateInput(newValue)
    emits('update:isValid', isValid)
  },
)
</script>

<template>
  <label for="geslacht">geslacht</label>
  <select
    id="geslacht"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="peer block h-fit w-full appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
  >
    <option disabled value="">Selecteer geslacht</option>
    <option value="male">Man</option>
    <option value="female">Vrouw</option>
    <option value="other">Andere</option>
  </select>
  <div v-if="!isValid" class="mt-1 text-sm text-primary-500">
    Invalid input.
  </div>
</template>

<style scoped></style>
