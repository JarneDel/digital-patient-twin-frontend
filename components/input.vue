<script lang='ts' setup>
const props = defineProps({
  value: {
    type: String,
    required: true,
  },
  isValid: {
    type: Boolean,
    required: false,
    default: true,
  },
})
const emits = defineEmits(['update:input', 'update:isValid'])

watch(props, (newValue) => {
  console.log(newValue)

  emits('update:isValid', false)


  // FORM VALIDATION
})


</script>

<template>
  <label></label>
  <input
    v-model='value'
    type='text'
    value=''>
  </input>

</template>

<style scoped>

</style>