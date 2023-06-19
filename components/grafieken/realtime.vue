<script setup lang='ts'>
const props = defineProps({
  data: {
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class='mx-2'>
    <!--    one row, multiple cols, format: min: value unit | gemiddelde: | value unit | max: value: unit-->
    <div
      class='inline-flex flex-row gap-4 rounded-md bg-neutral-600 p-2 drop-shadow-md font-medium text-neutral-800'
    >
      <div>nu: {{ data }} {{ unit }}</div>
    </div>
  </div>
</template>

<style scoped>

</style>