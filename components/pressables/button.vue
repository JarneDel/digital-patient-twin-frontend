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
    :disabled="disabled"
    class="width bg-tertiary-500"
  >
    <slot />
  </button>
</template>

<style scoped>
.width {
  width: v-bind(width);
}
</style>
