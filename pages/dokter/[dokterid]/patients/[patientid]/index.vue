<script setup lang='ts'>
// fetch data from the server
const routeID = useRoute().params.dokterid as string
// string | string[] => string
const id = ref(routeID)
id.value = "878c95cf-e82d-40a5-a56c-8790427f1657"
const patientNaam = ref("Test Patient")



</script>

<template>
  <pressables-goback/>
  <text-kop2>Vitalen {{patientNaam}}</text-kop2>
  <client-only>

    <grafieken :for='id'/>
  </client-only>

</template>

<style scoped>

</style>