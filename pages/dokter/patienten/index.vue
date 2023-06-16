<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
import { PatientGegevens } from '~/interfaces/IPatient'
import { servicesUrls } from '~/servicesurls'
import { $fetch, FetchError } from 'ofetch'
import { exec } from 'child_process'

const user = useUser()

const {
  data: patients,
  execute,
  error,
  pending,
} = useFetch<PatientGegevens[]>(`/dokter/${user.value?.localAccountId}/patients`, {
  baseURL: servicesUrls.dokterService,
  server: false,
})

const isEditing = ref(false)
const isDeleting = ref(false)

const clickEdit = () => {
  isEditing.value = !isEditing.value
}

const clickDelete = () => {
  isDeleting.value = !isDeleting.value
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

const removeFromList = (id: string) => {
  console.log('patiënt is verwijdered')
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

const { data: pinnedPatients, error: pinnedPatientsError, pending:pinnedPatientsPending, execute:pinnedPatientsExecute } = useFetch<PatientGegevens[]>(
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
  }
  else{
    pinnedPatientsExecute()
  }
})


watch(pinnedPatients, () => {
  console.log(pinnedPatients.value?.map(p => p.id) + ' pinnedpatients')
  console.log(patients.value?.map(p => p.id) + ' patients')
  if(patients.value !== null && pinnedPatients.value !== null){
    for (let i = 0; i < patients.value.length; i++) {
      if (pinnedPatients.value.map(p => p.id).includes(patients.value[i].id)) {
        console.log(patients.value[i].id + ' is pinned')
        // patients.value[i].isPinned = true
      } else {
        console.log(patients.value[i].id + ' is not pinned')
        // patients.value[i].isPinned = false
      }
    }
  }

  
})
</script>

<template>
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
        @clickDelete="clickDelete"
        @clickEdit="() => clickEdit"
        v-model:is-editing="isEditing"
        :selected-count="count"
        @checkboxSelected="updateSelectedCount"
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
      :isPinned="patient.id in pinnedPatients?.map(p => p.id)"
      @checkboxSelected="updateList"
    />
    <div v-else="pinnedPatients === null">geen pinnedPatients</div>
  </div>
</template>
