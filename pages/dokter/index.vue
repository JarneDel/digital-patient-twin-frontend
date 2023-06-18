<script lang="ts" setup>
import { AlertLevel, IMelding, AlertType } from '~/interfaces/AlertType'
import { PatientGegevens, IPatientAlgemeen } from '~/interfaces/IPatient'
import { AccountInfo } from '@azure/msal-browser'
import { servicesUrls } from '~/servicesurls'
import { $fetch, FetchContext, FetchError } from 'ofetch'
import { useUser } from '~/composables/useUser'

const isLoggedIn = ref(false)

if (process.client) {
  const user = useUser()
  if (user.value !== null) {
    isLoggedIn.value = true
  }
}

const user = useUser()

const placeHolderAlert = ref<IMelding>({
  id: '1',
  patientId: '1',
  type: AlertType.Bloeddruk,
  value: '1',
  birthDate: '01/01/2000',
  level: AlertLevel.Info,
  timestamp: new Date(),
  fullName: 'name',
})

const placeHolderPatient = ref<IPatientAlgemeen>({
  id: '1',
  voornaam: 'voornaam',
  naam: 'naam',
  geboorteDatum: '01/01/2000',
  geslacht: 'geslacht',
  geboorteland: 'België',
})

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

const {
  data: criticalNotifications,
  pending: notificationsPending,
  error,
} = useFetch<IMelding[]>(`/meldingen/dokter/${user.value?.localAccountId}`, {
  baseURL: servicesUrls.meldingenService,
  server: false,
  immediate: true,
  onRequest(context: FetchContext): Promise<void> | void {
    context.options.params = {
      level: AlertLevel.Kritiek,
    }
  },
})

const removeFromList = (id: string) => {
  console.log(id)
  const NotificationToRemove = criticalNotifications.value?.filter(
    melding => melding.id !== id,
  )
  if (NotificationToRemove === undefined) return
  criticalNotifications.value = NotificationToRemove
}

const unpin = async (id: any) => {
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
const hovered = ref(false)
watch(hovered, newVal => {
  console.log(newVal, 'hovered')
})
</script>

<template>
  <div class="mx-auto my-12 max-w-[75rem]">
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
      <div v-if="pendingPinnedPatients" class="flex flex-col gap-4 min-w-[34rem]">
        <client-only>
          <patients-sm
            v-for="patient of 5"
            :key="Math.random()"
            :patient="placeHolderPatient"
            :patientId="placeHolderPatient.id"
            class="blurred-text animate-pulse"
            :isDisabled="true"
          />
        </client-only>
      </div>
      <div
        v-else-if="pinnedPatients !== null && pinnedPatients.length > 0"
        class="flex flex-col gap-4"
      >
        <patients-sm
          v-for="patient of pinnedPatients"
          :key="patient.id"
          :patient="patient.algemeen"
          :patientId="patient.id"
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
        </PressablesButton>
      </div>
      <!--      Title Right      -->
      <TextKop2>Ernstige meldingen</TextKop2>

      <!--      Content right    -->
      <div class="flex max-w-[30rem] flex-col gap-4">
        <AlertsPinned
          v-for="melding of criticalNotifications.slice(0, 6)"
          v-if="criticalNotifications"
          class="w-[30rem]"
          :key="melding.id"
          :datetime="melding.timestamp"
          :level="melding.level"
          :name="melding.fullName"
          :type="melding.type"
          :value="melding.value"
          :click-url="'/dokter/meldingen?id=' + melding.patientId"
          @remove="removeFromList(melding.id)"
        />

        <AlertsPinned
          v-for="melding of 5"
          v-if="notificationsPending"
          class="blurred-text w-[30rem] animate-pulse"
          :key="placeHolderAlert.id"
          :datetime="placeHolderAlert.timestamp"
          :level="placeHolderAlert.level"
          :name="placeHolderAlert.fullName"
          :type="placeHolderAlert.type"
          :value="placeHolderAlert.value"
          :click-url="'/dokter/meldingen?id=' + placeHolderAlert.patientId"
        />
      </div>
    </div>
  </div>
</template>

<style>
.blurred-text {
  color: transparent;
  text-shadow: 0 0 8px #000;
  filter: grayscale(1);
}

.blurred-text .text-gray-800 {
  color: transparent !important;
  text-shadow: 0 0 8px #000;
}
</style>
