<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
import { PatientGegevens } from '~/interfaces/IPatient'

const isEditing = ref(false)
const clickEdit = () => {
  isEditing.value = !isEditing.value

  console.log(isEditing.value)
}

// dokterid ophalen
const routeID = useRoute().params.dokterid as string
const id = ref(routeID)
id.value = '878c95cf-e82d-40a5-a56c-8790427f1657'

// lijst van geselecteerde patienten bijhouden
const selected_list = ref<string[]>([])
const count = ref(selected_list.value.length)

const selected = ref(0)
const isSelected = ref(false)

const updateSelectedCount = (count: number) => {
  selected.value = count
}

const updateList = (id: any) => {
  if (selected_list.value.includes(id)) {
    selected_list.value = selected_list.value.filter(item => item !== id)
  } else {
    selected_list.value.push(id)
  }
  count.value = selected_list.value.length
}

const url =
  'https://patientgegevens--hml08fh.blackdune-2fd1ec46.northeurope.azurecontainerapps.io/patient'

const { error, data, pending } = await useFetch<PatientGegevens[]>(url)

useHead({
  title: 'Patiënten',
  meta: [
    {
      name: 'description',
      content: 'Patiënten pagina. Bekijk al je patiënten zien.',
    },
  ],
})
</script>

<template>
  <div class="bg-primary-325">{{ selected_list }}</div>
  <div class="mx-auto my-12 max-w-[67rem]">
    <h2 class="mx-8 mb-8 mt-6 text-3xl font-semibold">Patiënt lijst</h2>
    <div class="my-20 flex flex-col items-center justify-between lg:flex-row">
      <NuxtLink to="/dokter/patienten/[patientid]/create">
        <button
          class="inline-flex justify-center rounded-lg border border-transparent bg-secondary-100 p-5 text-sm font-medium outline-none ring-2 ring-transparent hover:bg-secondary-200/40 focus-visible:ring-secondary-400/80"
        >
          <Plus class="h-8 w-8" />
        </button>
      </NuxtLink>

      <PressablesEdit
        @clickDelete="clickEdit"
        v-model:is-editing="isEditing"
        :selected-count="count"
        @checkboxSelected="updateSelectedCount"
        @update:isEditing="$emit('update:isEditing', $event)"
      />
      <!-- <PressablesEdit
        @clickDelete="clickEdit"
        v-model:is-editing="isEditing"
        :selected-count="count"
        @checkboxSelected="updateSelectedCount"
        @update:isEditing="$emit('update:isEditing', $event)"
      /> -->
    </div>

    <patients-patientcard-edit
      v-for="patient in data"
      :id="patient.id"
      :patient="patient"
      @checkboxSelected="updateList(patient.id)"
    />
    <!-- <patienten-patientcard-edit
      v-for="patient in data"
      :for="id"
      :key="patient.id"
      :selected-count="selected"
      :patient="patient"
      :is-editing="isEditing"
      :is-checked="isSelected"
      @update:checked="isSelected = $event"
      @checkboxSelected="updateList(patient.id)"
      @update:isEditing="$emit('update:isEditing', $event)"
      @update:selected-count="selected = $event"
    /> -->
  </div>
</template>
