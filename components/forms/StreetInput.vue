<!-- <template>

  <label for="street" class="mb-2 block">Straat</label>
  <textarea
    id="street"
    v-model="streetName"
    :class="{ 'border-red-500': isStreetNameInvalid }"
    class="focus:border-tertiary-600 peer block h-20 w-full appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
  ></textarea>
  <span v-if="isStreetNameInvalid" class="break-word inline-block text-red-500">
    {{ streetNameErrorMessage }}
  </span>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const streetName = ref('')
const isStreetNameInvalid = ref(false)
const streetNameErrorMessage = ref('')

watch(streetName, newValue => {
  if (newValue.trim().length === 0) {
    isStreetNameInvalid.value = true
    streetNameErrorMessage.value = 'vul een straatnaam in'
  } else {
    isStreetNameInvalid.value = false
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

<!-- <template>
  <label class="capitalize">straat</label>
  <textarea
    type="text"
    :required="isInputValid"
    v-model="inputValue"
    :class="{ 'border-red-500': !isInputValid }"
    class="peer block h-fit w-full appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:border-tertiary-600 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
  ></textarea>
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
</style> -->

<script setup lang="ts">
import { defineProps, defineEmits, watch } from 'vue'

const props = defineProps({
  textStreetNameValue: {
    type: String,
    required: true,
  },
  isValid: {
    type: Boolean,
    required: false,
    default: true,
  },
})

const emits = defineEmits(['update:textStreetNameValue', 'update:isValid'])

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
      emits('update:textStreetNameValue', value)
    }
  }
}

watch(
  () => props.textStreetNameValue,
  newValue => {
    const isValid = validateInput(newValue)

    emits('update:isValid', isValid)
  },
)
</script>

<template>
  <label for="straat">straatnaam</label>
  <textarea
    id="straat"
    v-model="props.textStreetNameValue"
    @input="updateValue($event)"
    class="peer block h-fit w-full appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:border-tertiary-500 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
  >
  </textarea>
  <div v-if="!isValid" class="mt-1 text-sm text-primary-500">
    <p>Invalid input</p>
  </div>
</template>

<style scoped></style>
