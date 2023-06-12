<script setup lang="ts">
const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  selected: {
    type: String,
    required: true,
  },
})
defineEmits(['update:selected'])
</script>

<template>
  <div class="flex flex-row justify-between gap-4">
    <div class="flex flex-row">
      <button
        v-for="(option, index) in options"
        :key="option"
        @click="$emit('update:selected', option)"
        class=" overflow-hidden px-3 py-3 ring-2 text-tertiary-600 ring-transparent transition-all duration-300 ease-out outline-none focus-visible:ring-tertiary-500"
        :class="{
          'rounded-l-lg': index === 0,
          'rounded-r-lg': index === options.length - 1,
          'rounded-none': index !== 0 && index !== options.length - 1,
          'bg-tertiary-300/30': option !== selected,
          'bg-tertiary-500/70': option === selected,
        }"
      >
        {{ option }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>
