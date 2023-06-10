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
  lblName: {
    type: String,
    required: true,
  },
})

const emits = defineEmits(['update:input', 'update:isValid'])

const inputValue = props.textValue

const validateInput = (value: string) => {
  // Perform your form validation logic here
  // Example: Check if the input value has a length greater than 3
  return value.length > 3
}

const updateValue = (value: string) => {
  const isValid = validateInput(value)

  emits('update:isValid', isValid)

  if (isValid) {
    emits('update:input', value)
  }
}

watch(
  () => inputValue,
  newValue => {
    updateValue(newValue)
  },
)
</script>

<template>
  <label>{{ lblName }}</label>
  <input
    type="text"
    v-model="inputValue"
    class="peer block h-fit w-full appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:border-tertiary-600 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
  />
</template>

<style scoped></style>
