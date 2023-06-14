<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
import { PatientGegevens } from '~/interfaces/IPatient'
import { servicesUrls } from '~/servicesurls'
import { $fetch, FetchError } from 'ofetch'

const user = useUser()

const { data, error, pending } = useFetch<PatientGegevens[]>(`/dokter/${user.value?.localAccountId}/patients`, {
  baseURL: servicesUrls.dokterService,
  server: false,
})

const isEditing = ref(false)
const isDeleting = ref(false)

const clickEdit = () => {
  isEditing.value = !isEditing.value
}

const clickDelete = () => {
  console.log('clickDelete ------------------')
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
    selected_list.value = []
    count.value = selected_list.value.length
  },
)

const removeFromList = (id: string) => {
  console.log("het is verwijdered 😀")
}

const del = async (id: string) => {
  // TODO: user can undo this action
  if (data.value === null) return
  $fetch(`/dokter/${user.value?.localAccountId}/patient/${id}/pin`, {
    method: 'DELETE',
    baseURL: servicesUrls.dokterService,
  }).then(
    () => {
      removeFromList(id)
    },
    (err: FetchError) => {
      console.log(err)
    },
  )
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
</script>

<template>
  <div>{{ selected_list }}</div>
  <div class="mx-auto my-12 max-w-[67rem]">
    <h2 class="mx-8 mb-8 mt-6 text-3xl font-semibold">Patiënt lijst</h2>
    <div
      class="mb-10 mt-20 flex flex-col items-center justify-between lg:flex-row"
    >
      <button
        class="inline-flex justify-center rounded-lg border border-transparent bg-secondary-100 p-5 text-sm font-medium outline-none ring-2 ring-transparent hover:bg-secondary-200/40 focus-visible:ring-secondary-400/80"
      >
        <Plus class="h-8 w-8" />
      </button>

      <PressablesEdit
        @clickEdit="() => clickEdit"
        @clickDelete="clickDelete"
        v-model:is-editing="isEditing"
        :selected-count="count"
        @checkboxSelected="updateSelectedCount"
        @update:isEditing="$emit('update:isEditing', $event)"
        @del="del(patient.id)"
      />
    </div>

    <patients-patientcard-edit
      v-for="patient in data"
      :id="patient.id"
      :patient="patient"
      :click-edit="isEditing"
      @checkboxSelected="updateList"
    />
  </div>
</template>
