<!-- <template>

  <label for="weight" class="mb-2 block">Gewicht</label>
  <input
    id="weight"
    type="text"
    v-model="weight"
    :class="{ 'border-red-500': isWeightInvalid }"
    @input="validateWeight"
    class="focus:border-tertiary-600 peer block h-fit w-full appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
  />
  <span v-if="isWeightInvalid" class="break-word inline-block text-red-500">
    {{ weightErrorMessage }}
  </span>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const weight = ref('')
const isWeightInvalid = ref(false)
const weightErrorMessage = ref('')

const validateWeight = () => {
  const value = weight.value.trim()
  if (value === '') {
    isWeightInvalid.value = true
    weightErrorMessage.value = 'Voer een gewicht in.'
  } else if (!/^\d+(\.\d+)?(kg)?$/.test(value)) {
    isWeightInvalid.value = true
    weightErrorMessage.value =
      'Voer een geldig gewicht in (bijv. 75 of 75.5kg).'
  } else {
    isWeightInvalid.value = false
    weightErrorMessage.value = ''
  }
}

watch(weight, () => {
  validateWeight()
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
  weightValue: {
    type: Number,
    required: true,
  },
  isValid: {
    type: Boolean,
    required: false,
    default: true,
  },
})

const emits = defineEmits(['update:weightValue', 'update:isValid'])

const validateInput = (value: Number) => {
  if (value === 0) {
    return false
  } else {
    return true
  }
}
const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement | null

  if (target) {
    const value = parseFloat(target.value)
    const isValid = validateInput(value)

    emits('update:isValid', isValid)

    if (isValid) {
      emits('update:weightValue', value)
    }
  }
}

watch(
  () => props.weightValue,
  newValue => {
    const isValid = validateInput(newValue)

    emits('update:isValid', isValid)
  },
)
</script>

<template>
  <label for="gewicht">gewicht</label>
  <input
    id="gewicht"
    type="number"
    :value="weightValue"
    @input="updateValue"
    class="peer block h-fit w-fit appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:border-tertiary-500 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
  />
  <p v-if="!isValid" class="text-red-500">Please enter a value</p>
</template>

<style scoped></style>
