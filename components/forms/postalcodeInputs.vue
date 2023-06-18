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
import { defineEmits, defineProps, watch } from 'vue'

const props = defineProps({
  postalcodeValue: {
    type: Number,
    required: true,
  },
  houseNumberValue: {
    type: String,
    required: true,
  },
  isValid: {
    type: Boolean,
    required: false,
    default: true,
  },
})

const emits = defineEmits([
  'update:houseNumberValue',
  'update:postalcodeValue',
  'update:isValid',
])



const updateValuePostCode = (event: Event) => {
  const target = event.target as HTMLInputElement | null //target is input als event niet bestaat is null

  if (target) {
    const value = target.value
    const isValid = value.length > 0

    emits('update:isValid', isValid)

    if (isValid) {
      emits('update:postalcodeValue', value)
    }
  }
}
const updateValueNr = (event: Event) => {
  const target = event.target as HTMLInputElement | null //target is input als event niet bestaat is null

  if (target) {
    const value = target.value
    const isValid = value.length > 0
    console.log(value, target, isValid)
    emits('update:isValid', isValid)

    if (isValid) {
      emits('update:houseNumberValue', value)
    }
  }
}

watch(
  () => props.postalcodeValue,
  newValue => {
    if (newValue) {
      emits('update:isValid', true)
    } else {
      emits('update:isValid', false)
    }
  },
)

watch(
  () => props.houseNumberValue,
  newValue => {
    console.log(newValue)
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
        type="number"
        id="postalCode"
        @input="updateValuePostCode($event)"
        :value="postalcodeValue"
        class="peer block h-fit w-full appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:border-tertiary-500 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
      />
    </div>

    <div>
      <label for="houseNumber" class="mb-2 block">Nummer</label>
      <input
        type="text"
        id="houseNumber"
        @input="updateValueNr($event)"
        :value="houseNumberValue"
        class="peer block h-fit w-full appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:border-tertiary-500 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
      />
    </div>
  </div>
</template>

<style scoped></style>
