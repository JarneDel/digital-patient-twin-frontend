<template>
  <div>
    <button
      class="rounded bg-primary-500 px-4 py-2 font-bold text-white hover:bg-primary-600"
      @click="click"
    >
      {{ text }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { def } from '@vue/shared'

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['click'])

const click = () => {
  emit('click')
}
</script>
