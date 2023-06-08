<script setup lang='ts'>
// fetch data from the server
const routeID = useRoute().params.dokterid as string
// string | string[] => string
const id = ref("878c95cf-e82d-40a5-a56c-8790427f1657")
const patientNaam = ref("Test Patient")

// const url = "https://industryprojectsignalr.service.signalr.net/client/?hub=IndustryProjectSignalr"
// useSignalR(url)

</script>

<template>
  <pressables-goback/>
  <text-kop2 class='mx-8 mb-2'>Vitalen {{patientNaam}}</text-kop2>
    <grafieken :for='id'/>

</template>

<style scoped>

</style>