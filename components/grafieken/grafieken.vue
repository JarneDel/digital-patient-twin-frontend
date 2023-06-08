<script setup lang='ts'>
import { IHistoriek } from '~/interfaces/IHistoriek'
import { FetchContext } from 'ofetch'
import { LucideLoader2 } from 'lucide-vue-next'
import VitalStats = PatientData.models.VitalStats
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

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


watch(date, ((value, oldValue, onCleanup) => {
  if (value == null) return
  execute()
  statsExecute()
  const timeDiff = date.value[0].getTime() - date.value[1].getTime()
  if (timeDiff < 1000 * 60 * 60 * 25) {
    range.value = 'dag'
  } else if (timeDiff < 1000 * 60 * 60 * 24 * 8  ) {
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

const { data: grafiekData, error: grafiekError, pending: grafiekPending, execute } = useFetch<IHistoriek[]>(
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
const { data: statsData, error: statsError, pending: statsPending, execute: statsExecute } = stats

watch(grafiekData, (value, oldValue, onCleanup) => {
  if (value !== null) {
    hasLoadedBefore.value = true
    onCleanup(() => {
      hasLoadedBefore.value = false
    })
  }
})

watch(statsData, (value, oldValue, onCleanup) => {
  if (value !== null) {
    console.log(value)
  }
})
</script>
<template>
  <div class='flex flex-row justify-between mx-8 gap-8 items-center'>
    <!--     time picker start -->
    <Datepicker :range='true' v-model='date' :max-date="new Date()"  v-on:text-submit="() => {manual.end = true; manual.start= true}" class='max-w-[434px]' />

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
      <grafieken-stats :data='statsData.hartslag' type='Hartslag' v-if='statsData !== null' />
      <lucide-loader2 v-if='statsPending' :size='32' class='animate-spin text-tertiary-600' />
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
      <grafieken-stats :data='statsData.bloedzuurstof' type='Bloedzuurstof' v-if='statsData !== null' />
      <lucide-loader2 v-if='statsPending' :size='32' class='animate-spin text-tertiary-600' />
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
      <grafieken-stats :data='statsData.ademFrequentie' type='AdemFrequentie' v-if='statsData !== null' />
      <lucide-loader2 v-if='statsPending' :size='32' class='animate-spin text-tertiary-600' />
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
      <grafieken-stats :data='statsData.bloedzuurstof' type='Bloedzuurstof' v-if='statsData !== null' />
      <lucide-loader2 v-if='statsPending' :size='32' class='animate-spin text-tertiary-600' />
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
      <grafieken-stats :data='statsData.systolic' :data-diastolic='statsData.diastolic' type='Bloeddruk'
                       v-if='statsData !== null' />
      <lucide-loader2 v-if='statsPending' :size='32' class='animate-spin text-tertiary-600' />
    </div>
  </div>
</template>

<style scoped></style>
