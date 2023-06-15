<script lang="ts" setup>
import { AlertType, IMelding } from '~/interfaces/AlertType'
import { IPatientAlgemeen, PatientGegevens } from '~/interfaces/IPatient'
import { AccountInfo } from '@azure/msal-browser'
import { servicesUrls } from '~/servicesurls'
import { $fetch, FetchError, ofetch } from 'ofetch'
import { useUser } from '~/composables/useUser'
import { LucideChevronRight, LucidePin } from 'lucide-vue-next'

const isLoggedIn = ref(false)

let userValue: AccountInfo | null = null
if (process.client) {
  const user = useUser()
  if (user.value !== null) {
    isLoggedIn.value = true
  }
}

const user = useUser()

useHead({
  title: 'Home',
  meta: [
    {
      name: 'description',
      content: 'Welkom op de homepage.',
    },
  ],
})

const {
  data: pinnedPatients,
  error: pinnedPatientsError,
  pending: pendingPinnedPatients,
} = useFetch<PatientGegevens[]>(
  `/dokter/${user.value?.localAccountId}/pinned`,
  {
    baseURL: servicesUrls.dokterService,
    server: false,
  },
)

watch(pinnedPatients, newVal => {
  console.log(newVal)
})

const gebruiker = ref('Dokter Mertens')
const meldingen = ref<IMelding[]>([
  {
    id: '1',
    name: 'Joshy Jonkheere',
    time: new Date(Date.now() - 6 * 1000),
    type: AlertType.Bloeddruk,
    value: '95/120',
    level: 'danger',
    birthDate: '01/01/1980',
    patientId: '1',
  },
  {
    id: '2',
    name: 'Joshy Jonkheere',
    time: new Date(Date.now() - 2 * 60 * 60 * 1000),
    type: AlertType.Temperatuur,
    value: '37',
    level: 'danger',
    birthDate: '01/01/1980',
    patientId: '1',
  },
  {
    id: '3',
    name: 'Joshy Jonkheere',
    time: new Date(Date.now() - 3 * 60 * 60 * 1000),
    type: AlertType.Bloedzuurstof,
    value: '95',
    level: 'warning',
    birthDate: '01/01/1980',
    patientId: '1',
  },
])

const removeFromList = (id: string) => {
  console.log(id)
  meldingen.value = meldingen.value.filter(melding => melding.id !== id)
}
const unpin = async (id: string) => {
  // send request to backend

  // TODO: user can undo this action
  if (pinnedPatients.value === null) return
  $fetch(`/dokter/${user.value?.localAccountId}/patient/${id}/pin`, {
    method: 'DELETE',
    baseURL: servicesUrls.dokterService,
  }).then(
    () => {
      removeFromList(id)
    },
    (err: FetchError) => {
      console.log(err)
    },
  )

  pinnedPatients.value = pinnedPatients.value.filter(
    patient => patient.id !== id,
  )
}
</script>

<template>
  <div class="mx-auto my-12 max-w-[67rem]">
    <h2 v-if="user !== null" class="mx-8 mb-8 mt-6 text-3xl font-semibold">
      Welkom, {{ user?.name }}
    </h2>
    <!--    Grid container -->
    <div
      class="mx-8 flex grid-flow-col grid-cols-[max-content,_max-content] grid-rows-[min-content,_1fr] flex-col gap-4 gap-x-8 xl:grid 2xl:gap-x-16"
    >
      <!--      Title Left      -->
      <TextKop2>Gepinde Patiënten</TextKop2>
      <!--      Content Left      -->
      <div
        v-if="pinnedPatients !== null && pinnedPatients.length > 0"
        class="flex flex-col gap-4"
      >
        <patients-sm
          v-for="patient of pinnedPatients"
          :key="patient.id"
          :patient="patient.algemeen"
          @unpin="unpin(patient.id)"
        />
      </div>
      <div v-else class="w-[34.375rem]">
        <TextKop3>Er zijn nog geen gepinde patiënten</TextKop3>
        <PressablesButton
          class="mt-2 hover:underline"
          @click="() => navigateTo('/dokter/patienten')"
        >
          <svg-pinrotated class="rotate-270 mr-2 h-8 w-8"></svg-pinrotated>

          <span class="mr-1 text-lg"> Pin een patiënt </span>
          <!--          <LucideChevronRight class='w-6 h-6 ml-2' />-->
        </PressablesButton>
      </div>
      <!--      Title Right      -->
      <TextKop2>Ernstige meldingen</TextKop2>

      <!--      Content right    -->
      <div class="flex max-w-[30rem] flex-col gap-4">
        <AlertsPinned
          v-for="melding of meldingen"
          :key="melding.id"
          :datetime="melding.time"
          :level="melding.level"
          :name="melding.name"
          :type="melding.type"
          :value="melding.value"
          @remove="removeFromList(melding.id)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
