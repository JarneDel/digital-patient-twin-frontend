<script setup lang='ts'>


import { msalInstance } from '~/auth'
import { useUser } from '~/composables/useUser'

if (process.client) {
  console.log('Running on client')
  const users = msalInstance.getAllAccounts()
  if (users.length === 0) {
    navigateTo('/login')
  }
  useUser().value = users[0]

}

</script>

<template>
  <div>
    <!-- padding for footer height    -->
    <TemplateNavigation>
      <slot />
    </TemplateNavigation>
  </div>
</template>