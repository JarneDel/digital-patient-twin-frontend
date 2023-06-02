<script setup lang='ts'>
import { IPatientAlgemeen, PatientGegevens } from '~/interfaces/IPatient'
import { LucideLineChart, LucideEdit } from 'lucide-vue-next'

defineProps(
  {
    // 'patient': {
    //   type: Object as PropType<IPatientAlgemeen>,
    //   required: true,
    // },
    'type': {
      type: String as PropType<'view' | 'edit'>,
      required: true,
    },
  },
)

const url =
  'http://localhost:5012/v1.0/invoke/PatientGegevensService/method/patient/878c95cf-e82d-40a5-a56c-8790427f1657'
const { error, data, pending } = await useFetch<PatientGegevens>(url)


const calculateAge = (date: Date) => {
  // 01/01/2000
  const month = date.getMonth() + 1
  const day = date.getDate()
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
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
  <div v-if="pending">Loading... {{ pending }}</div>
  <div v-else-if="error">Error: {{ error }}</div>
  <div class='flex flex-row justify-between bg-neutral-500 p-8 rounded-lg'>
    <div class='flex flex-row justify-start content-center gap-2'>
      <div
      v-if="result"
      :key="Math.random()"
      v-for="naam in result"
      >
      {{ naam.voornaam }}
        <!-- {{ naam.achternaam }} -->
      </div>
      <!-- <div v-for="naam in result">
        {{ calculateAge(naam.geboortedatum) }}
      </div>
      <div v-for="naam in result">
        {{ naam.geslacht }}
      </div> -->
    </div>
    <div class='flex flex-row flex-1 justify-end content-center'>
      <button v-if='type === "view"'>
        <LucideLineChart />
      </button>
      <button v-if='type === "edit"'>
        <LucideEdit />
      </button>
    </div>
    <div>
      <!--    realtime data components-->
    </div>
  </div>
</template>

<style scoped>

</style>