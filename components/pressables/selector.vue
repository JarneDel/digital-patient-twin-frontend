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
        class=" overflow-hidden px-3 py-3  transition-all duration-300 ease-out"
        :class="{
          'rounded-l-lg': index === 0,
          'rounded-r-lg': index === options.length - 1,
          'rounded-none': index !== 0 && index !== options.length - 1,
          'bg-tertiary-300': option !== selected,
          'bg-tertiary-500': option === selected,
        }"
      >
        {{ option }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>
