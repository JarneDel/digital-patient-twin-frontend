<script setup lang="ts">
import fitbit from '../svg/fitbit.vue'
const dummydata = [
  {
    id: '#101',
  },
  {
    id: '#402',
  },
  {
    id: '#888',
  },
]

const props = defineProps({
  devices: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <!-- select device id  -->
  <div class="mt-5 flex items-center">
    <label for="device">
      <fitbit />
    </label>

    <select
      required
      name="device"
      id="device"
      class="peer h-fit w-fit appearance-none rounded-lg border-2 border-gray-400 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:border-tertiary-600 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
    >
      <option v-for="d of deviceId" :value="d.deviceId" class="rounded-lg">
        {{ d.deviceId }}
      </option>
    </select>
  </div>
</template>

<style></style>
