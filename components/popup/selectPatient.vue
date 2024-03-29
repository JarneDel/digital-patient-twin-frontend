<script lang='ts' setup>

import { PatientGegevens } from '~/interfaces/IPatient'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import Button from '~/components/pressables/button.vue'
import { $fetch } from 'ofetch'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
})

let dokterId: string | undefined = undefined
if (process.client) {
  dokterId = useUser().value?.localAccountId
}

const emits = defineEmits(['update:isOpen'])

const { data, error, pending } = useFetch<Array<PatientGegevens>>(
  `/dokter/${dokterId}/patients`,
  {
    baseURL:
      'https://dokterservice.blackdune-2fd1ec46.northeurope.azurecontainerapps.io',
    cache: 'no-cache',
  },
)

const {
  data: allPatients,
  error: allPatientsError,
  pending: allPatientspending,
} = useFetch<Array<PatientGegevens>>('/patient', {
  baseURL:
    'https://patientgegevens.blackdune-2fd1ec46.northeurope.azurecontainerapps.io',
  cache: 'no-cache',
})

const remainingPatients = ref<Array<PatientGegevens>>([])
const noRemainingPatients = ref(false)
const calculateRemainingPatients = () => {
  if (!data || !data.value || !allPatients.value) return
  const patientenVanDokter = data.value.map(patient => patient.id)
  const allePatienten = allPatients.value.map(patient => patient.id)
  const remainingPatientIds = allePatienten.filter(
    patient => !patientenVanDokter.includes(patient),
  )
  const remaining = allPatients.value.filter(patient =>
    remainingPatientIds.includes(patient.id),
  )
  if (!remaining) {
    noRemainingPatients.value = true
    return
  }
  remainingPatients.value = remaining
}

watch(data, data => {
  if (allPatients.value && data) {
    calculateRemainingPatients()
  }
})

watch(allPatients, () => {
  if (data.value && allPatients.value) {
    calculateRemainingPatients()
  }
})


const selectedPatientName = ref<string>('')
watch(selectedPatientName, name => {
  console.info(name, "new selected patient name")
})
const remainingPatientsNames = computed(() => {
  if (!remainingPatients.value) return []
  return remainingPatients.value.map(
    patient => patient.algemeen.voornaam + ' ' + patient.algemeen.naam,
  )
})


const submit = async (fullName: string) => {
  console.log('submit', fullName)
  const selectedPatientTemp = remainingPatients.value.find(
    patient =>
      patient.algemeen.voornaam + ' ' + patient.algemeen.naam === fullName,
  )
  console.log(selectedPatientTemp)
  if (!selectedPatientTemp) return
  if (!dokterId) return
  const url = `https://dokterservice.blackdune-2fd1ec46.northeurope.azurecontainerapps.io/dokter/${dokterId}/patient/${selectedPatientTemp.id}`
  const res = await $fetch(url, {
    method: 'POST',
  })
  if (res.status === 200) {
    emits('update:isOpen', false)
  }
  navigateTo(`/dokter/patienten/${selectedPatientTemp.id}/gegevens`)
}

</script>

<template>
  <TransitionRoot :show="isOpen" appear as="template">
    <Dialog
      as="div"
      class="relative z-10"
      @close="() => $emit('update:isOpen', false)"

    >
      <TransitionChild
        as="template"
        enter="duration-100 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25"></div>
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="shadow-xl w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Selecteer een patient
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Selecteer een patient om toe te voegen aan uw patiëntenlijst.
                  <br />
                  <span class="font-semibold my-2">
                    ( gesimuleerd, lees hier id kaart van patient in )
                  </span>
                </p>
              </div>
              <div>
                <pressables-drop-down-selector
                  v-if='!noRemainingPatients'
                  v-model='selectedPatientName'
                  :is-fixed="false"
                  :options="remainingPatientsNames"
                />
                <button
                  class="shadow-sm mt-4 inline-flex w-full justify-center rounded-md border-tertiary-400 border-2 bg-tertiary-100/30 px-4 py-2 text-base font-semibold text-tertiary-600 hover:bg-tertiary-200/40 focus:outline-none focus:ring-2 focus:ring-tertiary-500 focus:ring-offset-2 disabled:opacity-50 sm:text-sm"
                  @click="() => submit(selectedPatientName)"
                  v-if='!noRemainingPatients'
                >
                  ok
                </button>
              </div>
              <div v-if='noRemainingPatients || noRemainingPatients.length===0'>
                <p class="text-sm text-gray-500">
                  U heeft alle patiënten al toegevoegd.
                </p>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style scoped></style>
