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
  <div class='flex flex-row justify-between gap-4 border-tertiary-300 border rounded-lg'>
    <div class='flex flex-row'>
      <button
        v-for='(option, index) in options'
        :key='option'
        @click="$emit('update:selected', option)"
        :class="{
          'rounded-l-[7px]': index === 0,
          'rounded-r-[7px]': index === options.length - 1,
          'rounded-none': index !== 0 && index !== options.length - 1,
          'bg-tertiary-300/30': option !== selected,
          'bg-tertiary-500/70': option === selected,
        }"
        class=' overflow-hidden px-2 py-2 text-tertiary-600 transition-all duration-300 ease-out outline-none border-2 border-transparent focus-visible:border-tertiary-500'
      >
        {{ option }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>
