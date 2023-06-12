<!-- <template>
  <div class="mb-4">
    <label for="birthdate" class="mb-2 block">Geboortedatum</label>
    <input
      id="birthdate"
      type="date"
      v-model="birthdate"
      :class="{ 'border-red-500': showError }"
      class="focus:border-tertiary-600 peer block w-full appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
      @input="validateBirthdate"
    />
    <span v-if="showError" class="text-red-500">{{ errorMessage }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const birthdate = ref('')
const showError = ref(false)

const validateBirthdate = () => {
  const dateParts = birthdate.value.split('-')

  // Check if all date components (day, month, year) are filled
  const isFilled =
    dateParts.length === 3 && dateParts.every(part => part !== '')

  showError.value = !isFilled
}

const errorMessage = computed(() => {
  if (showError.value) {
    return 'Please enter a valid birthdate (day, month, and year are required).'
  } else {
    return ''
  }
})
</script>

<style scoped>
/* Styles for the birthdate input component */
</style> -->
<script setup lang="ts">
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
    const value = target.value
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
    v-model="props.birthDateValue"
    @input="updateValue($event)"
    class="peer block h-fit w-full appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:border-tertiary-500 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
  />
  <div v-if="!isValid" class="mt-1 text-sm text-primary-500">
    <p>Invalid input</p>
  </div>
</template>

<style scoped></style>
