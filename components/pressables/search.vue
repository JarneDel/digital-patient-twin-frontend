<script setup lang='ts'>
import { ref, defineProps } from 'vue'
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from '@headlessui/vue'
import { Check, ChevronDown } from 'lucide-vue-next'

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
const emits = defineEmits(['update:selected'])

const opt = computed(() =>
  props.options.map((name) => ({
    name,
  })),
)
const selected = ref(opt.value[0])

watch(opt, (newVal) => {
  selected.value = newVal[0]
})
watch(selected, (newVal) => {
  emits('update:selected', newVal.name)
})

const query = ref('')

const filteredPeople = computed(() => {
  if (query.value === '') {
    return opt.value
  } else {
    return opt.value.filter((person) =>
      person.name.toLowerCase().includes(query.value.toLowerCase()),
    )
  }
})

</script>

<template>
  <div :class='{
      "w-72": type === "small",
      "w-96": type === "medium",
    }'>
    <Combobox v-model='selected'>
      <div class='relative mt-1'>
        <div
          class='relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'
        >
          <ComboboxInput
            class='w-full cursor-default rounded-lg bg-tertiary-100/30 border border-tertiary-400 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-tertiary-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-tertiary-500 sm:text-sm'
            :displayValue='(person:any) => person.name'
            @change='query = $event.target.value'
          />
          <ComboboxButton
            class='absolute inset-y-0 right-0 flex items-center pr-2'
          >
            <ChevronDown
              class='h-5 w-5 text-tertiary-600'
              aria-hidden='true'
            />
          </ComboboxButton>
        </div>
        <TransitionRoot
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
          @after-leave="query = ''"
        >
          <ComboboxOptions
            class='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-tertiary-20 border shadow-tertiary-100 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
          >
            <div
              v-if="filteredPeople.length === 0 && query !== ''"
              class='relative cursor-default select-none py-2 px-4 text-tertiary-600'
            >
              Nothing found.
            </div>

            <ComboboxOption
              v-for='person in filteredPeople'
              as='template'
              :key='person.name'
              :value='person'
              v-slot='{ selected, active }'
            >
              <li
                class='relative cursor-default select-none py-2 pl-10 pr-4'
                :class="{
                      'bg-tertiary-300 text-tertiary-600': active,
                      'text-gray-900': !active,
                    }"
              >
                    <span
                      class='block truncate'
                      :class="{ 'font-medium': selected, 'font-normal': !selected }"
                    >
                      {{ person.name }}
                    </span>
                <span
                  v-if='selected'
                  class='absolute inset-y-0 left-0 flex items-center pl-3'
                  :class="{ 'text-tertiary-600': active, '': !active }"
                >
                      <Check class='h-5 w-5' aria-hidden='true' />
                    </span>
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </TransitionRoot>
      </div>
    </Combobox>
  </div>
</template>
