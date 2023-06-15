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
    const dateValue = target.valueAsDate // Get the date object from the input value\
    if (!dateValue) return
    const date = new Date(dateValue)
    // convert to nl-be format with double digit day and month
    const dateStringNl = date.toLocaleDateString('nl-BE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    emits('update:birthDateValue', dateStringNl)
    emits('update:isValid', true)

    console.log('DateStringNl: ' + dateStringNl)
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
    format="dd-mm-yyyy"
    :value="birthDateValue"
    @input="updateValue($event)"
    class="peer block h-fit w-full appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:border-tertiary-500 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
  />
</template>

<style scoped></style>
