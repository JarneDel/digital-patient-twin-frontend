<!-- <template>
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
</style> -->
<script setup lang="ts">
import { defineProps, defineEmits, watch } from 'vue'

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



const emits = defineEmits(['update:emailValue', 'update:isValid'])

const validateInput = (value: string) => {
  // Perform your form validation logic here
  return value.includes('@')
}

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement | null //target is input als event niet bestaat is null

  if (target) {
    const value = target.value
    const isValid = validateInput(value)

    emits('update:isValid', isValid)

    if (isValid) {
      emits('update:emailValue', value)
    }
  }
}
</script>

<template>
  <label for="mail">E-mail</label>
  <input
    id="mail"
    type="email"
    :value="emailValue"
    @input="updateValue($event)"
    class="peer block h-fit w-full appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:border-tertiary-500 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
  />

  <div v-if="!isValid" class="mt-1 text-sm text-primary-500">
    <p>Invalid input</p>
  </div>
</template>

<style scoped></style>
