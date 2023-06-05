<script setup lang="ts">
export type ButtonTypes = 'primary' | 'secondary' | 'tertiary'

defineEmits({
  click: (e: MouseEvent) => true,
})
defineProps({
  type: {
    type: String,
    required: false,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  width: {
    type: String,
    required: false,
    default: 'auto',
  },
  padding: {
    type: String,
    required: false,
    default: '20px',
  },
})
</script>

<template>
  <div>
    <button
      @click="e => $emit('click', e)"
      :disabled="disabled"
      class="inline-flex justify-center rounded-md border border-transparent bg-tertiary-100/30 px-4 py-2 text-sm font-medium text-tertiary-600 ring-2 ring-tertiary-300 hover:bg-tertiary-200/40 focus:outline-none focus-visible:ring-tertiary-500"
      :class="disabled && 'bg-tertiary-300'"
    >
      <slot />
    </button>
  </div>
</template>

<style scoped>
button {
  width: v-bind(width);
  padding: v-bind(padding);
}
</style>
