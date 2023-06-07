<script setup lang="ts">
import { IPatientAlgemeen, PatientGegevens } from '~/interfaces/IPatient'
import { LucideLineChart, LucideEdit } from 'lucide-vue-next'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import { waitForDebugger } from 'inspector'

defineProps({
  // patient: {
  //   type: Object as PropType<IPatientAlgemeen>,
  //   required: true,
  // },
  type: {
    type: String as PropType<'view' | 'edit'>,
    required: true,
  },
})

const url =
  'https://patientgegevens--hml08fh.blackdune-2fd1ec46.northeurope.azurecontainerapps.io/patient/878c95cf-e82d-40a5-a56c-8790427f1657'

const { error, data, pending } = await useFetch<PatientGegevens>(url)

const calculateAge = (date: string): number => {
  const today = new Date()
  const [day, month, year] = date.split('/')

  const geboortedatum = new Date(`${month}/${day}/${year}`)

  let age = today.getFullYear() - geboortedatum.getFullYear()

  const hasBirthdayOccurred =
    today.getMonth() > geboortedatum.getMonth() ||
    (today.getMonth() === geboortedatum.getMonth() &&
      today.getDate() >= geboortedatum.getDate())

  if (!hasBirthdayOccurred) {
    age--
  }

  return age
}

const result = computed<IPatientAlgemeen[]>(() => {
  const lijst: IPatientAlgemeen[] = []
  if (data.value?.algemeen) {
    lijst.push(data.value.algemeen)
  }

  return lijst
})
// fetching function for the realtime data or websocket
</script>

<template>
  <div class="mx-auto max-w-7xl rounded-lg bg-neutral-300 p-8">
    <div class="flex flex-row content-center justify-start gap-2 lg:gap-10">
      <label for="patient-check" class="capitalize">{{}}</label>
      <label for="patient-check" class="capitalize">{{}}</label>
      <label for="patient-check">{{}}</label>
      <label for="patient-check" class="capitalize">{{}}</label>
      <div class="flex-1 justify-between">
        <div class="flex flex-1 flex-row content-center justify-end">
          <button v-if="type === 'view'">
            <LucideLineChart />
          </button>
          <NuxtLink to="/dokter/[dokterid]/patients/[patientid]/edit">
            <button v-if="type === 'edit'">
              <LucideEdit />
            </button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
