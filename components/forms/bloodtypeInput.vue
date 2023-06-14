<script setup lang="ts">
import { defineProps, defineEmits, watch } from 'vue'

const props = defineProps({
  bloodTypeValue: {
    type: String,
    required: true,
  },
  isValid: {
    type: Boolean,
    required: false,
    default: true,
  },
})

const emits = defineEmits(['update:bloodTypeValue', 'update:isValid'])

const validateInput = (value: string) => {
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

  const uppercaseValue = value.toUpperCase()

  return bloodGroups.includes(uppercaseValue) || bloodGroups.includes(value)
}

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement | null //target is input als event niet bestaat is null

  if (target) {
    const value = target.value
    const isValid = validateInput(value)

    emits('update:isValid', isValid)

    if (isValid) {
      emits('update:bloodTypeValue', value)
    }
  }
}

watch(
  () => props.bloodTypeValue,
  newValue => {
    const isValid = validateInput(newValue)

    emits('update:isValid', isValid)
  },
)
</script>
<template>
  <div class="select-container">
    <label for="blood-group">Bloedgroep</label>
    <div class="select-wrapper">
      <select
        id="blood-group"
        :value="bloodTypeValue"
        @input="updateValue($event)"
        class="peer block h-fit w-full appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:border-tertiary-500 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
      >
        <option value="">Selecteer bloedgroep</option>
        <option value="A+">A+</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B-">B-</option>
        <option value="AB+">AB+</option>
        <option value="AB-">AB-</option>
        <option value="O+">O+</option>
        <option value="O-">O-</option>
      </select>
    </div>
    <div v-if="!isValid" class="mt-1 text-sm text-primary-500">
      Ongeldige selectie.
    </div>
  </div>
</template>

<style scoped></style>
