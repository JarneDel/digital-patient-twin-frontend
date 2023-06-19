
<script setup lang="ts">

const emits = defineEmits(['click'])

const click = () => {
  emits('click')
}
</script>


<template>
    <button
      type="submit"
      class="duration-400 m-2 w-10 min-w-max rounded-lg bg-tertiary-100/30 p-5 border border-transparent ring-2 ring-tertiary-300 transition-all hover:cursor-pointer hover:bg-tertiary-200/40 outline-none focus-visible:ring-tertiary-500"
      @click="click"
    >
      <svg-save-icon class="text-tertiary-600"/>
    </button>
</template>

