<script setup lang="ts">
import Slider from '@vueform/slider'
import { ref } from 'vue'
import { AlertType } from '~/interfaces/AlertType'

const value = ref([30, 60])
const value_1 = ref(10)

defineProps({
  type: {
    type: String as PropType<AlertType>,
    required: true,
  },
  min: {
    type: Number,
    required: true,
  },
  max: {
    type: Number,
    required: true,
  },
})

defineExpose({ value, value_1 })
</script>

<template>
  <div class="flex items-end justify-center">
    <div class="mx-3 mb-3 text-base font-medium">{{ type }}</div>
    <div>
      <div class="m-4 flex w-52 justify-between">
        <input
          v-model="value[0]"
          type="text"
          class="h-8 w-9 rounded-md border-2 border-tertiary-400 pl-[4px] text-sm outline-none focus:border-tertiary-400 focus:ring-0"
        />
        <input
          v-model="value[1]"
          type="text"
          class="h-8 w-9 rounded-md border-2 border-tertiary-400 pl-[4px] text-sm outline-none focus:border-tertiary-400 focus:ring-0"
        />
      </div>
      <div class="m-4 w-52">
        <Slider
          v-model="value"
          :tooltips="false"
          :min="min"
          :max="max"
          class="slider-style"
        />
      </div>
    </div>
  </div>

  <!-- <div>
        <div class="w-52 flex justify-between m-4">
            <input v-model=value_1 type="text" class="h-10 w-11 text-sm pl-[7px] border-tertiary-400 border-2 rounded-md focus:border-tertiary-400 focus:ring-0 outline-none"/>
        </div>
        <div class="m-4 w-52">
            <Slider v-model=value_1 :tooltips="false" :min="0" :max="100" class='slider-style' />
        </div>
    </div> -->
</template>

<style src="@vueform/slider/themes/default.css"></style>

<style scoped>
.slider-style {
  --slider-connect-bg: #ad9fca;
  --slider-handle-ring-color: #ad9fca30;
  --slider-handle-bg: #927fb8;
}
</style>
