<script setup lang='ts'>
import { LucideChevronDown, LucideX } from 'lucide-vue-next'
import Button from '~/components/pressables/button.vue'


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
const emits = defineEmits(['update:selected'])
const isOpen = ref(false)
const isHidden = ref(true)
watch(isOpen, value => {
  if (value) {
    isHidden.value = false
  } else {
    setTimeout(() => {
      isHidden.value = true
    }, 300)
  }
})

const input = ref('')

watch(input, value => {
  if (value === '') {
    isSubmitted.value = false
  }
  else{
    isOpen.value = true
  }
})

const search = computed(() => {
  if (input.value === '') return props.options

  return props.options.filter(option => {
    return option.toLowerCase().includes(input.value.toLowerCase())
  })
})

const isSubmitted = ref(false)

</script>

<template>
  <div class='relative w-fit'>
    <button
      class='flex w-[10rem] flex-row justify-between rounded-lg bg-tertiary-300 p-2 transition-colors'
      :class='{"bg-tertiary-500 ": input === selected && type === "searchable" && isSubmitted}'
      @click='isOpen = !isOpen'
    >
      <div v-if='type === "default"' class='pl-2'>{{ selected }}</div>
      <div v-else-if='type === "searchable"' class='pl-2 relative w-full' >
        <input
          type='text'
          class='bg-transparent border-none outline-none '
          placeholder='Search'
          :value='input'
          @input='input = $event.target.value'
          @keydown.enter="
            () => {
              if (search.length === 0) return
              if (!input in options) return
              $emit('update:selected', search[0])
              isSubmitted = true
              isOpen = false
            }"
        />
        <button v-if='isSubmitted'
                class='absolute right-0 top-0  transition-all duration-300 ease-out'
                @click="
              () => {
                $emit('update:selected', '')
                input = ''
                isSubmitted = false
                isOpen = false
              }
            ">
          <lucide-x
            class='transition-transform'
            :class="isOpen ? 'rotate-180' : ''"

          />
        </button>

      </div>
      <lucide-chevron-down
        class='transition-transform'
        :class="isOpen ? 'rotate-180' : ''"
      />
    </button>
    <div class='z-10 absolute pt-0.5'>
      <div
        class='flex w-[10rem] flex-col rounded-lg bg-tertiary-300 transition-all duration-300 ease-out'
        :class="
          isOpen ? 'max-h-[10rem] overflow-y-auto' : 'max-h-0 overflow-hidden'
        "
      >
        <button
          v-if='!isHidden'
          v-for='(option, index) in search'
          :key='option'
          @click="
            () => {
              $emit('update:selected', option)
              input = option
              isSubmitted = true
              isOpen = false
            }
          "
          class='p-2 transition-all duration-300 ease-out'
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
      </div>
    </div>
  </div>
</template>

<style scoped></style>
