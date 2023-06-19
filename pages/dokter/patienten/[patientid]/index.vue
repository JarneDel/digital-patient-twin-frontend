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
useTitle('Vitalen ' + patient.value?.algemeen.voornaam + " " + patient.value?.algemeen.naam, "Detailpage van de realtime data van de patiënt")
</script>

<template>
  <div class="md:mx-20 my-12 mx-8">
    <text-kop2 v-if='patient' class='mt-5 mb-2 text-3xl font-semibold text-neutral-800'>Vitalen {{ patient.algemeen.voornaam }} {{ patient.algemeen.naam}}</text-kop2>
    <client-only>
      <grafieken :for='id' />
    </client-only>
  </div>
</template>

<style scoped></style>