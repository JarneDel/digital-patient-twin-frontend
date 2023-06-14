<script setup lang='ts'>
import { PatientGegevens } from '~/interfaces/IPatient'
import { AlertLevel, AlertType, IMelding } from '~/interfaces/AlertType'
import { servicesUrls } from '~/servicesurls'
import { FetchContext } from 'ofetch'
import { LucideRotateCw, LucideLoader2, LucideInfo } from 'lucide-vue-next'

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
const AlertTypes: Array<AlertType | 'Alle types'> = [
  'Alle types',
  AlertType.Hartslag,
  AlertType.Temperatuur,
  AlertType.Bloedzuurstof,
  AlertType.AdemsFrequentie,
  AlertType.Bloeddruk,
]
const selectedPatient = ref<string | 'Alle patiënten'>('')
const currentOffset = ref(0)
const selectedPatientId = ref<string | null>(null)
const AlertSeverity = ref<Array<AlertLevel | 'Alles'>>(['Alles', AlertLevel.Info, AlertLevel.Matig, AlertLevel.Kritiek])
const selectedSeverity = ref<string>('Alles')
const selectedType = ref<string>('Alle types')
const requestFromScroll= ref(false)


// get patienten by dokterid

const { pending: patientenPending, data: patienten, error: patientenError } = useFetch<PatientGegevens[]>(
  `/dokter/${user?.localAccountId}/patients`,
  {
    baseURL: servicesUrls.dokterService,
    server: false,
  },
)
const {
  data: meldingen,
  pending: meldingenPending,
  error: meldingenError,
  execute: getMeldingen,
} = useFetch<IMelding[]>(`/meldingen/dokter/${user?.localAccountId}`, {
  baseURL: servicesUrls.meldingenService,
  server: false,
  immediate: true,
  onRequest(context: FetchContext): Promise<void> | void {
    const typeEnum: AlertType = AlertType[selectedType.value as keyof typeof AlertType]
    const levelEnum: AlertLevel = AlertLevel[selectedSeverity.value as keyof typeof AlertLevel]
    context.options.params = {
      type: typeEnum,
      level: levelEnum,
      offset: currentOffset.value,
      patientId: selectedPatientId.value,
    }
  },
})


// meldingen is a list of alerts that are shown on the page

const patientNamen = computed(() => {
  if (!patienten.value) return []
  const namen = patienten.value.map(patient => {
    return `${patient.algemeen?.voornaam} ${patient.algemeen?.naam}`
  })
  return ['Alle patiënten', ...namen]
})


watch(selectedType, value => {
  console.log(value)
  getMeldingen()
  // reset offset
  currentOffset.value = 0
})


watch(selectedSeverity, (newVal) => {
  console.log(newVal, 'selected type changed')
  getMeldingen()
  // reset offset
  currentOffset.value = 0
})


watch(selectedPatient, (newVal) => {
  // get patient id from name
  const patient = patienten.value?.find(patient => {
    return `${patient.algemeen?.voornaam} ${patient.algemeen?.naam}` === newVal
  })
  if (patient) {
    console.log(patient.id, 'selected patient changed')
    selectedPatientId.value = patient.id
    currentOffset.value = 0
    getMeldingen()
  } else {
    console.log('selected patient changed to all', newVal)
    currentOffset.value = 0
    getMeldingen()
  }
})

watch(meldingen, () => {
  isRefreshing.value = false
})


// endregion

const AlertTypesString = computed(() => {
  return AlertTypes.map(type => {
    if (type === 'Alle types') return type
    return AlertType[type]
  })
})
const AlertSeverityString = computed(() => {
  return AlertSeverity.value.map(severity => {
    if (severity === 'Alles') return severity
    return AlertLevel[severity]
  })
})

const placeHolderAlert = ref<IMelding>({
  id: '1',
  patientId: '1',
  type: AlertType.Bloeddruk,
  value: '1',
  birthDate: '01/01/2000',
  level: AlertLevel.Info,
  timestamp: new Date(),
  fullName: 'John Doe',
})

const isRefreshing = ref(false)
const onButtonClick = () => {
  isRefreshing.value = true
  currentOffset.value = 0
  getMeldingen()
}

watch(useWatchIfScrolledToBottom, (newVal) => {
  if (newVal) {
    requestFromScroll.value = true
    currentOffset.value += 25
    getMeldingen()
  }
} , { immediate: true })

const allMeldingen = ref<IMelding[]>([])
// add new data to meldingen
watch(meldingen, (newVal) => {
  console.log(newVal, 'new meldingen')
  if (newVal) {
    if (requestFromScroll.value) {
      allMeldingen.value.push(...newVal)
      requestFromScroll.value = false
    } else {
      allMeldingen.value = newVal
    }
  }
})


</script>

<template>
  <div class='mx-auto my-12 max-w-[55rem] '>
    <div class='flex flex-row items-center justify-between'>
      <h2 class='mx-8 mb-8 mt-6 text-3xl font-semibold'>Meldingen</h2>
      <div class='refresh mr-5' role='button' @click='onButtonClick'>
        <lucide-rotate-cw :class='{
          "animate-spin" : meldingenPending && isRefreshing
         }' />
      </div>
    </div>

    <div class='notificationSettings'></div>
    <div class='mx-5 my-8 flex content-center justify-between'>
      <!--      <div class="flex items-center gap-x-4">-->
      <pressables-search
        type='small'
        class='medium-dropdown'
        v-model:selected='selectedPatient'
        :options='patientNamen'
      />
      <pressables-drop-down-selector
        type='default'
        class='small-dropdown'
        :options='AlertTypesString'
        v-model:selected='selectedType'
      />
      <!--      </div>-->
      <PressablesSelector
        v-model:selected='selectedSeverity'
        :options='AlertSeverityString'
      />
      <!--     Alerts container     -->
    </div>
    <div v-if='allMeldingen ||  !(!requestFromScroll && !patientenPending)'>
      <alerts-lg
        v-for='alert of allMeldingen'
        :key='alert.id'
        :alert='alert'
        :type='alert.type'
      />
    </div>
    <!--       center -->
    <div v-if='!meldingenPending && !patientenPending && allMeldingen.length === 0'>
      <div class='flex flex-col items-center justify-center pt-6'>
        <lucide-info class='text-6xl' />
        <text-kop2>Geen meldingen gevonden</text-kop2>
        <div class='text-center text-neutral-100'>
          Er zijn geen meldingen gevonden voor de geselecteerde filters.
        </div>

      </div>
    </div>

    <div  v-if='meldingenPending' class='flex justify-center'>
      <lucide-loader2 class='animate-spin' />
    </div>
    <div v-if='(meldingenPending || patientenPending) && !requestFromScroll'>
      <alerts-lg
        class='animate-pulse blurred-text'
        v-for='alert of 5'
        :key='Math.random()'
        :alert='placeHolderAlert'
        :type='alert'
      />
    </div>
  </div>
  <!--  <decorations-fixed-right/>-->


</template>

<style>
.small-dropdown {
  width: 14rem;
}

.medium-dropdown {
  width: 16rem;
}

.blurred-text {
  color: transparent;
  text-shadow: 0 0 8px #000;
  filter: grayscale(1);
}

.blurred-text .text-sm {
  color: transparent !important;
  text-shadow: 0 0 8px #000;
}

</style>
