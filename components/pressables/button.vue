<script setup lang="ts">
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
  <Button
    @click="e => $emit('click', e)"
    :disabled="disabled"
    class="width bg-tertiary-500"
  >
    <slot />
  </Button>
</template>

<style scoped>
.width {
  width: v-bind(width);
}
</style>
