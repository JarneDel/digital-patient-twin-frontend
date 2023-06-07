<script setup lang="ts">
import { IPatientAlgemeen, PatientGegevens } from '~/interfaces/IPatient'
import { LucideLineChart, LucideEdit } from 'lucide-vue-next'
import { FetchContext } from 'ofetch'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import { waitForDebugger } from 'inspector';

const props = defineProps({
  for:{
    type: String,
    required: true,
  },
  type: {
    type: String as PropType<'view' | 'edit'>,
    required: true,
  }
})

console.log(props.for + " => props.for")

const url = 'https://patientgegevens--hml08fh.blackdune-2fd1ec46.northeurope.azurecontainerapps.io/patient/878c95cf-e82d-40a5-a56c-8790427f1657'

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

const isOpen = ref(true)

const closeModal = () => {
  isOpen.value = false
  window.location.reload()
}


</script>

<template>
  <div v-if="pending">
    <LoadersList height="470px" width="1600px" class="mx-28"/>
  </div>
  <div v-else-if="error">
    <popup-error @click="closeModal" v-model:is-open="isOpen" />
  </div>
  <div class="flex flex-row justify-between rounded-lg bg-neutral-500 p-8 mx-28">
    <div class="flex flex-row content-center justify-start gap-2">
      <div v-if="result" :key="Math.random()" v-for="naam in result">
        {{ naam.voornaam }}
        {{ naam.naam }}
      </div>
      <div v-for="naam in result">
        {{ calculateAge(naam.geboorteDatum.toString()) }}
      </div>
      <div v-for="naam in result">
        {{ naam.geslacht }}
      </div>
    </div>
    <div class="flex flex-1 flex-row content-center justify-end">
      <button v-if="type === 'view'">
        <LucideLineChart />
      </button>
      <button v-if="type === 'edit'">
        <LucideEdit />
      </button>
    </div>
    <div>
      <!--    realtime data components-->
    </div>
  </div>
</template>

<style scoped></style>
