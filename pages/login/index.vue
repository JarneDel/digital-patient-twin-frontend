<script setup lang='ts'>
import { msalInstance } from '~/auth'

definePageMeta({
  layout: false,
})

let timeout: string | number | NodeJS.Timeout | undefined;
if (process.client) {
  const users = msalInstance.getAllAccounts()
  console.log(users.length, 'users in login')
  if (users.length !== 0) {
    navigateTo('/')
  }
  timeout = setTimeout(() => {
    const users = msalInstance.getAllAccounts()
    console.log("getting users", users.length)
    if (users.length > 0) {
      navigateTo('/')
    }
  }, 1000)

}

onUnmounted(() => {
  clearTimeout(timeout)
})


const login = async () => {
  const result = await msalInstance.loginPopup()
    console.log({ result })
    navigateTo(`/`)
}


useHead({
  title: 'Login | Digital Patient Twin',
  meta: [
    {
      name: 'description',
      content: 'Login to your account',
    },
  ],
})
</script>

<template>
  <templateHeader />
  <background-achtergrond class='absolute bottom-[0%] opacity-60 left-0 right-0 w-full'></background-achtergrond>
  <div class="flex justify-center ">
    <cards-login @click='login'/>
  </div>
</template>