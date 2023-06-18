<script setup lang='ts'>
import { ref } from 'vue'
import {
  Address,
  Contact,
  IMeldingenInstellingen, INotificationRange,
  IPatientAlgemeen,
  Medisch,
  PatientGegevens,
} from '~/interfaces/IPatient'
import { Switch } from '@headlessui/vue'
import useConvertNotificationRange from '~/composables/useConvertNotificationRange'
import { $fetch } from 'ofetch'

const {convertThresholdsToRange, convertRangeToThresholds }  =useConvertNotificationRange()

// todo: when there are no notification settings, make a button to prompt the user to create them
// todo: skeleton loading of meldingen to prevent layout shift

useHead({
  title: 'Gegevens patiënt',
  meta: [
    {
      name: 'description',
      content: 'Patiënt gegevens aanpassen.',
    },
  ],
})

const user = useUser().value

const routeID = useRoute().params.patientid as string
const id = ref(routeID)
//get patient data
const url = `https://patientgegevens--hml08fh.blackdune-2fd1ec46.northeurope.azurecontainerapps.io/patient/${id.value}`

const notifcationurl = `https://patientgegevens--hml08fh.blackdune-2fd1ec46.northeurope.azurecontainerapps.io/patient/${id.value}/thresholds`

const dokterServiceUrl = 'https://dokterservice.blackdune-2fd1ec46.northeurope.azurecontainerapps.io'
const {
  data: notificationsEnabledData,
  pending: notificationsPending,
  error: notificationsError,
  execute: refreshNotifications,
} = useFetch<IMeldingenInstellingen>(
  `dokter/${user?.localAccountId}/patient/${id.value}/notifications`,
  {
    baseURL: dokterServiceUrl,
    server: false,
  },
)

const notificationsEnabled = ref<IMeldingenInstellingen>()
watch(notificationsEnabledData, () => {
  console.log('notificationsEnabledData changed to:', notificationsEnabledData.value)
  if (notificationsEnabledData.value) {
    notificationsEnabled.value = notificationsEnabledData.value
  }
})


const { error, data, pending, execute } = await useFetch<PatientGegevens>(url)
const patient: IPatientAlgemeen = data.value?.algemeen as IPatientAlgemeen
const patientAdres: Address = data.value?.adres as Address
const patientMedisch: Medisch = data.value?.medisch as Medisch
const patientContact: Contact = data.value?.contact as Contact
const gegevens = data.value as PatientGegevens

const formPatient = ref<IPatientAlgemeen>(patient)

const formPatientAdres = ref<Address>(patientAdres)
const formPatientMedisch = ref<Medisch>(patientMedisch)
const formPatientContact = ref<Contact>(patientContact)
const formPatientGegevens = ref<PatientGegevens>(gegevens)

const submitForm = async () => {
  try {
    console.log('submitting form')

    // todo: this function is not submitting the form
    if (!data.value || !thresholds.value) throw new Error('No data or thresholds')
    const updatedPatientData: PatientGegevens = {
      algemeen: formPatient.value,
      adres: formPatientAdres.value,
      medisch: formPatientMedisch.value,
      contact: formPatientContact.value,
      deviceId: gegevens.deviceId,
      id: gegevens.id,
      medicalNotificationThresholds: convertRangeToThresholds(thresholds.value),
    }

    // Send the updated patient data to your API endpoint
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPatientData),
    })

    if (response.ok) {
      //execute the fetch again to update the data
      execute()
      // Handle successful update
      console.log('Patient data updated successfully')
      alert('Patient data updated successfully')
      // todo: redirect user to patient detail page
      console.log(fetch)
    } else {
      // Handle update error
      console.error('Failed to update patient data')
    }
  } catch (error) {
    console.error('An error occurred while updating patient data:', error)
  }
}

const patientForGoback = { ...patient }
const editLinkName = computed(
  () => `${patientForGoback.voornaam} ${patientForGoback.naam} | Edit`,
)



watch(
  notificationsEnabled,
  () => {
    if (!notificationsEnabled.value) return
    const url = `https://dokterservice.blackdune-2fd1ec46.northeurope.azurecontainerapps.io/dokter/${user?.localAccountId}/patient/${notificationsEnabled.value.patientId}/notifications`
    $fetch(url, {
      method: "POST",
      body: JSON.stringify(notificationsEnabled.value),
      headers: {
        "Content-Type": "application/json",
      },
    })
  },
  { deep: true },
)

const thresholds = ref<INotificationRange>();
watch(data,
  () => {
    console.log('data changed to:', data.value)
    if (!data.value || !data.value.medicalNotificationThresholds) return
    thresholds.value = convertThresholdsToRange(data.value.medicalNotificationThresholds)
    console.log('thresholds', thresholds.value)
  },
  {
    immediate: true,
  }
)
const fireRangeUpdate = () => {
  console.log("update")
  const url = `https://patientgegevens.blackdune-2fd1ec46.northeurope.azurecontainerapps.io/patient/${id.value}/thresholds`
  // convert the thresholds to the correct format
  if  (!thresholds.value) return
  const updatedThresholds = convertRangeToThresholds(thresholds.value)
  $fetch(url, {
    method: "PUT",
    body: JSON.stringify(updatedThresholds),
    headers: {
      "Content-Type": "application/json",
    },
  })
}
const createThresholds = async () => {
  if (!gegevens.medicalNotificationThresholds) {
    gegevens.medicalNotificationThresholds = {
      ademhalingsfrequentie: {
        min: 0,
        max: 0,
      },
      hartslag: {
        min: 0,
        max: 0,
      },
      bloedzuurstof: {
        min: 0,
        max: 0,
      },
      temperatuur: {
        min: 0,
        max: 0,
      },
      bloeddrukDiastolisch: {
        min: 0,
        max: 0,
      },
      bloeddrukSystolisch: {
        min: 0,
        max: 0,
      },
    }
    const url = `https://patientgegevens.blackdune-2fd1ec46.northeurope.azurecontainerapps.io/patient/${id.value}/thresholds`
    await $fetch(url, {
      method: "PUT",
      body: JSON.stringify(gegevens.medicalNotificationThresholds),
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
  if (notificationsError.value) {
    // post the enabled notifications
    if (!notificationsEnabled.value) {
      notificationsEnabled.value = {
        patientId: id.value,
        ademhalingsfrequentie: false,
        hartslag: false,
        bloedzuurstof: false,
        temperatuur: false,
        bloeddruk: false,
        masterSwitch: false,
      }
    }

  }
  await execute()
  await refreshNotifications()
}

</script>

<template>
  <div class='m-5 flex flex-col items-center justify-between md:flex-row'>
    <pressables-goback
      :link_name='editLinkName'
      :link_path='`/dokter/patienten/${id.valueOf}/gegevens`'
    />
    <button type='submit'>
      <PressablesSaveButton></PressablesSaveButton>
    </button>
    <!-- <PressablesSaveButton @click="saveFormData"></PressablesSaveButton> -->
  </div>
  <form @submit.prevent='submitForm'>
    <div class='mx-10 flex items-start justify-end'>

    </div>
    <div class='mx-5 flex flex-col flex-wrap gap-12 md:flex-row lg:mx-20'>
      <!-- persoonlijke -->
      <div class=''
           v-if='notificationsEnabled && thresholds'>
        <!-- <FormsSelectDevice></FormsSelectDevice> -->
        <div class='flex flex-row justify-between'>
          <TextKop2
            title='Slaat automatisch op'
          >meldingen 🛈</TextKop2>
          <Switch
            v-model='notificationsEnabled.masterSwitch'
            :class="notificationsEnabled.masterSwitch ? 'bg-tertiary-400' : 'bg-tertiary-200'"
            class='relative inline-flex h-6  w-11 items-center rounded-full'
          >
            <span class='sr-only'>zet alle meldingen aan/uit</span>
            <span
              :class="notificationsEnabled.masterSwitch ? 'translate-x-6' : 'translate-x-1'"
              class='inline-block h-4 w-4 transform rounded-full bg-white transition'
            />
          </Switch>
        </div>
        <div class='mt-4'>
          <div class='flex flex-row justify-between content-center'
               v-if='notificationsEnabled'>
            <text-kop3>Ademfrequentie</text-kop3>
            <Switch
              v-model='notificationsEnabled.ademhalingsfrequentie'
              :class="notificationsEnabled.ademhalingsfrequentie ? 'bg-tertiary-400' : 'bg-tertiary-200'"
              class='relative inline-flex h-6  w-11 items-center rounded-full'
            >
              <span class='sr-only'>Enable notifications</span>
              <span
                :class="notificationsEnabled.ademhalingsfrequentie ? 'translate-x-6' : 'translate-x-1'"
                class='inline-block h-4 w-4 transform rounded-full bg-white transition'
              />
            </Switch>
          </div>
          <template-slider
            class='-mx-5 mt-0'
            v-model='thresholds.ademhalingsfrequentie'
            @change='fireRangeUpdate'
            :min='0'
            :max='100'
          />
        </div>
        <div class='mt-8'>
          <div class='flex flex-row justify-between content-center '>
            <text-kop3>Bloedzuurstof</text-kop3>
            <Switch
              v-model='notificationsEnabled.bloedzuurstof'
              :class="notificationsEnabled.bloedzuurstof ? 'bg-tertiary-400' : 'bg-tertiary-200'"
              class='relative inline-flex h-6  w-11 items-center rounded-full'
            >
              <span class='sr-only'>Enable notifications</span>
              <span
                :class="notificationsEnabled.bloedzuurstof ? 'translate-x-6' : 'translate-x-1'"
                class='inline-block h-4 w-4 transform rounded-full bg-white transition'
              />
            </Switch>
          </div>
          <template-slider
            class='-mx-5'
            v-model='thresholds.bloedzuurstof'
            @change='fireRangeUpdate'
            :min='67'
            :max='100'
          />
        </div>
        <div class='mt-4'>
          <div class='flex flex-row justify-between content-center '>
            <text-kop3>Hartslag</text-kop3>
            <Switch
              v-model='notificationsEnabled.hartslag'
              :class="notificationsEnabled.hartslag ? 'bg-tertiary-400' : 'bg-tertiary-200'"
              class='relative inline-flex h-6  w-11 items-center rounded-full'
            >
              <span class='sr-only'>Enable notifications</span>
              <span
                :class="notificationsEnabled.hartslag ? 'translate-x-6' : 'translate-x-1'"
                class='inline-block h-4 w-4 transform rounded-full bg-white transition'
              />
            </Switch>
          </div>
          <template-slider
            class='-mx-5'
            v-model='thresholds.hartslag'
            @change='fireRangeUpdate'
            :min='10'
            :max='160'
          />
        </div>
        <div class='mt-4'>
          <div class='flex flex-row justify-between content-center '>
            <text-kop3>Bloeddruk</text-kop3>
            <Switch
              v-model='notificationsEnabled.bloeddruk'
              :class="notificationsEnabled.bloeddruk ? 'bg-tertiary-400' : 'bg-tertiary-200'"
              class='relative inline-flex h-6  w-11 items-center rounded-full'
            >
              <span class='sr-only'>Enable notifications</span>
              <span
                :class="notificationsEnabled.bloeddruk ? 'translate-x-6' : 'translate-x-1'"
                class='inline-block h-4 w-4 transform rounded-full bg-white transition'
              />
            </Switch>
          </div>
          <p class='text-xs text-gray-500'>systolisch</p>
          <template-slider
            class='-mx-5'
            v-model='thresholds.bloeddrukSystolisch'
            @change='fireRangeUpdate'
            :min='0'
            :max='200'
          />
          <p class='text-xs text-gray-500'>diastolisch</p>
          <template-slider
            class='-mx-5'
            v-model='thresholds.bloeddrukDiastolisch'
            @change='fireRangeUpdate'
            :min='0'
            :max='150'
          />


        </div>
        <div class='mt-4'>
          <div class='flex flex-row justify-between content-center '>
            <text-kop3>temperatuur</text-kop3>
            <Switch
              v-model='notificationsEnabled.temperatuur'
              :class="notificationsEnabled.temperatuur ? 'bg-tertiary-400' : 'bg-tertiary-200'"
              class='relative inline-flex h-6  w-11 items-center rounded-full'
            >
              <span class='sr-only'>Enable notifications</span>
              <span
                :class="notificationsEnabled.temperatuur ? 'translate-x-6' : 'translate-x-1'"
                class='inline-block h-4 w-4 transform rounded-full bg-white transition'
              />
            </Switch>
          </div>
            <template-slider
              class='-mx-5'
              v-model='thresholds.temperatuur'
              @change='fireRangeUpdate'
              :min='33'
              :max='42'
            />
        </div>
      </div>
      <div v-else-if='!gegevens.medicalNotificationThresholds || notificationsError'>
        <p>Meldingen van deze patient staan uit.</p>
        <pressables-button
          @click='createThresholds'
        >
          Zet je meldingen aan
        </pressables-button>
      </div>

      <div class='flex'>
        <div>
          <TextKop2 class='mb-5'>Persoonlijke gegevens</TextKop2>
          <forms-text-input
            :textValue='patient.voornaam'
            v-model='patient.voornaam'
            @update:textValue='patient.voornaam = $event'
          />
          <forms-surname-input
            :surnameValue='patient.naam'
            v-model='patient.naam'
            @update:surnameValue='patient.naam = $event'
          />
          <forms-gender-input
            :genderValue='patient.geslacht'
            v-model='patient.geslacht'
            @update:genderValue='patient.geslacht = $event'
          />
          <forms-country-input
            :countryValue='patient.geboorteland'
            v-model='patient.geboorteland'
            @update:countryValue='patient.geboorteland = $event'
          />
          <forms-date-input
            :birthDateValue='patient.geboorteDatum'
            v-model='patient.geboorteDatum'
            @update:birthDateValue='patient.geboorteDatum = $event'
          />
          <TextKop2 class='mt-3 mb-4'>Adres informatie</TextKop2>
          <forms-city-input
            :cityValue='patientAdres.gemeente'
            v-model='patientAdres.gemeente'
            @update:cityValue='patientAdres.gemeente = $event'
          />
          <forms-street-input
            :textStreetNameValue='patientAdres.straat'
            v-model='patientAdres.straat'
            @update:textStreetNameValue='patientAdres.straat = $event'
          />
          <forms-postalcode-inputs
            v-model:house-number-value='patientAdres.nr'
            v-model:postalcode-value='patientAdres.postcode'
          />
          <TextKop2 class='mb-4 mt-3'>Contact gegevens</TextKop2>
          <forms-email-input
            :emailValue='patientContact.email'
            v-model='patientContact.email'
            @update:emailValue='patientContact.email = $event'
          />
          <forms-telephone-input
            :phoneNumberValue='patientContact.telefoon'
            v-model='patientContact.telefoon'
            @update:phoneNumberValue='patientContact.telefoon = $event'
          />
        </div>
      </div>

      <!-- medisch -->
      <div class='flex'>
        <div>
          <TextKop2 class='mb-5'>Medische gegevens</TextKop2>
          <FormsLenghtInput
            :lengthValue='patientMedisch.lengte'
            v-model='patientMedisch.lengte'
            @update:lengthValue='patientMedisch.lengte = parseInt($event)'
          ></FormsLenghtInput>
          <FormsWeightInput
            :weightValue='patientMedisch.gewicht'
            v-model='patientMedisch.gewicht'
            @update:weightValue='patientMedisch.gewicht = parseInt($event)'
          ></FormsWeightInput>
          <FormsBloodtypeInput
            :bloodTypeValue='patientMedisch.bloedgroep'
            v-model='patientMedisch.bloedgroep'
            @update:bloodTypeValue='patientMedisch.bloedgroep = $event'
          ></FormsBloodtypeInput>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped>
/* Styles */
</style>
