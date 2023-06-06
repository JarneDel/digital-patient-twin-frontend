<script setup lang="ts">
import { ref } from 'vue'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { Check, ChevronDown } from 'lucide-vue-next';

const props = defineProps({
  type: {
    type: String as PropType<'default' | 'searchable'>,
    required: false,
    default: 'default',
  },
  options: {
    type: Array as PropType<string[]>,
    required: true,
  },
  selected: {
    type: String,
    required: true,
  },
})

const opt = props.options.toString().split(',').map((name) => ({
  name,
}))
const selected = ref(opt[0])


</script>

<template>
  <div class="w-72">
    <Listbox v-model="selected">
      <div class="relative mt-1">
        <ListboxButton
          class="relative w-full cursor-default rounded-lg bg-tertiary-300 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-tertiary-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-tertiary-500 sm:text-sm"
        >
          <span class="block truncate text-tertiary-600">{{ selected.name }}</span>
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <ChevronDown
              class="h-5 w-5 text-tertiary-600"
              aria-hidden="true"
            />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-tertiary-100 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="person in opt"
              :key="person.name"
              :value="person"
              as="template"
            >
              <li
                :class="[
                  active ? 'bg-tertiary-400 text-tertiary-600' : 'text-tertiary-600',
                  'relative cursor-default select-none py-2 pl-10 pr-4',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                  >{{ person.name }}</span
                >
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-tertiary-600"
                >
                  <Check class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>


