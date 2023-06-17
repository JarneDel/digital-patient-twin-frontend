<script setup lang='ts'>
const value = ref([0, 100])
</script>

<template>
<template-slider
  v-model='value'
  :min='0'
  :max='100'
/>

</template>

<style scoped>

</style>