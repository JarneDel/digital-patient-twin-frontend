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
  <div class="m-12">
    <button
      @click="e => $emit('click', e)"
      :disabled="disabled"
      class="inline-flex justify-center rounded-md border border-transparent bg-tertiary-400 px-4 py-2 text-sm font-medium text-neutral-900 ring-2 ring-tertiary-400 hover:bg-tertiary-500/90 focus:outline-none focus-visible:ring-tertiary-600"
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
