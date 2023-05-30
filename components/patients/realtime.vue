<script setup lang='ts'>
import { IPatientAlgemeen } from '~/interfaces/IPatient'
import { LucideLineChart, LucideEdit } from 'lucide-vue-next'

defineProps(
  {
    'patient': {
      type: Object as PropType<IPatientAlgemeen>,
      required: true,
    },
    'type': {
      type: String as PropType<'view' | 'edit'>,
      required: true,
    },
  },
)

const calculateAge = (date: Date) => {
  // 01/01/2000
  const month = date.getMonth() + 1
  const day = date.getDate()
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

// fetching function for the realtime data or websocket

</script>

<template>
  <div class='flex flex-row justify-between'>
    <div class='flex flex-row justify-start content-center gap-2'>
      <div>
        {{ patient.voornaam }}
        {{ patient.achternaam }}
      </div>
      <div>
        {{ calculateAge(patient.geboortedatum) }}
      </div>
      <div>
        {{ patient.geslacht }}
      </div>
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