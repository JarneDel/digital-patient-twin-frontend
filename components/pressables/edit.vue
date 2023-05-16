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
defineEmits(['update:isEditing', 'delete'])
</script>

<template>
  <div>
    <div
      class="m-2 h-[72px] max-w-[100px] rounded-lg bg-tertiary-500 p-5 font-semibold transition-all"
      :class="{ 'max-w-[400px]': isEditing }"
    >
      <button
        v-if="!isEditing"
        @click="e => (isEditing = true)"
        class="h-full w-full"
      >
        <lucide-edit3 class="h-8 w-8" />
      </button>
      <div v-else>
        <div class="flex flex-row justify-between gap-2">
          <p class="whitespace-nowrap">{{ selectedCount }} selected</p>
          <div class="flex flex-row justify-end">
            <button>
              <lucide-trash class="h-8 w-8"></lucide-trash>
            </button>
            <button @click="e => (isEditing = false)">
              <lucide-x class="h-8 w-8" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
