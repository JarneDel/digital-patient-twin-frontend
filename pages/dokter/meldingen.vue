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
  `/dokter/${user?.localAccountId}/patients`,
  {
    baseURL: servicesUrls.dokterService,
    server: false,
  },
)

const selectedPatient = ref<string>('')
const filteredPatients = computed<PatientGegevens[]>( () => {
  console.log("computing selected patient")
  if (!patienten.value) return []
  // filter by selected patient
  if (selectedPatient.value === '' || "Alle patiënten") return patienten.value
  const patient = patienten.value.find((patient: PatientGegevens): boolean => {
    return (
      `${patient.algemeen?.voornaam} ${patient.algemeen?.naam}` ===
      selectedPatient.value
    )
  }) as PatientGegevens
  return [patient]
})

watch(filteredPatients, (newVal) => {
  console.log(newVal, "filtered patients changed")
})


// pinnedPatients is a list of patienten that are pinned to the top of the list
// meldingen is a list of alerts that are shown on the page
const meldingen = ref<IMelding[]>([
  {
    id: "1",
    name: 'Joshy Jonkheere',
    time: new Date(Date.now() - 6 * 1000),
    type: AlertType.heartRate,
    value: '95/120',
    level: 'danger',
    dateOfBirth: '01/01/1980',
    patientId: '878c95cf-e82d-40a5-a56c-8790427f1657',
  },
  {
    id: "2",
    name: 'Joshy Jonkheere',
    time: new Date(Date.now() - 2 * 60 * 60 * 1000),
    type: AlertType.temperature,
    value: '37',
    level: 'danger',
    dateOfBirth: '01/01/1980',
    patientId: '878c95cf-e82d-40a5-a56c-8790427f1657',
  },
  {
    id: "3",
    name: 'Franky De Koek',
    time: new Date(Date.now() - 3 * 60 * 60 * 1000),
    type: AlertType.oxygen,
    value: '95',
    level: 'warning',
    dateOfBirth: '01/01/1980',
    patientId: '16da7d6d-09b5-40b3-9ba4-41492a4c99f7',
  },
])

const patientNamen = computed(() => {
  if (!patienten.value) return []
  const namen =  patienten.value.map(patient => {
    return `${patient.algemeen?.voornaam} ${patient.algemeen?.naam}`
  })
  return ["Alle patiënten", ...namen]
})

const selectedPatientObject = computed((): PatientGegevens => {
  if (!patienten.value) return {} as PatientGegevens
  if (selectedPatient.value === "Alle patiënten") return {} as PatientGegevens
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
const AlertSeverity = ref(['Alles', 'Laag', 'Matig', 'Kritisch'])
const selectedSeverity = ref<string>('Alles')
const selectedSeverityEn = computed(()=> {
  switch (selectedSeverity.value) {
    case 'Alles':
      return 'Alles'
    case 'Laag':
      return 'low'
    case 'Matig':
      return 'moderate'
    case 'Kritisch':
      return 'critical'
    default:
      return 'all'
  }
})

const selectedType = ref<string>('Alles')
watch(selectedType, value => {
  console.log(value)
})

const alertsFiltered = computed(() => {
  return meldingen.value.filter(alert => {

    const isTypeMatch = selectedType.value === 'Alles' || alert.type === selectedType.value
    const isSeverityMatch = selectedSeverity.value === 'Alles' || alert.level === selectedSeverity.value
    const isPatientMatch = selectedPatient.value === 'Alle patiënten' || (selectedPatientObject.value && alert.patientId === selectedPatientObject.value.id);
    return isTypeMatch && isSeverityMatch && isPatientMatch
  });
})

watch(patientNamen, (newVal) => {
  console.log(newVal, "patient namen changed")
})

watch(selectedSeverity, (newVal) => {
  console.log(newVal, "selected type changed")
})

</script>

<template>
  <div class="mx-auto max-w-[67rem]">
    <h2 class="mx-8 mb-8 mt-6 text-3xl font-semibold">Meldingen</h2>
    <div class="mx-5 my-8 flex content-center justify-between">
      <div class="flex items-center gap-x-4">
        <pressables-search
          type='small'
          v-model:selected='selectedPatient'
          :options='patientNamen'
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
