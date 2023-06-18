<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'

const props = defineProps({
  phoneNumberValue: {
    type: String,
    required: true,
  },
  isValid: {
    type: Boolean,
    required: false,
    default: true,
  },
})

const emits = defineEmits(['update:phoneNumberValue', 'update:isValid'])

const updateValue = (event: Event) => {
  console.log('updateValue')
  const target = event.target as HTMLInputElement | null //target is input als event niet bestaat is null
  if (target) {
    const value = target.value
    // check if phone number is valid
    const regex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
    const isValid = regex.test(value)

    emits('update:isValid', isValid)

    if (isValid) {
      emits('update:phoneNumberValue', value)
    }
  }
}
</script>

<template>
  <label for="telefoon">telefoon</label>
  <input
    id="telefoon"
    type="tel"
    :value="phoneNumberValue"
    @input="updateValue($event)"
    class="peer block h-fit w-full appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:border-tertiary-500 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
  />

  <div v-if="!isValid" class="mt-1 text-sm text-primary-500">
    <p>Invalid input</p>
  </div>
</template>

<style scoped></style>
