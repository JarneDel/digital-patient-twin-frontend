<script setup lang="ts">
const props = defineProps({
  birthDateValue: {
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
const emits = defineEmits(['update:input', 'update:isValid'])
let birthDateValue = props.birthDateValue
let huisNumberValue = props.huisNumberValue
watch(
  () => birthDateValue && huisNumberValue,
  newValue => {
    if (newValue) {
      emits('update:isValid', true)
    } else {
      emits('update:isValid', false)
    }
  },
)
</script>
<template>
  <div class="flex gap-4">
    <div>
      <label for="postalCode" class="mb-2 block">Post code</label>
      <input
        id="postalCode"
        v-model="birthDateValue"
        :class="{ 'border-red-500': isPostalCodeInvalid }"
        type="number"
        class="peer block h-fit w-full appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:border-tertiary-600 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
      />
      <span
        v-if="isPostalCodeInvalid"
        class="break-word inline-block text-red-500"
      >
        {{ postalCodeErrorMessage }}
      </span>
    </div>

    <div>
      <label for="houseNumber" class="mb-2 block">Nummer</label>
      <input
        id="houseNumber"
        v-model="huisNumberValue"
        :class="{ 'border-red-500': isHouseNumberInvalid }"
        class="peer block h-fit w-full appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:border-tertiary-600 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
      />
      <span
        v-if="isHouseNumberInvalid"
        class="break-word inline-block text-red-500"
      >
        {{ houseNumberErrorMessage }}
      </span>
    </div>
  </div>
</template>

<style scoped></style>
