<!-- <template>
  <label for="firstname" class="mb-2 block">Geboorteland</label>
  <input
    id="country"
    v-model="country"
    :class="{ 'border-red-500': iscountryInvalid }"
    class="peer block h-fit w-full appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:border-tertiary-600 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
  />
  <span v-if="iscountryInvalid" class="break-word inline-block text-red-500">
    {{ countryErrorMessage }}
  </span>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'

const country = ref('')
const iscountryInvalid = ref(false)
const countryErrorMessage = ref('')

watch(country, newValue => {
  if (newValue.trim().length === 0) {
    iscountryInvalid.value = true
  } else if (newValue.trim().length < 2) {
    iscountryInvalid.value = true
    countryErrorMessage.value =
      'Uw voornaam moet minstens 2 karakters bevatten.'
  } else {
    iscountryInvalid.value = false
  }
})
</script>

<style>
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
  cityValue: {
    type: String,
    required: true,
  },
  isValid: {
    type: Boolean,
    required: false,
    default: true,
  },
})

const emits = defineEmits(['update:cityValue', 'update:isValid'])

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
      emits('update:cityValue', value)
    }
  }
}

watch(
  () => props.cityValue,
  newValue => {
    if (newValue) {
      emits('update:isValid', true)
      emits('update:cityValue', newValue)
    } else {
      emits('update:isValid', false)
    }
  },
)
</script>

<template>
  <label>gemeente</label>
  <input
    type="text"
    :value="cityValue"
    @input="updateValue($event)"
    class="peer block h-fit w-full appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:border-tertiary-500 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
  />
  <div v-if="!isValid" class="mt-1 text-sm text-primary-500">
    <p>Invalid input</p>
  </div>
</template>

<style scoped></style>
