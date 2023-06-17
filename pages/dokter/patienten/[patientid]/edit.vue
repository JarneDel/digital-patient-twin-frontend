<script setup lang="ts">
import { ref } from 'vue'
import { AlertType } from '~/interfaces/AlertType'
import {
  Address,
  Contact,
  IMedicalNotifcationsTresholds,
  IPatientAlgemeen,
  Medisch,
  PatientGegevens,
} from '~/interfaces/IPatient'

useHead({
  title: 'Gegevens patiënt',
  meta: [
    {
      name: 'description',
      content: 'Patiënt gegevens aanpassen.',
    },
  ],
})

const routeID = useRoute().params.patientid as string
const id = ref(routeID)
//get patient data
const url = `https://patientgegevens--hml08fh.blackdune-2fd1ec46.northeurope.azurecontainerapps.io/patient/${id.value}`

const notifcationurl = `https://patientgegevens--hml08fh.blackdune-2fd1ec46.northeurope.azurecontainerapps.io/patient/${id.value}/thresholds`

console.log(notifcationurl)

const { error, data, pending, execute } = await useFetch<PatientGegevens>(url)
const patient: IPatientAlgemeen = data.value?.algemeen as IPatientAlgemeen
const patientAdres: Address = data.value?.adres as Address
const patientMedisch: Medisch = data.value?.medisch as Medisch
const patientContact: Contact = data.value?.contact as Contact
const gegevens = data.value as PatientGegevens
const thresholds = data.value?.medicalNotificationThresholds as IMedicalNotifcationsTresholds

const formPatient = ref<IPatientAlgemeen>(patient)

const formPatientAdres = ref<Address>(patientAdres)
const formPatientMedisch = ref<Medisch>(patientMedisch)
const formPatientContact = ref<Contact>(patientContact)
const formPatientGegevens = ref<PatientGegevens>(gegevens)

const submitForm = async () => {
  try {
    const updatedPatientData: PatientGegevens = {
      algemeen: formPatient.value,
      adres: formPatientAdres.value,
      medisch: formPatientMedisch.value,
      contact: formPatientContact.value,
      deviceId: gegevens.deviceId,
      id: gegevens.id,
      medicalNotificationThresholds: thresholds
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
</script>

<template>
  <div class="m-5 flex flex-col items-center justify-between md:flex-row">
    <pressables-goback
      :link_name="editLinkName"
      :link_path="`/dokter/patienten/${id.valueOf}/gegevens`"
    />

    <!-- <PressablesSaveButton @click="saveFormData"></PressablesSaveButton> -->
  </div>
  <form @submit.prevent="submitForm">
    <div class="mx-10 flex items-start justify-end">
      <button type="submit">
        <PressablesSaveButton></PressablesSaveButton>
      </button>
    </div>
    <div class="mx-5 flex flex-col flex-wrap gap-4 md:flex-row lg:mx-20">
      <!-- persoonlijke -->
      <div class="">
        <!-- <FormsSelectDevice></FormsSelectDevice> -->
        <TextKop2>meldingen</TextKop2>
        <div class="mt-4">
          <pressables-switch
            :text="AlertType[AlertType.AdemsFrequentie]"
            :type="AlertType[AlertType.AdemsFrequentie]"
          ></pressables-switch>
          <template-slider
            class="-mx-5"
            :type="AlertType[AlertType.AdemsFrequentie]"
            :min="0"
            :max="100"
          />
        </div>
        <div class="mt-4">
          <pressables-switch
            :text="AlertType[AlertType.Hartslag]"
            :type="AlertType[AlertType.Hartslag]"
          ></pressables-switch>
          <template-slider
            class="-mx-5"
            :type="AlertType[AlertType.Hartslag]"
            :min="0"
            :max="100"
          />
        </div>
        <div class="mt-4">
          <pressables-switch
            :text="AlertType[AlertType.Bloeddruk]"
            :type="AlertType[AlertType.Bloeddruk]"
          ></pressables-switch>
          <template-slider
            class="-mx-5"
            :type="AlertType[AlertType.Bloeddruk]"
            :min="0"
            :max="100"
          />
        </div>
        <div class="mt-4">
          <pressables-switch
            :text="AlertType[AlertType.Temperatuur]"
            :type="AlertType[AlertType.Temperatuur]"
          ></pressables-switch>
          <template-slider
            class="-mx-5"
            :type="AlertType[AlertType.Temperatuur]"
            :min="0"
            :max="100"
          />
        </div>
      </div>

      <div class="flex">
        <div>
          <TextKop2 class="my-5">Persoonlijke gegevens</TextKop2>
          <forms-text-input
            :textValue="patient.voornaam"
            v-model="patient.voornaam"
            @update:textValue="patient.voornaam = $event"
          />
          <forms-surname-input
            :surnameValue="patient.naam"
            v-model="patient.naam"
            @update:surnameValue="patient.naam = $event"
          />
          <forms-gender-input
            :genderValue="patient.geslacht"
            v-model="patient.geslacht"
            @update:genderValue="patient.geslacht = $event"
          />
          <forms-country-input
            :countryValue="patient.geboorteland"
            v-model="patient.geboorteland"
            @update:countryValue="patient.geboorteland = $event"
          />
          <forms-date-input
            :birthDateValue="patient.geboorteDatum"
            v-model="patient.geboorteDatum"
            @update:birthDateValue="patient.geboorteDatum = $event"
          />
          <TextKop2 class="my-5">Adres informatie</TextKop2>
          <forms-city-input
            :cityValue="patientAdres.gemeente"
            v-model="patientAdres.gemeente"
            @update:cityValue="patientAdres.gemeente = $event"
          />
          <forms-street-input
            :textStreetNameValue="patientAdres.straat"
            v-model="patientAdres.straat"
            @update:textStreetNameValue="patientAdres.straat = $event"
          />
          <forms-postalcode-inputs
            v-model:house-number-value='patientAdres.nr'
            v-model:postalcode-value='patientAdres.postcode'
          />
          <TextKop2 class="my-5">Contact gegevens</TextKop2>
          <forms-email-input
            :emailValue="patientContact.email"
            v-model="patientContact.email"
            @update:emailValue="patientContact.email = $event"
          />
          <forms-telephone-input
            :phoneNumberValue="patientContact.telefoon"
            v-model="patientContact.telefoon"
            @update:phoneNumberValue="patientContact.telefoon = $event"
          />
        </div>
      </div>

      <!-- medisch -->
      <div class="flex">
        <div>
          <TextKop2 class="my-5">Medische gegevens</TextKop2>
          <FormsLenghtInput
            :lengthValue="patientMedisch.lengte"
            v-model="patientMedisch.lengte"
            @update:lengthValue="patientMedisch.lengte = parseInt($event)"
          ></FormsLenghtInput>
          <FormsWeightInput
            :weightValue="patientMedisch.gewicht"
            v-model="patientMedisch.gewicht"
            @update:weightValue="patientMedisch.gewicht = parseInt($event)"
          ></FormsWeightInput>
          <FormsBloodtypeInput
            :bloodTypeValue="patientMedisch.bloedgroep"
            v-model="patientMedisch.bloedgroep"
            @update:bloodTypeValue="patientMedisch.bloedgroep = $event"
          ></FormsBloodtypeInput>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped>
/* Styles */
</style>
