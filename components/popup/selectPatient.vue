<script lang="ts" setup>
import { PatientGegevens } from '~/interfaces/IPatient'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import DropDownSelector from '~/components/pressables/dropDownSelector.vue'
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
  },
)

const {
  data: allPatients,
  error: allPatientsError,
  pending: allPatientspending,
} = useFetch<Array<PatientGegevens>>('/patient', {
  baseURL:
    'https://patientgegevens.blackdune-2fd1ec46.northeurope.azurecontainerapps.io',
})

const remainingPatients = ref<Array<PatientGegevens>>([])

const calculateRemainingPatients = () => {
  if (!data || !data.value || !allPatients.value) return
  const patientenVanDokter = data.value.map(patient => patient.id)
  const allePatienten = allPatients.value.map(patient => patient.id)
  const remainingPatientIds = allePatienten.filter(
    patient => !patientenVanDokter.includes(patient),
  )
  remainingPatients.value = allPatients.value.filter(patient =>
    remainingPatientIds.includes(patient.id),
  )
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

const selected2 = ref('')
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
        enter="duration-300 ease-out"
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
                  <strong>
                    ( gesimuleerd, lees hier id kaart van patient in )
                  </strong>
                </p>
              </div>
              <div>
                <pressables-drop-down-selector
                  :is-fixed="false"
                  :options="
                    remainingPatients.map(
                      patient =>
                        patient.algemeen.voornaam + ' ' + patient.algemeen.naam,
                    )
                  "
                  @update:selected="(naam: string)=> selected2 = naam"
                />
                <button
                  class="shadow-sm mt-4 inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 sm:text-sm"
                  @click="() => submit(selected2)"
                >
                  ok
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style scoped></style>
