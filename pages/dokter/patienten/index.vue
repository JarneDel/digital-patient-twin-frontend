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

const placeholderPatient = ref<PatientGegevens>({
  id: '1',
  deviceId: '1',
  algemeen: {
    id: '1',
    voornaam: 'voornaam',
    naam: 'naam',
    geboorteDatum: 'geboortedatum',
    geslacht: 'geslacht',
    geboorteland: 'geboorteland',
  },
  profilePictureUrl: 'https://i.imgur.com/3Zo7z6d.png',
  adres: {
    gemeente: 'gemeente',
    straat: 'straat',
    postcode: 123,
    nr: '123a',
  },
  contact: {
    email: 'email@mail.com',
    telefoon: '123456789',
  },
  medisch: {
    bloedgroep: 'A+',
    lengte: 170,
    gewicht: 170,
  },
  createdBy:"1",
  medicalNotificationThresholds:{
    bloeddrukSystolisch: {
      min: 120,
      max: 140,
    },
    bloeddrukDiaStolisch: {
      min: 80,
      max: 90,
    },
    hartslag: {
      min: 80,
      max: 120,
    },
    temperatuur: {
      min: 35,
      max: 40,
    },
    ademhalingsfrequentie: {
      min: 10,
      max: 30,
    },
    bloedzuurstof: {
      min: 70,
      max: 100,
    }
  }
})

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

const removeFromList = (id: string) => {
  console.log("verwijder uit lijst: " + id)
}

const pin = async () => {
  execute()
}


const del = async () => {
  console.log("IK KOM HIER VERWIJDEREN")
  pinnedPatientsExecute()
  execute()

  // voor id uit geselecteerde lijst
  for(const id of selected_list.value) {
    console.log("dit is het id: " + id);

    // voor elke id uit lijst van gepinde patienten
    pinnedPatientsExecute()
    for(const i of pinnedPatients.value && pinnedPatients != null ? pinnedPatients.value : []){
      // als id en id overeenkomen verwijder de pin
      if(i.id === id){
        // k ga der wel vanuit dat de patienten overeen komen hier
        console.log(i.id + " == " + id)
        const res = await $fetch(`/dokter/${user.value?.localAccountId}/patient/${id}/pin`, { // veranderd
          method: 'DELETE',
          baseURL: servicesUrls.dokterService,
        })
        try {
          if (!res) {
            console.log("PATIENT VERWIJDERD ✨")
            return !res
          }
        } catch (error) {
          console.log("PATIENT NIET VERWIJDERD ❌")
          console.log(error)
        }
        // if(!res) return //iets in die aard ben niet zeker (gewoon kijken of die result 200 is) kan eventueel met try catch
        // const resDeletePatient = await $fetch(`/dokter/${user.value?.localAccountId}/patient/${id}/`, options) // hier de patient verwijderen
        // const resDeletePatient = await $fetch(`/dokter/${user.value?.localAccountId}/patient/${id}/`, { // veranderd
        //   method: 'DELETE',
        //   baseURL: servicesUrls.dokterService,
        // })
        // try {
        //   if (!resDeletePatient) {
        //     console.log("PATIENT VERWIJDERD ✨")
        //     return !resDeletePatient
        //   }
        // } catch (error) {
        //   console.log(error)
        // }
      }
      
      // als ze niet overeenkomen
      else{
        console.log(i.id + " != " + id)
      }
    }

    // dan verwijderen van patienten
    const resDeletePatient = await $fetch(`/dokter/${user.value?.localAccountId}/patient/${id}/`, { // veranderd
        method: 'DELETE',
        baseURL: servicesUrls.dokterService,
      })
      try {
        if (!resDeletePatient) {
          console.log("PATIENT VERWIJDERD ✨")
          return !resDeletePatient
        }
      } catch (error) {
        console.log(error)
      }
    isEditing.value = false
  }
  console.log(selected_list.value)
  console.log("YAAAAYYY")
  execute()
}


// const del = async () => {
//   console.log("IK KOM HIER VERWIJDEREN")
//   console.log("1")

//   // voor id uit geselecteerde lijst
//   for(const id of selected_list.value) {
//     console.log("2")
//     console.log("dit is het id: " + id);

//     // voor elke id uit lijst van gepinde patienten
//     for(const i of pinnedPatients.value && pinnedPatients != null ? pinnedPatients.value : []){
//       console.log("3")
//       // als id en id overeenkomen verwijder de pin
//       if(i.id === id){
//         console.log("4")
//         console.log(i.id + " == " + id)
//         $fetch(`/dokter/${user.value?.localAccountId}/patient/${id}/pin`, {
//           method: 'DELETE',
//           baseURL: servicesUrls.dokterService,
//         }).then(
//           () => {
//             execute()
//             // removeFromList(id)
//             console.log("5")
//             console.log("PIN verwijderd 📌")
//           },
//           (err: FetchError) => {
//             console.log(err)
//           },
//         )
//         console.log("6")
//       }
      
//       // als ze niet overeenkomen
//       else{
//         console.log("7")
//         console.log(i.id + " != " + id)
//       }
//       console.log("8")
//     }
//     // $fetch(`/dokter/${user.value?.localAccountId}/patient/${id}/`, {
//     //   method: 'DELETE',
//     //   baseURL: servicesUrls.dokterService,
//     // }).then(
//     //   () => {
//     //     execute()
//     //     removeFromList(id)
//     //   },
//     //   (err: FetchError) => {
//     //     console.log(err)
//     //   },
//     // )
//     console.log("9")
//     isEditing.value = false
//   }
//   console.log("10")
//   for(const id of selected_list.value) {
//     console.log("11")
//     console.log("🤑")
//     console.log("patient verwijderen: " + id)
//   }

// }

useHead({
  title: 'Patiënten',
  meta: [
    {
      name: 'description',
      content: 'Patiënten pagina. Bekijk al je patiënten zien.',
    },
  ],
})



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
      <div>{{selected_list}}</div>

      <PressablesEdit
        @clickDelete="clickDelete"
        @clickEdit="() => clickEdit"
        v-model:is-editing='isEditing'
        :selected-count='count'
        @checkboxSelected='updateSelectedCount'
        @update:isEditing="$emit('update:isEditing', $event)"
        @del="del()"
      />
      <!-- <PressablesEdit
        @clickDelete="clickDelete"
        @clickEdit="() => clickEdit"
        v-model:is-editing='isEditing'
        :selected-count='count'
        @checkboxSelected='updateSelectedCount'
        @update:isEditing="$emit('update:isEditing', $event)"
        @del="del(patient.id)"
      /> -->
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