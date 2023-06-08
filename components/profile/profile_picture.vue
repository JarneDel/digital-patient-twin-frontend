<script setup lang="ts">
defineProps({
  imgUrl: {
    type: String,
    required: true,
  },
})

const imgUrl = ref('images/profile.png')
</script>

<template>
  <img :src="imgUrl" alt="" class="mx-auto mb-4" />
</template>

<style scoped></style>
