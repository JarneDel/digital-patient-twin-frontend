<script setup lang="ts">

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  isValid: {
    type: Boolean,
    required: false,
    default: true,
  },
})

const emits = defineEmits(['update:modelValue', 'update:isValid'])

const validateInput = (value: string) => {
  // Perform your form validation logic here
  // Example: Check if the input value has a length greater than 3
  return value.length > 3
}

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement | null

  if (target) {
    const dateValue = target.value // Get the date value from the input
    if (!validateInput(dateValue)) {
      emits('update:isValid', false)
      return
    }

    emits('update:modelValue', dateValue)
    emits('update:isValid', true)

    console.log('Date Value: ' + dateValue)
  }
}

watch(
  () => props.birthDateValue,
  newValue => {
    if (newValue) {
      emits('update:isValid', true)
      emits('update:birthDateValue', newValue)
    } else {
      emits('update:isValid', false)
    }
  },
)
</script>

<template>
  <label for="geboortedatum">Geboortedatum</label>
  <input
    id="geboortedatum"
    type="date"
    :value="modelValue"
    @change="updateValue($event)"
    class="peer block h-fit w-full appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
  />
</template>

<style scoped></style>
