<script>
    import Slider from '@vueform/slider'

    export default {
        components: {
            Slider,
        },
        data() {
            return {
                value: 20
            }
        }
    }
</script>

<template>
    <div>
        <Slider v-model="value" :tooltips="false" :min="0" :max="100"/>
    </div>
</template>
    
  
<style src="@vueform/slider/themes/default.css"></style>