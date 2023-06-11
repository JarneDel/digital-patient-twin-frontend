<!-- <script setup lang="ts">
import { defineProps, defineEmits, watch } from 'vue'

const props = defineProps({
  FirstnameValue: {
    type: String,
    required: true,
  },
  isValid: {
    type: Boolean,
    required: false,
    default: true,
  },
})

const emits = defineEmits(['update:input', 'update:isValid'])

let inputValue = props.FirstnameValue

watch(
  () => props.FirstnameValue,
  newValue => {
    inputValue = newValue
    if (newValue) {
      emits('update:isValid', true)
      emits('update:input', newValue)
    } else {
      emits('update:isValid', false)
    }
  },
)
</script>

<template>
  <label>Voornaam</label>
  <input
    type="text"
    v-model="inputValue"
    class="peer block h-fit w-full appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:border-tertiary-600 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
  />
</template>

<style scoped></style> -->
<script setup lang="ts">
import { defineProps, defineEmits, watch } from 'vue'

const props = defineProps({
  textValue: {
    type: String,
    required: true,
  },
  isValid: {
    type: Boolean,
    required: false,
    default: true,
  },
})

const emits = defineEmits(['update:textValue', 'update:isValid'])

const validateInput = (value: string) => {
  // Perform your form validation logic here
  // Example: Check if the input value has a length greater than 3
  return value.length > 3
}

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement | null

  if (target) {
    const value = target.value
    const isValid = validateInput(value)

    emits('update:isValid', isValid)

    if (isValid) {
      emits('update:textValue', value)
    }
  }
}

watch(
  () => props.textValue,
  newValue => {
    const isValid = validateInput(newValue)

    emits('update:isValid', isValid)
  },
)
</script>

<template>
  <label>Voornaam</label>
  <input
    type="text"
    v-model="props.textValue"
    @input="updateValue($event)"
    class="peer block h-fit w-full appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:border-tertiary-500 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
  />
  <div v-if="!isValid" class="mt-1 text-sm text-primary-500">
    Invalid input.
  </div>
</template>

<style scoped></style>
