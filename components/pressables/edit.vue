<script setup lang="ts">
import { LucideEdit3, LucideX, LucideTrash } from 'lucide-vue-next'
import Button from '~/components/pressables/button.vue'

defineProps({
  selectedCount: {
    type: Number,
    required: false,
    default: 0,
  },
  isEditing: {
    type: Boolean,
    required: false,
    default: false,
  },
})
defineEmits(['update:isEditing', 'clickDelete'])
</script>

<template>
  <div class="flex flex-row justify-end">
    <div
      class="m-2 h-[72px] overflow-hidden rounded-lg bg-tertiary-500 p-5 font-semibold transition-all duration-300 ease-out"
      :class="{ 'max-w-[17.5rem]': isEditing, 'max-w-[4.5rem]': !isEditing }"
    >
      <button
        v-if="!isEditing"
        @click="$emit('update:isEditing', true)"
        class="w-[15rem]"
      >
        <lucide-edit3 class="h-8 w-8" />
      </button>
      <div v-else class="w-[15rem]">
        <div class="flex flex-row items-center justify-between gap-4">
          <p class="whitespace-nowrap">{{ selectedCount }} selected</p>
          <div class="flex flex-row justify-end gap-4">
            <button @click="$emit('clickDelete')">
              <lucide-trash class="h-8 w-8"></lucide-trash>
            </button>
            <button @click="$emit('update:isEditing', false)">
              <lucide-x class="h-8 w-8" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
