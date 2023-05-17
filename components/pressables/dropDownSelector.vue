<script setup lang="ts">
import { LucideChevronDown } from 'lucide-vue-next'
import Button from '~/components/pressables/button.vue'

defineProps({
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
const isOpen = ref(false)
</script>

<template>
  <div class="relative w-fit">
    <div
      class="flex w-[10rem] flex-row justify-between rounded-lg bg-tertiary-300 p-2"
    >
      <div class="pl-2">{{ selected }}</div>
      <button @click="isOpen = !isOpen">
        <lucide-chevron-down
          class="transition-transform"
          :class="isOpen ? 'rotate-180' : ''"
        />
      </button>
    </div>
    <div class="z-1 absolute pt-0.5">
      <div
        class="flex w-[10rem] flex-col rounded-lg bg-tertiary-300 transition-all duration-300 ease-out"
        :class="
          isOpen ? 'max-h-[10rem] overflow-y-auto' : 'max-h-0 overflow-hidden'
        "
      >
        <button
          v-if="isOpen"
          v-for="(option, index) in options"
          :key="option"
          @click="$emit('update:selected', option)"
          class="p-2 transition-all duration-300 ease-out"
          :class="{
            'rounded-t-lg': index === 0,
            'rounded-b-lg': index === options.length - 1,
            'rounded-none': index !== 0 && index !== options.length - 1,
            'bg-tertiary-300': option !== selected,
            'bg-tertiary-500': option === selected,
          }"
        >
          {{ option }}
        </button>
        <div v-else class="h-full"></div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
