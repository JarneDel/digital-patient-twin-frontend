<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
import { PatientGegevens } from '~/interfaces/IPatient'
import { servicesUrls } from '~/servicesurls'
import { $fetch } from 'ofetch'

const user = useUser()

const {
  data: patients,
  execute,
  error,
  pending,
} = useFetch<PatientGegevens[]>(
  `/dokter/${user.value?.localAccountId}/patients/`,
  {
    baseURL: servicesUrls.dokterService,
    server: false,
  },
)

const {
  data: pinnedPatients,
  error: pinnedPatientsError,
  pending: pinnedPatientsPending,
  execute: pinnedPatientsExecute,
} = useFetch<PatientGegevens[]>(
  `/dokter/${user.value?.localAccountId}/pinned`,
  {
    baseURL: servicesUrls.dokterService,
    server: false,
    immediate: false,
  },
)

const {createPlaceholderPatient } = usePatientHelper()
const placeholderPatient = ref<PatientGegevens>(createPlaceholderPatient())

const isEditing = ref(false)
const isDeleting = ref(false)
const isPinned = ref(false)

const clickEdit = () => {
  isEditing.value = !isEditing.value
}

const clickDelete = () => {
  isDeleting.value = !isDeleting.value
}

const clickPin = () => {
  isPinned.value = !isPinned.value
}

// lijst van geselecteerde patienten bijhouden
const selected_list = ref<string[]>([])
const count = ref(selected_list.value.length)

const selected = ref(0)

const updateSelectedCount = (count: number) => {
  selected.value = count
}

const updateList = (id: any, isSelected: boolean) => {
  if (!isSelected) {
    selected_list.value = selected_list.value.filter(item => item !== id)
  } else {
    selected_list.value.push(id)
  }
  count.value = selected_list.value.length
}

watch(
  () => isEditing.value,
  state => {
    console.log(state + ' state isEditing')
    selected_list.value = []
    count.value = selected_list.value.length
  },
)

watch(
  () => isDeleting.value,
  state => {
    console.log(state + ' state isDeleting')
    del()
    selected_list.value = []
    count.value = selected_list.value.length
  },
)

watch(
  () => isPinned.value,
  state => {
    console.log(state + ' state isPinned')
    pin()
  },
)

const pin = async () => {
  execute()
}

const del = async () => {
  console.log("IK KOM HIER VERWIJDEREN")
  pinnedPatientsExecute()
  execute()
  // voor id uit geselecteerde lijst
  for(const id of selected_list.value) {
    // voor elke id uit lijst van gepinde patienten
    pinnedPatientsExecute()
    for(const i of pinnedPatients.value && pinnedPatients != null ? pinnedPatients.value : []){
      // als id en id overeenkomen verwijder de pin
      if(i.id === id){
        // k ga der wel vanuit dat de patienten overeen komen hier
        const res = await $fetch(`/dokter/${user.value?.localAccountId}/patient/${id}/pin`, {
          method: 'DELETE',
          baseURL: servicesUrls.dokterService,
        })
        try {
          if (!res) {
            return !res
          }
        } catch (error) {
          console.log(error)
        }
      }
    }

    // dan verwijderen van patienten
    const resDeletePatient = await $fetch(`/dokter/${user.value?.localAccountId}/patient/${id}/`, {
        method: 'DELETE',
        baseURL: servicesUrls.dokterService,
      })
      try {
        if (!resDeletePatient) {
          return !resDeletePatient
        }
      } catch (error) {
        console.log(error)
      }
    isEditing.value = false
  }
  execute()
}

useTitle('Patiënten', "Patiënten pagina. Bekijk al je patiënten zien.")

watch(pending, () => {
  if (pending.value) {
    console.log('pending')
  } else {
    pinnedPatientsExecute()
  }
})

const pinned = (id: string) => {
  if(patients.value !== null && pinnedPatients.value !== null){
    return pinnedPatients.value.filter(p => p.id === id).length > 0;
  }
}

const showAddPatientPopup = () => {
  console.log('showAddPatientPopup')
  isAddPatientOpen.value = true
}
const isAddPatientOpen = ref(false)
const isSelectPatientOpen = ref(false)
watch(isSelectPatientOpen, (state) => {
  console.log(state + ' state isSelectPatientOpen')
})

</script>

<template>
  <div class='mx-auto my-12 max-w-[67rem]'>
    <h2 class='mb-4 text-3xl font-semibold'>Patiënt lijst</h2>
    <div class='my-8 flex mx-4 items-center justify-between lg:flex-row'>
      <button
        class='inline-flex justify-center rounded-lg border border-transparent bg-secondary-100 p-5 text-sm font-medium outline-none ring-2 ring-transparent hover:bg-secondary-200/40 focus-visible:ring-secondary-400/80'
        @click='showAddPatientPopup'
      >
        <Plus class='h-8 w-8' />
      </button>
      <popup-closeable 
        v-model:is-open='isAddPatientOpen'
        button2='Bestaande patient'
        button3='Nieuwe patient'
        message='Wil je een bestaande patient toevoegen of een nieuwe patient aanmaken?'
        title-message='Patient toevoegen'
        @button2Event='() => isSelectPatientOpen = true'
        @button3Event='()=> navigateTo("/dokter/patienten/create")'

      />
      <popup-select-patient
        v-if='user'
        v-model:is-open='isSelectPatientOpen'
      />

      <PressablesEdit
        @clickDelete="clickDelete"
        @clickEdit="() => clickEdit"
        v-model:is-editing='isEditing'
        :selected-count='count'
        @checkboxSelected='updateSelectedCount'
        @update:isEditing="$emit('update:isEditing', $event)"
        @del="del()"
      />
    </div>
    
    <patients-patientcard-edit
      v-for="patient in patients"
      v-if="pinnedPatients"
      :key="patient.id"
      :id="patient.id"
      :patient="patient"
      :click-edit="isEditing"
      :isPinned="pinned(patient.id)"
      @checkboxSelected="updateList"
      @clickPin="clickPin"
    />

    <div v-else="pending">
      <patients-patientcard-edit
      v-for="patient of 5"
      class="animate-pulse blurred-text"
      :key="Math.random()"
      :patient="placeholderPatient"
      :click-edit="isEditing"
      :isPinned="true"
      @checkboxSelected="updateList"
      @clickPin="clickPin"
    />
    </div>
    
  </div>
</template>


<style>
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