<script setup lang="ts">

    import Slider from '@vueform/slider'
    import { ref } from "vue";

    const value = ref([30, 60])

    defineExpose({ value })


</script>

<template>
    <div class="w-52 flex justify-between m-4">
        <input v-model=value[0] type="text" class="h-10 w-10 text-sm pl-2 border-tertiary-400 border-2 rounded-md focus:border-tertiary-400 focus:ring-0"/>
        <input v-model=value[1] type="text" class="h-10 w-10 text-sm pl-2 border-tertiary-400 border-2 rounded-md focus:border-tertiary-400 focus:ring-0"/>
    </div>
    <div class="m-4 w-52">
        <Slider v-model=value :tooltips="false" :min="0" :max="100" class='slider-style' />
    </div>
</template>
    
  
<style src="@vueform/slider/themes/default.css"></style>

<style scoped>
  .slider-style{
    --slider-connect-bg: #AD9FCA;
    --slider-handle-ring-color: #AD9FCA30;
    --slider-handle-bg: #927FB8;
  }
</style>