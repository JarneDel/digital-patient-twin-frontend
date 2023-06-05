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

defineProps({
  // 'patient': {
  //   type: Object as PropType<IPatientAlgemeen>,
  //   required: true,
  // },
  type: {
    type: String as PropType<'view' | 'edit'>,
    required: true,
  },
})

const url =
  'http://localhost:5012/v1.0/invoke/PatientGegevensService/method/patient/878c95cf-e82d-40a5-a56c-8790427f1657'
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

function closeModal() {
  isOpen.value = false
  window.location.reload()
}
</script>

<template>
  <div v-if="pending">Loading... {{ pending }}</div>
  <div v-else-if="error">
    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" @close="closeModal" class="relative z-10">
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
                  Oops!
                </DialogTitle>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Er is iets misgelopen... Probeer opnieuw.
                  </p>
                </div>

                <div class="mt-4">
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-tertiary-100/30 px-4 py-2 text-sm font-medium text-tertiary-600 ring-2 ring-tertiary-300 hover:bg-tertiary-200/40 focus:outline-none focus-visible:ring-tertiary-500"
                    @click="closeModal"
                  >
                    Ok
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
  <!-- <div v-else-if="error">Er is een error opgetreden, probeer de pagina opniew te laden</div> -->
  <div class="flex flex-row justify-between rounded-lg bg-neutral-500 p-8">
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
