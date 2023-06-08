<template>
  <!-- voornaam -->
  <label for="familytname" class="mb-2 block">Achternaam</label>
  <input
    id="familytname"
    v-model="familytName"
    :class="{ 'border-red-500': isfamilytNameInvalid }"
    class="focus:border-tertiary-600 peer block h-fit w-full appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
  />
  <span
    v-if="isfamilytNameInvalid"
    class="break-word inline-block text-red-500"
  >
    {{ familytNameErrorMessage }}
  </span>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'

const familytName = ref('')
const isfamilytNameInvalid = ref(false)
const familytNameErrorMessage = ref('')

watch(familytName, newValue => {
  if (newValue.trim().length === 0) {
    isfamilytNameInvalid.value = true
  } else if (newValue.trim().length < 2) {
    isfamilytNameInvalid.value = true
    familytNameErrorMessage.value =
      'Uw achternaam moet minstens 2 karakters bevatten.'
  } else {
    isfamilytNameInvalid.value = false
  }
})
</script>

<style>
.border-red-500 {
  border-color: #ef4444;
}
.text-red-500 {
  color: #ef4444;
}
</style>
