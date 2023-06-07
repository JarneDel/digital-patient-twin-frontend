<script setup lang="ts">
import { ref, defineProps } from 'vue'
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from '@headlessui/vue'
import { Check, ChevronDown } from 'lucide-vue-next';

const props = defineProps({
  type: {
    type: String as PropType<'small' | 'medium'>,
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
const query = ref('')

const filteredPeople = computed(() => {
  if (query.value === '') {
    return opt
  } else {
    return opt.filter((person) =>
      person.name.toLowerCase().includes(query.value.toLowerCase())
    )
  }
})

</script>

<template>
    <div class="w-72" v-if="type === 'medium'">
        <Combobox v-model="selected">
          <div class="relative mt-1">
            <div
              class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
            >
              <ComboboxInput
              class="w-full outline-transparent outline-8 -outline-offset-2 border-none py-2 pl-3 pr-10 ring-2 ring-transparent text-sm leading-5 bg-tertiary-400 text-tertiary-600 focus-visible:outline-tertiary-500"
                :displayValue="(person:any) => person.name"
                @change="query = $event.target.value"
              />
              <ComboboxButton
                class="absolute inset-y-0 right-0 flex items-center pr-2"
              >
                <ChevronDown
                  class="h-5 w-5 text-tertiary-600"
                  aria-hidden="true"
                />
              </ComboboxButton>
            </div>
            <TransitionRoot
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              @after-leave="query = ''"
            >
              <ComboboxOptions
                class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-tertiary-300 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              >
                <div
                  v-if="filteredPeople.length === 0 && query !== ''"
                  class="relative cursor-default select-none py-2 px-4 text-tertiary-600"
                >
                  Nothing found.
                </div>
      
                <ComboboxOption
                  v-for="person in filteredPeople"
                  as="template"
                  :key="person.name"
                  :value="person"
                  v-slot="{ selected, active }"
                >
                  <li
                    class="relative cursor-default select-none py-2 pl-10 pr-4"
                    :class="{
                      'bg-tertiary-400 text-tertiary-600': active,
                      'text-tertiary-600': !active,
                    }"
                  >
                    <span
                      class="block truncate"
                      :class="{ 'font-medium': selected, 'font-normal': !selected }"
                    >
                      {{ person.name }}
                    </span>
                    <span
                      v-if="selected"
                      class="absolute inset-y-0 left-0 flex items-center pl-3"
                      :class="{ 'text-tertiary-600': active, '': !active }"
                    >
                      <Check class="h-5 w-5" aria-hidden="true" />
                    </span>
                  </li>
                </ComboboxOption>
              </ComboboxOptions>
            </TransitionRoot>
          </div>
        </Combobox>
    </div>
    <div class="w-40" v-else-if="type === 'small'">
        <Combobox v-model="selected"  >
          <div class="relative mt-1">
            <div
              class="relative outline-none border-none w-full ring-2 ring-transparent cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md sm:text-sm"
            >
              <ComboboxInput
              class="w-full outline-transparent outline-8 -outline-offset-2 border-none py-2 pl-3 pr-10 ring-2 ring-transparent text-sm leading-5 bg-tertiary-400 text-tertiary-600 focus:outline-tertiary-500"
                :displayValue="(person:any) => person.name"
                @change="query = $event.target.value"
              />
              <ComboboxButton
                class="absolute inset-y-0 right-0 flex items-center pr-2"
              >
                <ChevronDown
                  class="h-5 w-5 text-tertiary-600"
                  aria-hidden="true"
                />
              </ComboboxButton>
            </div>
            <TransitionRoot
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              @after-leave="query = ''"
            >
              <ComboboxOptions
                class="absolute mt-1 bg-tertiary-300 max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              >
                <div
                  v-if="filteredPeople.length === 0 && query !== ''"
                  class="relative cursor-default select-none py-2 px-4 text-gray-700"
                >
                  Nothing found.
                </div>
      
                <ComboboxOption
                  v-for="person in filteredPeople"
                  as="template"
                  :key="person.name"
                  :value="person"
                  v-slot="{ selected, active }"
                >
                  <li
                    class="relative cursor-default select-none py-2 pl-10 pr-4"
                    :class="{
                      'bg-tertiary-400 text-tertiary-600': active,
                      'text-gray-900': !active,
                    }"
                  >
                    <span
                      class="block truncate"
                      :class="{ 'font-medium': selected, 'font-normal': !selected }"
                    >
                      {{ person.name }}
                    </span>
                    <span
                      v-if="selected"
                      class="absolute inset-y-0 left-0 flex items-center pl-3"
                      :class="{ 'text-tertiary-600': active, '': !active }"
                    >
                      <Check class="h-5 w-5 text-tertiary-600" aria-hidden="true" />
                    </span>
                  </li>
                </ComboboxOption>
              </ComboboxOptions>
            </TransitionRoot>
          </div>
        </Combobox>
    </div>
</template>
