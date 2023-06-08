<script setup lang='ts'>
// fetch data from the server
const routeID = useRoute().params.dokterid as string
// string | string[] => string
const id = ref(routeID)
id.value = "878c95cf-e82d-40a5-a56c-8790427f1657"
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


</script>

<template>
  <pressables-goback/>
  <text-kop2>Vitalen {{patientNaam}}</text-kop2>
    <grafieken :for='id'/>

</template>

<style scoped>

</style>