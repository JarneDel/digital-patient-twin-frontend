<script setup lang='ts'>
import {msalInstance} from '~/auth'

  definePageMeta({
    layout: false,
  });

onMounted(() => {
  console.log("mounted")
  const users = msalInstance.getAllAccounts()
  console.log(users.length, "users in login")
  if (users.length !== 0) {
    navigateTo('/')
  }
})


const login = async () => {
    const result = await msalInstance.loginPopup()
    console.log({ result })
    navigateTo(`/`)
}



</script>

<template>
  <templateHeader />
  <background-achtergrond class='absolute bottom-[0%] opacity-60 left-0 right-0 w-full'></background-achtergrond>
  <div class="flex justify-center ">
    <cards-login @click='login'/>
  </div>
</template>

<style scoped>

</style>