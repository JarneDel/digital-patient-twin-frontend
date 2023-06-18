<script setup lang="ts">
import VitalStat = PatientData.models.VitalStat

defineProps({
  data: {
    type: Object as PropType<VitalStat>,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  dataDiastolic: {
    type: Object as PropType<VitalStat>,
    required: false,
  },
})
</script>

<template>
  <div class="mx-2 text-right">
    <!--    one row, multiple cols, format: min: value unit | gemiddelde: | value unit | max: value: unit-->
    <div
      class="inline-flex flex-row gap-4 rounded-md bg-neutral-600 p-2 drop-shadow-md"
    >
      <div v-if="type !== 'Bloeddruk'">min: {{ data.min }} {{ data.unit }}</div>
      <div v-else-if="dataDiastolic !== undefined" class='text-xs'>
        min: {{ data.min }}/{{ dataDiastolic.min }} {{ data.unit }}
      </div>
      <div v-if="type !== 'Bloeddruk'">
        gem: {{ Math.round(data.avg) }} {{ data.unit }}
      </div>
      <div v-else-if="dataDiastolic !== undefined" class='text-xs'>
        gem: {{ Math.round(data.avg) }}/{{ Math.round(dataDiastolic.avg) }}
        {{ data.unit }}
      </div>
      <div v-if="type !== 'Bloeddruk'">max: {{ data.max }} {{ data.unit }}</div>
      <div v-else-if="dataDiastolic !== undefined" class='text-xs'>
        max: {{ data.max }}/{{ dataDiastolic.max }} {{ data.unit }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>
