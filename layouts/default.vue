<script setup lang='ts'>


import { msalInstance } from '~/auth'

onMounted(() => {
  const users = msalInstance.getAllAccounts()
  if (users.length === 0) {
    navigateTo('/login')
  }
})


</script>

<template>
  <div>
    <!-- padding for footer height    -->
    <TemplateNavigation>
      <slot />
    </TemplateNavigation>
  </div>
</template>