<script lang="ts">
export default {
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    isValid: {
      type: Boolean,
      required: false,
      default: true,
    },
    type: {
      type: String as PropType<'text' | 'email' | 'password' | "date">,
      required: false,
      default: 'text',
    },
    label: {
      type: String,
      required: true,
    },
    size: {
      type: String as PropType<'half' | 'full'>,
      required: false,
      default: 'full',
    },
    inputId: {
      type: String,
      required: true,
    },
  },
  emits: ['update:modelValue', 'update:isValid'],
};
</script>

<template>
  <label :for='inputId' >{{ label }}</label>
  <input
    :type="type"
    :id="inputId"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="peer block h-fit appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
    :class='{
      "w-1/2": size === "half",
      "w-full": size === "full",
    }'
  />
  <div v-if="!isValid" class="mt-1 text-sm text-primary-500">
    Invalid input.
  </div>
</template>
