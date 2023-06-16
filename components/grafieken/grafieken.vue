<script setup lang='ts'>
import { IHistoriek } from '~/interfaces/IHistoriek'
import { FetchContext } from 'ofetch'
import { LucideLoader2 } from 'lucide-vue-next'
import VitalStats = PatientData.models.VitalStats
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import useWebPubSub from '~/composables/useWebPubSub'
import { IRealtime } from '~/interfaces/IRealtime'
import { PatientGegevens } from '~/interfaces/IPatient'

const date = ref<Date[]>([
  new Date(new Date().setDate(new Date().getDate() - 7)),
  new Date(),
])

console.log(date.value[0])

const props = defineProps({
  for: {
    type: String,
    required: true,
  },
})

// default: yesterday
const manual = reactive({
  start: true,
  end: true,
})
const hasLoadedBefore = ref<boolean>(false)


watch(date, ((value) => {
  if (value == null) return
  execute()
  statsExecute()
  const timeDiff = date.value[0].getTime() - date.value[1].getTime()
  if (timeDiff < 1000 * 60 * 60 * 25) {
    range.value = 'dag'
  } else if (timeDiff < 1000 * 60 * 60 * 24 * 8) {
    range.value = 'week'
  } else if (timeDiff < 1000 * 60 * 60 * 24 * 31) {
    range.value = 'maand'
  } else {
    range.value = 'maand'
  }
}))

const range = ref<'dag' | 'week' | 'maand'>('dag')
const xLabel = ref<string>('')
console.log(props.for)
console.log('fetching')

const rangeEn = computed(() => {
  switch (range.value) {
    case 'dag':
      if (!manual.start && !manual.end) {
        date.value[0] = new Date(new Date().setDate(new Date().getDate() - 1))
        date.value[1] = new Date()
      }
      xLabel.value = 'Tijd [hh:mm]'
      return 'day'
    case 'week':
      if (!manual.start && !manual.end) {
        date.value[0] = new Date(new Date().setDate(new Date().getDate() - 7))
        date.value[0] = new Date()
      }
      xLabel.value = 'Datum [dd/mm]'
      return 'week'
    case 'maand':
      if (!manual.start && !manual.end) {
        date.value[0] = new Date(new Date().setDate(new Date().getDate() - 30))
        date.value[1] = new Date()
      }
      xLabel.value = 'Datum [dd/mm]'
      return 'month'

  }
})

const {
  data: grafiekData,
  error: grafiekError,
  pending: grafiekPending,
  execute,
} = useFetch<IHistoriek[]>(
  `${props.for}`,
  {
    method: 'GET',
    baseURL:
      'https://patientdata--hw07633.blackdune-2fd1ec46.northeurope.azurecontainerapps.io/history',
    lazy: true,
    immediate: true,
    key: Math.random().toString(),
    onRequest({ options }: FetchContext): Promise<void> | void {
      options.params = {
        range: rangeEn.value,
        start: date.value[0].getTime() / 1000,
        end: date.value[1].getTime() / 1000,
      }
    },
    watch: [range, date],
  },
)

//
const stats = useFetch<VitalStats>(
  `${props.for}/stats`,
  {
    method: 'GET',
    baseURL:
      'https://patientdata--hw07633.blackdune-2fd1ec46.northeurope.azurecontainerapps.io/history',
    lazy: true,
    immediate: true,
    key: Math.random().toString(),
    onRequest({ options }: FetchContext): Promise<void> | void {
      options.params = {
        range: rangeEn.value,
        start: date.value[0].getTime() / 1000,
        end: date.value[1].getTime() / 1000,
      }
    },
    watch: [range, date],
  },
)
const {
  data: statsData,
  error: statsError,
  pending: statsPending,
  execute: statsExecute,
} = stats

const {
  data: patient,
  error: patientError,
  pending: patientPending,
} = useFetch<PatientGegevens>(
  `patient/${props.for}`,
  {
    method: 'GET',
    baseURL:
      'https://patientgegevens.blackdune-2fd1ec46.northeurope.azurecontainerapps.io/',
    lazy: true,
    immediate: true,
    key: Math.random().toString(),
  },
)


watch(grafiekData, (value, oldValue, onCleanup) => {
  if (value !== null) {
    hasLoadedBefore.value = true
    onCleanup(() => {
      hasLoadedBefore.value = false
    })
  }
})

watch(statsData, (value) => {
  if (value !== null) {
    console.log(value)
  }
})

const {
  client,
  initializeClient,
  isInitialized,
  subscribeToGroup,
} = useWebPubSub()
if (process.client) {
  initializeClient()
}
const message = ref<IRealtime>()
watch(isInitialized, async (newVal) => {
  if (!newVal) return
  if (!client.value) return
  client.value?.on('group-message', (data) => {
    if (!patient.value) return
    if (data.message.group !== patient.value.deviceId) {
      console.log('message meant for different group', data.message.group, patient.value.deviceId)
    }
    message.value = data.message.data as IRealtime
  })
})

watch(patient, () => {
  console.log('subscribing to group')
  if (patient.value) {
    subscribeToGroup(patient.value.deviceId)
  }
})


</script>
<template>
  <div class='flex flex-row justify-between gap-8 items-center max-w-6xl mx-auto'>
    <!--     time picker start -->
    <Datepicker v-model='date' :max-date='new Date()' :range='true'
                class='max-w-[434px]' v-on:text-submit='() => {manual.end = true; manual.start= true}' />

    <!--  range picker -->
    <pressables-selector
      :options="['dag', 'week', 'maand']"
      v-model:selected='range'
    />
  </div>

  <div class='flex flex-row flex-wrap'>

  </div>
  <div v-if='grafiekPending && hasLoadedBefore'>
    <div v-if='grafiekPending && hasLoadedBefore'>
      <lucide-loader2 :size='32' class='animate-spin text-tertiary-600'></lucide-loader2>
    </div>
  </div>
  <PopupError
    v-if='grafiekError'
    title-message='Error'
    :message=" 'Error bij ophalen van historiek data: '+grafiekError.name + ' ' + grafiekError.statusCode"
    button2='try again'
    @button2Event='execute'
  />

  <div
    class='flex flex-row flex-wrap justify-center gap-4 pt-6'
  >
    <div>
      <grafieken-boxplot
        :data='grafiekData.map(item => item.hartslag)'
        :time-stamps='grafiekData.map(item => new Date(item.timestamp))'
        y-label='Hartslag [bpm]'
        :x-label='xLabel'
        type='Hartslag'
        :range='rangeEn'
        v-if='grafiekData !== null'
      />
      <LoadersWidget
        v-if='grafiekPending && !hasLoadedBefore'
        width='800px'
        height='600px'
      />
      <div class='flex flex-row justify-between'>
        <grafieken-realtime v-if='message' :data='message.hartslag.value' :unit='message.hartslag.unit' />
        <lucide-loader2 v-else :size='32' class='animate-spin text-tertiary-600'></lucide-loader2>
        <grafieken-stats v-if='statsData !== null' :data='statsData.hartslag' type='Hartslag' />
        <lucide-loader2 v-if='statsPending' :size='32' class='animate-spin text-tertiary-600' />
      </div>
    </div>
    <div>
      <grafieken-boxplot
        :data='grafiekData.map(item => item.bloedzuurstof)'
        :time-stamps='grafiekData.map(item => new Date(item.timestamp))'
        y-label='Zuurstof [%]'
        :x-label='xLabel'
        type='Bloedzuurstof'
        :range='rangeEn'
        v-if='grafiekData !== null'

      />
      <LoadersWidget
        v-if='grafiekPending && !hasLoadedBefore'
        width='800px'
        height='600px'
      />
      <div class='flex flex-row justify-between'>
        <grafieken-realtime v-if='message' :data='message.bloedzuurstof.value' :unit='message.bloedzuurstof.unit' />
        <lucide-loader2 v-else :size='32' class='animate-spin text-tertiary-600'></lucide-loader2>
        <grafieken-stats v-if='statsData !== null' :data='statsData.bloedzuurstof' type='Bloedzuurstof' />
        <lucide-loader2 v-if='statsPending' :size='32' class='animate-spin text-tertiary-600' />
      </div>

    </div>

    <div>
      <grafieken-boxplot
        :data='grafiekData.map(item => item.ademFrequentie)'
        :time-stamps='grafiekData.map(item => new Date(item.timestamp))'
        y-label='Ademfrequentie [rpm]'
        :x-label='xLabel'
        type='Ademfrequentie'
        :range='rangeEn'
        v-if='grafiekData !== null'
      />
      <LoadersWidget
        v-if='grafiekPending && !hasLoadedBefore'
        width='800px'
        height='600px'
      />
      <div class='flex flex-row justify-between'>
        <grafieken-realtime v-if='message' :data='message.ademFrequentie.value' :unit='message.ademFrequentie.unit' />
        <lucide-loader2 v-else :size='32' class='animate-spin text-tertiary-600'></lucide-loader2>
        <grafieken-stats v-if='statsData !== null' :data='statsData.ademFrequentie' type='AdemFrequentie' />
        <lucide-loader2 v-if='statsPending' :size='32' class='animate-spin text-tertiary-600' />
      </div>
    </div>
    <div>
      <grafieken-boxplot
        :data='grafiekData.map(item => item.temperatuur)'
        :time-stamps='grafiekData.map(item => new Date(item.timestamp))'
        y-label='Temperatuur [°C]'
        :x-label='xLabel'
        type='Temperatuur'
        :range='rangeEn'
        v-if='grafiekData !== null'
      />
      <LoadersWidget
        v-if='grafiekPending && !hasLoadedBefore'
        width='800px'
        height='600px'
      />
      <div class='flex flex-row justify-between'>
        <grafieken-realtime v-if='message' :data='message.temperatuur.value.toFixed(1)'
                            :unit='message.temperatuur.unit' />
        <lucide-loader2 v-else :size='32' class='animate-spin text-tertiary-600'></lucide-loader2>
        <grafieken-stats v-if='statsData !== null' :data='statsData.bloedzuurstof' type='Bloedzuurstof' />
        <lucide-loader2 v-if='statsPending' :size='32' class='animate-spin text-tertiary-600' />
      </div>
    </div>
    <div>
      <grafieken-linechart
        :data='grafiekData.map(item => item.bloeddruk)'
        :time-stamps='grafiekData.map(item => new Date(item.timestamp))'
        :x-label='xLabel'
        y-label='Bloeddruk [mmHg]'
        type='Bloeddruk'
        :range='rangeEn'
        v-if='grafiekData !== null'
      />
      <LoadersWidget
        v-if='grafiekPending && !hasLoadedBefore'
        width='800px'
        height='600px'
      />
      <div class='flex flex-row justify-between'>
        <grafieken-realtime v-if='message'
                            :data='message.bloeddruk.systolic + "/" + message.bloeddruk.diastolic' :unit='message.bloeddruk.unit' />
        <lucide-loader2 v-else :size='32' class='animate-spin text-tertiary-600'></lucide-loader2>
        <grafieken-stats v-if='statsData !== null' :data='statsData.systolic' :data-diastolic='statsData.diastolic'
                         type='Bloeddruk' />
        <lucide-loader2 v-if='statsPending' :size='32' class='animate-spin text-tertiary-600' />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
