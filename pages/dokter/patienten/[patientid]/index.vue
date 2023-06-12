<script setup lang='ts'>
// fetch data from the server
const routeID = useRoute().params.dokterid as string
// string | string[] => string
const id = ref("878c95cf-e82d-40a5-a56c-8790427f1657")
const patientNaam = ref("Test Patient")

useHead({
  title: `Vitalen ${patientNaam.value}`,
  // title: 'Vitalen patiënt',
  meta: [
    {
      name: 'description',
      content: 'Detailpage van de realtime data van de patiënt',
    },
  ],
})
// const url = "https://industryprojectsignalr.service.signalr.net/client/?hub=IndustryProjectSignalr"
// useSignalR(url)

</script>

<template>
  <pressables-goback/>
  <text-kop2 class='mx-8 mb-2'>Vitalen {{patientNaam}}</text-kop2>
  <client-only>
    <grafieken :for='id' />
  </client-only>

</template>

<style scoped>

</style>