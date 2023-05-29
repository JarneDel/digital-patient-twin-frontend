<template>
  <div>
    <button
      type="submit"
      class="duration-400 mt-5 w-10 min-w-max rounded-lg bg-tertiary-500 p-5 transition-all hover:cursor-pointer hover:bg-tertiary-300"
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
