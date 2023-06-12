<script setup lang="ts">
import { PatientGegevens } from '~/interfaces/IPatient'
import { AlertType, IMelding } from '~/interfaces/AlertType'
import { servicesUrls } from '~/servicesurls'

useHead({
  title: 'Meldingen',
  meta: [
    {
      name: 'description',
      content: 'Meldingen pagina. Bekijk alle meldingen van patiënten.',
    },
  ],
})

const user = useUser().value
// get patienten by dokterid

const { pending: patientenPending, data: patienten, error: patientenError } = useFetch<PatientGegevens[]>(
  `/dokter/${user?.localAccountId}/patienten`,
  {
    baseURL: servicesUrls.dokterService,
    server: false,
  },
)


// pinnedPatients is a list of patienten that are pinned to the top of the list
// meldingen is a list of alerts that are shown on the page
const meldingen = ref<IMelding[]>([
  {
    id: 1,
    name: 'Joshy Jonkheere',
    time: new Date(Date.now() - 6 * 1000),
    type: AlertType.heartRate,
    value: '95/120',
    level: 'danger',
    dateOfBirth: '01/01/1980',
    patientId: '1',
  },
  {
    id: 2,
    name: 'Joshy Jonkheere',
    time: new Date(Date.now() - 2 * 60 * 60 * 1000),
    type: AlertType.temperature,
    value: '37',
    level: 'danger',
    dateOfBirth: '01/01/1980',
    patientId: '1',
  },
  {
    id: 3,
    name: 'Franky De Koek',
    time: new Date(Date.now() - 3 * 60 * 60 * 1000),
    type: AlertType.oxygen,
    value: '95',
    level: 'warning',
    dateOfBirth: '01/01/1980',
    patientId: '3',
  },
])

const patientNamen = computed(() => {
  return patienten.value.map(patient => {
    return `${patient.algemeen?.voornaam} ${patient.algemeen?.naam}`
  })
})
const selectedPatient = ref<string>('')

const selectedPatientObject = computed((): PatientGegevens => {
  return patienten.value.find((patient: PatientGegevens): boolean => {
    return (
      `${patient.algemeen?.voornaam} ${patient.algemeen?.naam}` ===
      selectedPatient.value
    )
  }) as PatientGegevens
})
const AlertTypes = [
  'Alles',
  'Bloeddruk',
  'Hartslag',
  'Temperatuur',
  'Bloedzuurstof',
  'Ademfrequentie',
]
const AlertSeverity = ['Alles', 'Laag', 'Matig', 'Kritisch']
const selectedSeverity = ref<string>('Alles')
const selectedType = ref<string>('Alles')
watch(selectedType, value => {
  console.log(value)
})

const alertsFiltered = computed(() => {
  return meldingen.value.filter(alert => {
    if (selectedPatient.value === '') {
      return true
    }
    return alert.patientId === selectedPatientObject.value.id
  })
})
</script>

<template>
  <div class="mx-auto max-w-[67rem]">
    <h2 class="mx-8 mb-8 mt-6 text-3xl font-semibold">Meldingen</h2>
    <div class="mx-5 my-8 flex content-center justify-between">
      <div class="flex items-center gap-x-4">
        <pressables-drop-down-selector
          v-if='patienten'
          v-model:selected='selectedPatient'
          :options='patienten.map(patient => `${patient.algemeen?.voornaam} ${patient.algemeen?.naam}`)'
          type='searchable'
        />
        <pressables-drop-down-selector
          type="default"
          :options="AlertTypes"
          v-model:selected="selectedType"
        />
      </div>
      <PressablesSelector
        v-model:selected="selectedSeverity"
        :options="AlertSeverity"
      />
      <!--     Alerts container     -->
    </div>
    <div>
      <alerts-lg
        v-for="alert of alertsFiltered"
        :key="alert.id"
        :alert="alert"
        v-bind:type="alert.type"
      />
    </div>
  </div>
</template>
