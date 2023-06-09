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

<template>
  <label class="capitalize">geboorteland</label>
  <input
    type="text"
    :required="isInputValid"
    v-model="inputValue"
    :class="{ 'border-red-500': !isInputValid }"
    class="peer block h-fit w-full appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:border-tertiary-600 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
  />
  <p v-if="!isInputValid" class="text-red-500">Please enter a value</p>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, watch } from 'vue'

const props = defineProps({
  value: {
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

let inputValue = props.value
let isInputValid = inputValue !== ''

watch(
  () => inputValue,
  newValue => {
    isInputValid = newValue !== ''

    emits('update:isValid', isInputValid)
  },
)
</script>

<style scoped>
.border-red-500 {
  border-color: red;
}
</style>
