<!-- <script setup lang="ts">
const props = defineProps({
  postalcodeValue: {
    type: Number,
    required: true,
  },
  huisNumberValue: {
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
let postalcodeValue = props.postalcodeValue
let huisNumberValue = props.huisNumberValue
watch(
  () => postalcodeValue && huisNumberValue,
  newValue => {
    if (newValue) {
      emits('update:isValid', true)
    } else {
      emits('update:isValid', false)
    }
  },
)
</script> -->

<script setup lang="ts">
import { defineProps, defineEmits, watch } from 'vue'

const props = defineProps({
  postalcodeValue: {
    type: String,
    required: true,
  },
  huisNumberValue: {
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
  return value.length > 3 || value.length === 0
}

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement | null //target is input als event niet bestaat is null

  if (target) {
    const value = target.value
    const isValid = validateInput(value)

    emits('update:isValid', isValid)

    if (isValid) {
      emits('update:textValue', value)
    }
  }
}
</script>

<template>
  <div class="flex gap-4">
    <div>
      <label for="postalCode" class="mb-2 block">Post code</label>
      <input
        type="text"
        id="postalCode"
        @input="updateValue($event)"
        v-model="props.postalcodeValue"
        class="peer block h-fit w-full appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:border-tertiary-500 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
      />
    </div>

    <div>
      <label for="houseNumber" class="mb-2 block">Nummer</label>
      <input
        type="text"
        id="houseNumber"
        v-model="props.huisNumberValue"
        class="peer block h-fit w-full appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:border-tertiary-500 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
      />
    </div>
  </div>
</template>

<style scoped></style>
