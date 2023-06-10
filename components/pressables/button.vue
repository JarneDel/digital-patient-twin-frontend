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
})
</script>

<template>
    <button
      @click="e => $emit('click', e)"
      :disabled='disabled'
      class='inline-flex justify-center rounded-md py-2 px-3  bg-tertiary-100/30 border-2 text-sm font-medium text-tertiary-600 border-tertiary-400 hover:bg-tertiary-200/40 focus:outline-none focus-visible:border-tertiary-500'
      type='button'
      :class="disabled && 'bg-tertiary-300'"
    >
      <slot />
    </button>
</template>

<style scoped>
button {
  width: v-bind(width);
}
</style>
