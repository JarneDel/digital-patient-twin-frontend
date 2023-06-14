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


const updateSelectedCount = (count: number) => {
  selected.value = count
}

const updateList = (id: any) => {
  if (selected_list.value.includes(id)) {
    selected_list.value = selected_list.value.filter((item) => item !== id)
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
  <div class="mx-auto my-12 max-w-[67rem]">
    <h2 class="mx-8 mb-8 mt-6 text-3xl font-semibold">
        Patiënt lijst
    </h2>
    <div class="mt-20 mb-10 flex flex-col items-center justify-between lg:flex-row">
      <button class="p-5 inline-flex justify-center rounded-lg border border-transparent bg-secondary-100 text-sm font-medium ring-2 ring-transparent hover:bg-secondary-200/40 outline-none focus-visible:ring-secondary-400/80">
        <Plus class="h-8 w-8" />
      </button>
  

      <PressablesEdit
        @clickDelete="clickEdit"
        v-model:is-editing="isEditing"
        :selected-count="count"
        @checkboxSelected="updateSelectedCount"
        @update:isEditing="$emit('update:isEditing', $event)"
      />
    </div>
  
    <patients-patientcard-edit
      v-for="patient in data"
      :id="patient.id"
      :patient="patient"
      :click-edit="isEditing"
      @checkboxSelected="updateList(patient.id)"
    />


  </div>
</template>
