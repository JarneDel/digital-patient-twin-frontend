<script setup lang='ts'>
import Slider from '@vueform/slider'


const props = defineProps({
  min: {
    type: Number,
    required: true,
  },
  max: {
    type: Number,
    required: true,
  },
  modelValue: {
    type: Array,
    required: true,
  },
  step: {
    type: Number,
    required: false,
    default: 1,
  },
})
const emits = defineEmits([
  'update:modelValue',
  'change',
])

const updateLowerValue = (low: number) => {
  let newValue = [...props.modelValue]
  newValue[0] = low
  emits('update:modelValue', newValue)
}
const updateUpperValue = (high: number) => {
  let newValue = [...props.modelValue]
  newValue[1] = high
  emits('update:modelValue', newValue)
}


// defineExpose({ value, value_1 })
</script>

<template>
  <div class=' mt-1  flex w-52 justify-between'>
    <input
      :value='modelValue[0]'
      @input="updateLowerValue($event.target.value)"
      @change='$emit("change", $event)'
      type='number'
      class='h-8 rounded-md border-2 border-tertiary-400 pl-[4px] text-sm outline-none focus:border-tertiary-400 focus:ring-0'
      :class='step < 1 ? "w-16" : "w-12"'
      :step='step'

    />
    <input
      :value='modelValue[1]'
      @input="updateUpperValue($event.target.value)"
      @change='$emit("change", $event)'
      type='number'
      class='h-8 rounded-md border-2 border-tertiary-400 pl-[4px] text-sm outline-none focus:border-tertiary-400 focus:ring-0'
      :class='step < 1 ? "w-16" : "w-12"'
      :step='step'
    />
  </div>
  <div class='mb-4 mt-3 w-52'>
    <Slider
      :modelValue='modelValue'
      @update:modelValue='$emit("update:modelValue", $event)'
      @change='$emit("change", $event)'
      :tooltips='false'
      :lazy='false'
      :min='min'
      :max='max'
      :step='step'
      class='slider-style'
    />
  </div>

</template>

<style src='@vueform/slider/themes/default.css'></style>

<style scoped>
.slider-style {
  --slider-connect-bg: #ad9fca;
  --slider-handle-ring-color: #ad9fca30;
  --slider-handle-bg: #927fb8;
}
</style>
