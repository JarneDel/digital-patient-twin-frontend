<template>
  <label>E-mail</label>
  <input
    type="email"
    v-model="props.emailValue"
    class="peer block h-fit w-full appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:border-tertiary-600 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
    :class="{
      'border-red-500': !isValidEmail,
    }"
  />
  <p v-if="!isValidEmail" class="text-red-500">
    Please enter a valid email address
  </p>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue'

const props = defineProps({
  emailValue: {
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

const isValueFilled = ref(true)
const isValidEmail = ref(true)

watch(props, newValue => {
  isValueFilled.value = !!newValue
  isValidEmail.value = validateEmail(newValue)

  emits('update:isValid', isValueFilled.value && isValidEmail.value)
})

function validateEmail(email: any) {
  // Simple email validation logic
  return email.includes('@')
}
</script>

<style scoped>
.border-red-500 {
  border-color: #ef4444;
}
.text-red-500 {
  color: #ef4444;
}
</style>
