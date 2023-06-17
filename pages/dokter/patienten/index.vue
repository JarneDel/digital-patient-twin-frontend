<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
import { PatientGegevens } from '~/interfaces/IPatient'
import { servicesUrls } from '~/servicesurls'
import { $fetch, FetchError } from 'ofetch'

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

const user1 = useUser()
console.log(user1.value?.localAccountId, 'user1')

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
    for (let i = 0; i < selected_list.value.length; i++) {
      del(selected_list.value[i])
    }
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

const removeFromList = (id: string) => {
  console.log('patiënt is verwijdered')
}

const pin = async () => {
  execute()
}

const del = async (id: string) => {
  if (patients.value === null) return
  $fetch(`/dokter/${user.value?.localAccountId}/patient/${id}/pin`, {
    method: 'DELETE',
    baseURL: servicesUrls.dokterService,
  }).then(
    () => {
      execute()
      removeFromList(id)
    },
    (err: FetchError) => {
      console.log(err)
    },
  )
  $fetch(`/dokter/${user.value?.localAccountId}/patient/${id}/`, {
    method: 'DELETE',
    baseURL: servicesUrls.dokterService,
  }).then(
    () => {
      execute()
      removeFromList(id)
    },
    (err: FetchError) => {
      console.log(err)
    },
  )
  isEditing.value = false
}

useHead({
  title: 'Patiënten',
  meta: [
    {
      name: 'description',
      content: 'Patiënten pagina. Bekijk al je patiënten zien.',
    },
  ],
})

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

watch(pending, () => {
  if (pending.value) {
    console.log('pending')
  } else {
    pinnedPatientsExecute()
  }
})

const pinned = (id: string) => {
  if(patients.value !== null && pinnedPatients.value !== null){
    if(pinnedPatients.value.filter(p => p.id === id).length > 0){
      return true
    }else{
      return false
    }
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
        @del="del(patient.id)"
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
    <div v-else="pinnedPatients === null">geen pinnedPatients</div>
  </div>
</template>
