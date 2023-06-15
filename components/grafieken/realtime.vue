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
<div>
  <div class="flex flex-col items-center justify-center">
    <div class="text-2xl font-bold text-gray-700">
      {{ data }}
    </div>
    <div class="text-sm text-gray-500">
      {{ unit }}
    </div>
  </div>
</div>
</template>

<style scoped>

</style>