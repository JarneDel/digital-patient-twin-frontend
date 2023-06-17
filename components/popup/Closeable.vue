<script lang="ts" setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import { LucideX } from 'lucide-vue-next'
import { title } from 'process'

const emits = defineEmits([
  'close',
  'button2Event',
  'update:isOpen',
  'button3Event',
])

const closeModal = () => {
  emits('update:isOpen', false)
  emits('close')
}

const setIsOpen = (value: boolean) => {
  console.log('setIsOpen' + value)
  emits('update:isOpen', value)
}

defineProps({
  message: {
    type: String,
    required: true,
    default: 'Er is iets fout gegaan',
  },
  titleMessage: {
    type: String,
    required: false,
    default: 'Oops!',
  },
  button2: {
    type: String,
    required: false,
  },
  button3: {
    type: String,
    required: false,
  },
  isOpen: {
    type: Boolean,
    required: true,
  },
})
</script>

<template>
  <TransitionRoot :show="isOpen" appear as="template">
    <Dialog as="div" class="relative z-10" @close="setIsOpen">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25"></div>
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <!-- Changed leave from 200 to 100 so you dont see the X icon  -->
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="shadow-xl w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                {{ titleMessage }}
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  {{ message }}
                </p>
              </div>
              <div>
                <LucideX
                  name="close"
                  role="button"
                  class="absolute right-4 top-4 cursor-pointer rounded-md p-1 transition-colors duration-200 hover:bg-neutral-100/20"
                  @click="closeModal"
                ></LucideX>
              </div>
              <div class="align-center mt-4 flex justify-between">
                <button
                  v-if="button2"
                  class="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-tertiary-600 ring-2 ring-tertiary-300 hover:bg-tertiary-200/20 focus:outline-none focus-visible:ring-tertiary-500"
                  type="button"
                  @click="$emit('button2Event')"
                >
                  {{ button2 }}
                </button>
                <button
                  v-if="button3"
                  class="inline-flex justify-center rounded-md border border-transparent bg-tertiary-100/30 px-4 py-2 text-sm font-medium text-tertiary-600 ring-2 ring-tertiary-300 hover:bg-tertiary-200/40 focus:outline-none focus-visible:ring-tertiary-500"
                  type="button"
                  @click="$emit('button3Event')"
                >
                  {{ button3 }}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
