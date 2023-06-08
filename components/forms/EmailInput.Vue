<!-- <template>
  <div class="mb-4 w-full">
    <label for="email" class="mb-2 block">Email</label>
    <input
      id="email"
      v-model="email"
      :class="{ 'border-red-500': showError }"
      class="peer block h-fit w-full appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:border-tertiary-600 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
      @input="validateEmail"
    />
    <span v-if="showError" class="text-red-500">{{ errorMessage }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const email = ref('')
const showError = ref(false)

const validateEmail = () => {
  const emailValue = email.value

  if (
    emailValue.includes('@hotmail') ||
    emailValue.includes('@gmail') ||
    emailValue.includes('@outlook') ||
    emailValue.includes('@yahoo') ||
    emailValue.includes('@live') ||
    emailValue.includes('@icloud') ||
    emailValue.includes('@me')
  ) {
    showError.value = false
  } else {
    showError.value = true
  }
}

const errorMessage = computed(() => {
  if (showError.value) {
    return 'Please enter a valid email address '
  } else {
    return ''
  }
})
</script>

<style scoped>
.text-red-500 {
  color: #f56565;
}
.border-red-500 {
  border-color: #f56565;
}
</style> -->
<template>
  <label></label>
  <input
    type="text"
    v-model="Emailvalue"
    :class="{
      'bg-primary': isValueFilled,
      'bg-red': !isValueFilled || !isValidEmail,
    }"
  />
  <p v-if="!isValidEmail" class="text-red-500">
    Please enter a valid email address
  </p>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue'

const props = defineProps({
  Emailvalue: {
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

function validateEmail(email) {
  // Simple email validation logic
  return email.includes('@')
}
</script>

<style scoped></style>
