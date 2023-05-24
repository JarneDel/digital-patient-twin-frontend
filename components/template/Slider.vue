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
        <Slider v-model="value_1" :tooltips="false" :min="0" :max="100" :classes="{
            base: 'w-full h-full relative z-1 bg-gray-300 rounded',
            connect: 'absolute z-1 top-0 right-0 transform-origin-0 transform-style-flat h-full w-full bg-pink-500 cursor-pointer tap:duration-300 tap:transition-transform disabled:bg-gray-400 disabled:cursor-not-allowed',

        }"/>
    </div>
    <div class="mt-4">
        <Slider v-model="value_2" :tooltips="false" :min="0" :max="100" :classes="{
            base: 'w-full h-full relative z-1 bg-neutral-300 rounded',
        }"/>
    </div>
</template>
    
  
<style src="@vueform/slider/themes/default.css"></style>