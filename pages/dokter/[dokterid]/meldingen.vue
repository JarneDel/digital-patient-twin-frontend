<script setup lang="ts">
import { PatientGegevens } from '~/interfaces/IPatient'
import { AlertType, IMelding } from '~/interfaces/AlertType'

const patienten = ref<PatientGegevens[]>([
  {
    adres: {
      gemeente: 'Gent',
      straat: 'Sint-Pietersnieuwstraat',
      postcode: 9000,
      nr: '25',
    },
    algemeen: {
      geboorteDatum: new Date(1999, 5, 30),
      id: 3,
      naam: 'De Koek',
      geslacht: 'Anders',
      voornaam: 'Frankie',
    },
    contact: {
      email: 'Frankie.de.koek@domain.org',
      telefoon: '0470 12 34 56',
    },
    medisch: {
      bloedgroep: 'A+',
      gewicht: 75,
      lengte: 1.75,
    },
    createdBy: 'Dokter Mertens',
    deviceId: '123456789',
    id: '3',
    profilePictureUrl: 'https://i.pravatar.cc/300?u=234',
  },
  {
    adres: {
      gemeente: 'Brussel',
      straat: 'Rue de la Loi',
      postcode: 1000,
      nr: '16',
    },
    algemeen: {
      geboorteDatum: new Date(1985, 11, 17),
      id: 1,
      naam: 'Jonckheere',
      geslacht: 'Man',
      voornaam: 'Joshy',
    },
    contact: {
      email: 'jean.dupont@domain.org',
      telefoon: '02 123 45 67',
    },
    medisch: {
      bloedgroep: 'B+',
      gewicht: 80,
      lengte: 1.85,
    },
    createdBy: 'Dr. Smith',
    deviceId: '987654321',
    id: '1',
    profilePictureUrl: 'https://i.pravatar.cc/300?u=123',
  },
])
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
  <div class="mx-auto max-w-[58rem]">
    <h2 class="mx-8 mb-8 mt-6 text-xl font-semibold">Meldingen</h2>
    <div class="mx-5 my-8 flex content-center justify-between">
      <div class="flex items-center gap-x-4">
        <pressables-drop-down-selector
          type="searchable"
          :options="patientNamen"
          v-model:selected="selectedPatient"
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
      />
    </div>
  </div>
</template>

<style scoped></style>
