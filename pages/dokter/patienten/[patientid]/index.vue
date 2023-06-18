<script lang='ts' setup>
// fetch data from the server
import { PatientGegevens } from '~/interfaces/IPatient'

const routeID = useRoute().params.dokterid as string
// string | string[] => string
const id = ref('878c95cf-e82d-40a5-a56c-8790427f1657')
if (routeID){
  console.log(routeID)
  id.value = routeID
}

const { data: patient } = useFetch<PatientGegevens>(
  id.value,
  {
    baseURL: "https://patientgegevens.blackdune-2fd1ec46.northeurope.azurecontainerapps.io/patient/",
    server: false,
  },
)

const patientNaam = ref('Test Patient')
useHead({
  title: `Vitalen ${patient.value?.algemeen.voornaam} ${patient.value?.algemeen.naam}`,
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

  <text-kop2 v-if='patient' class='mx-auto mb-2 mt-5 max-w-7xl'>Vitalen {{ patient.algemeen.voornaam }} {{ patient.algemeen.naam}}</text-kop2>
  <client-only>
    <grafieken :for='id' />
  </client-only>
</template>

<style scoped></style>