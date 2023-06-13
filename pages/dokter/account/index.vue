<script setup lang='ts'>
useHead({
  title: 'Je account',
  meta: [
    {
      name: 'description',
      content: 'Je accountgegevens.',
    },
  ],
})
</script>

<template>
  <div>hallo</div>
  <div>{{ useUser() }}</div>
  <div>{{ useUser().value?.idTokenClaims?.name }}</div>
  <div>{{ useUser().value?.idTokenClaims?.preferred_username }}</div>
</template>

<style scoped>

</style>