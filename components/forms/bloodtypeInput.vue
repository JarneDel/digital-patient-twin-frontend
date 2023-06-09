<script setup lang="ts">
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

watch(
  () => props.value,
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
  <label>Bloedgroep</label>
  <input
    type="text"
    v-model="props.value"
    class="peer block h-fit w-fit appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:border-tertiary-600 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
  />
</template>

<style scoped></style>
