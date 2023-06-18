<script setup lang="ts">
import { LucideEdit3, LucideTrash, LucideX } from 'lucide-vue-next'
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

defineEmits(['update:isEditing', 'clickEdit', 'clickDelete'])
</script>

<template>
  <div class="flex flex-row justify-end">
    <div
      class="m-2 h-[72px] overflow-hidden rounded-lg bg-tertiary-100/30 p-5 font-semibold transition-all duration-300 ease-out ring-2 ring-tertiary-300 hover:bg-tertiary-200/40 focus:outline-none focus-visible:ring-tertiary-500"
      :class="{ 'max-w-[17.5rem]': isEditing, 'max-w-[4.5rem]': !isEditing }"
    >
      <button
        v-if="!isEditing"
        @click="$emit('update:isEditing', true)"
        class="w-[15rem] focus-visible:ring-2 focus-visible:ring-tertiary-500 outline-none"
      >
        <lucide-edit3 class="h-8 w-8 text-tertiary-600" />
      </button>
      <div v-else class="w-[15rem]">
        <div class="flex flex-row items-center justify-between gap-4">
          <p class="whitespace-nowrap text-tertiary-600">{{ selectedCount }} selected</p>
          <div class="flex flex-row justify-end gap-4">
            <button @click="() => $emit('clickDelete')">
              <lucide-trash class="h-8 w-8 text-tertiary-600"></lucide-trash>
            </button>
            <button @click="$emit('update:isEditing', false)">
              <lucide-x class="h-8 w-8 text-tertiary-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
