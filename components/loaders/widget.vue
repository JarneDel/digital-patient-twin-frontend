<script setup lang='ts'>
defineProps({
  height: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div role="status" class='animate-pulse m-2' :style="`max-width: ${width}; padding: ${parseInt(width) * 0.04}px; border: ${parseInt(width) * 0.005}px solid rgb(212, 212, 216); border-radius: ${parseInt(width) * 0.05}px; box-shadow: 0 ${parseInt(width) * 0.02}px ${parseInt(width) * 0.1}px rgb(212, 212, 216, 0.1);`">
    <div :style="`height: ${parseInt(height) * 0.025}px; background-color: #ccc; border-radius: ${parseInt(height) * 0.0125}px; width: ${parseInt(width) * 0.32}px; margin-bottom: ${parseInt(height) * 0.025}px;`"></div>
    <div :style="`width: ${parseInt(width) * 0.48}px; height: ${parseInt(height) * 0.02}px; margin-bottom: ${parseInt(height) * 0.1}px; background-color: #ccc; border-radius: ${parseInt(height) * 0.01}px;`"></div>
    <div class="flex items-baseline mt-4 space-x-6">
      <div :style="`width: 100%; background-color: #ccc; border-radius: ${parseInt(height) * 0.05}px; height: ${parseInt(height) * 0.36}px;`"></div>
      <div :style="`width: 100%; height: ${parseInt(height) * 0.28}px; background-color: #ccc; border-radius: ${parseInt(height) * 0.04}px;`"></div>
      <div :style="`width: 100%; background-color: #ccc; border-radius: ${parseInt(height) * 0.05}px; height: ${parseInt(height) * 0.36}px;`"></div>
      <div :style="`width: 100%; height: ${parseInt(height) * 0.32}px; background-color: #ccc; border-radius: ${parseInt(height) * 0.045}px;`"></div>
      <div :style="`width: 100%; background-color: #ccc; border-radius: ${parseInt(height) * 0.05}px; height: ${parseInt(height) * 0.4}px;`"></div>
      <div :style="`width: 100%; background-color: #ccc; border-radius: ${parseInt(height) * 0.05}px; height: ${parseInt(height) * 0.36}px;`"></div>
      <div :style="`width: 100%; background-color: #ccc; border-radius: ${parseInt(height) * 0.05}px; height: ${parseInt(height) * 0.4}px;`"></div>
    </div>
    <span class="sr-only">Loading...</span>
  </div>
</template>

<style scoped>

</style>
