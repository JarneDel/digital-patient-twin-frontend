<script setup lang="ts">
export type ButtonTypes = 'primary' | 'secondary' | 'tertiary'

defineEmits({
  click: (e: MouseEvent) => true,
  mouseover: (e: MouseEvent) => true,
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
})
</script>

<template>
  <button
    @click="e => $emit('click', e)"
    :disabled="disabled"
    class="inline-flex justify-center rounded-md border-2 border-tertiary-400 bg-tertiary-100/30 px-3 py-2 text-sm font-medium text-tertiary-600 hover:bg-tertiary-200/40 focus:outline-none focus-visible:border-tertiary-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-tertiary-500 active:bg-tertiary-100/60"
    type="button"
    :class="disabled && 'bg-tertiary-300'"
    @mouseover="e => $emit('mouseover', e)"
  >
    <slot />
  </button>
</template>

<style scoped>
button {
  width: v-bind(width);
}
</style>
