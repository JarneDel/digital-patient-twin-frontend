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
      class="rounded-lg bg-tertiary-500 font-semibold transition-colors hover:bg-tertiary-400"
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
