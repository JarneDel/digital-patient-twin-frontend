<script>
    import Slider from '@vueform/slider'

    export default {
        components: {
            Slider,
        },
        data() {
            return {
                value_1: [20, 40],
                value_2: 20
            }
        }
    }
</script>

<template>
    <div class="mb-4">
        <Slider v-model="value_1" :tooltips="false" :min="0" :max="100" class='slider-pink' />
    </div>
    <div class="mt-4">
        <Slider v-model="value_2" :tooltips="false" :min="0" :max="100" class='slider-pink'></Slider>
    </div>
</template>
    
  
<style src="@vueform/slider/themes/default.css"></style>

<style scoped>
  .slider-pink{
    --slider-connect-bg: #ff69b4;
    --slider-tooltip-bg: #ff69b4;
    --slider-handle-ring-color: #ff69b430;
  }

</style>