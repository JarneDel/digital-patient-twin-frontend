<script lang='ts'>
export default defineComponent({
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    inputId: {
      type: String,
      required: true,
    },
  },
  emits: ['update:modelValue'],

})

</script>

<template>
<label :id='inputId'>{{ label }}</label>
<textarea
  :value="modelValue"
  @change="$emit('update:modelValue', $event.target.value)"
  :id="inputId"
  class="peer block h-fit w-full appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:outline-none focus:ring-0 focus:ring-tertiary-300 resize-y"
  rows='2'
/>
</template>

<style scoped>

</style>