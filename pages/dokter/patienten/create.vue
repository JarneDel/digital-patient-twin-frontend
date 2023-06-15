<script setup lang="ts">
import { ref } from 'vue'
import { AlertType } from '~/interfaces/AlertType'
import {
  IPatientAlgemeen,
  PatientGegevens,
  Address,
  Medisch,
  Contact,
} from '~/interfaces/IPatient'
useHead({
  title: 'Nieuwe patiënt',
  meta: [
    {
      name: 'description',
      content: 'Patiënt gegevens aanmaken.',
    },
  ],
})

const url = `https://patientgegevens--hml08fh.blackdune-2fd1ec46.northeurope.azurecontainerapps.io/patient`
const notifcationurl = `https://patientgegevens--hml08fh.blackdune-2fd1ec46.northeurope.azurecontainerapps.io/patient/878c95cf-e82d-40a5-a56c-8790427f1657/thresholds`

const patient = reactive<IPatientAlgemeen>({
  // Initialize the patient data with empty values or default values
  id: '',
  voornaam: 'Voorbeeld voornaam',
  naam: 'voorbeeld naam',
  geslacht: 'man',
  geboorteland: 'België',
  geboorteDatum: '19/05/2001',
})
const patientAdres = reactive<Address>({
  gemeente: 'Stad',
  straat: 'voorbeeld straat',
  postcode: 8500,
  nr: '21',
})
const patientMedisch = reactive<Medisch>({
  lengte: 180,
  gewicht: 70,
  bloedgroep: 'A+',
})
const patientContact = reactive<Contact>({
  email: 'user@hotmail.com',
  telefoon: '04555555555',
})

const submitForm = async () => {
  try {
    const newPatientData = {
      algemeen: { ...patient },
      adres: { ...patientAdres },
      medisch: { ...patientMedisch },
      contact: { ...patientContact },
    }

    // Send the new patient data to your API endpoint using POST request
    const response = await $fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPatientData),
    })

    if (response) {
      // Handle successful creation
      console.log('New patient created successfully')
      alert('New patient created successfully')
    } else {
      // Handle creation error
      console.error('Failed to create new patient')
    }
  } catch (error) {
    console.error('An error occurred while creating new patient:', error)
  }
}
</script>

<template>
  <div class="m-5 flex flex-col items-center justify-between md:flex-row">
    <pressables-goback
      link_name="Nieuw Patiënt creëren"
      link_path="/dokter/patienten/"
    />

    <!-- <PressablesSaveButton @click="saveFormData"></PressablesSaveButton> -->
  </div>
  <form @submit.prevent="submitForm">
    <div class="mx-10 flex items-start justify-end">
      <button type="submit">
        <PressablesSaveButton></PressablesSaveButton>
      </button>
    </div>
    <div class="mx-5 flex flex-col gap-4 lg:mx-20 lg:flex-row">
      <!-- persoonlijke -->
      <div class="">
        <FormsSelectDevice></FormsSelectDevice>
        <pressables-toggle
          :type="AlertType.Temperatuur"
          :text="AlertType.Temperatuur"
        ></pressables-toggle>
        <div>
          <template-slider
            :type="AlertType.AdemsFrequentie"
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
            :placeholder="patient.voornaam"
            @update:textValue="patient.voornaam = $event"
          ></forms-text-input>
          <forms-surname-input
            :surnameValue="patient.naam"
            v-model="patient.naam"
            @update:surnameValue="patient.naam = $event"
          >
          </forms-surname-input>
          <forms-gender-input
            :genderValue="patient.geslacht"
            v-model="patient.geslacht"
            @update:genderValue="patient.geslacht = $event"
          ></forms-gender-input>
          <forms-country-input
            :countryValue="patient.geboorteland"
            v-model="patient.geboorteland"
            @update:countryValue="patient.geboorteland = $event"
          ></forms-country-input>
          <forms-date-input
            :birthDateValue="patient.geboorteDatum"
            v-model="patient.geboorteDatum"
            @update:birthDateValue="patient.geboorteDatum = $event"
          >
          </forms-date-input>
          <TextKop2 class="my-5">Adres informatie</TextKop2>
          <forms-city-input
            :cityValue="patientAdres.gemeente"
            v-model="patientAdres.gemeente"
            @update:cityValue="patientAdres.gemeente = $event"
          ></forms-city-input>
          <forms-street-input
            :textStreetNameValue="patientAdres.straat"
            v-model="patientAdres.straat"
            @update:textStreetNameValue="patientAdres.straat = $event"
          ></forms-street-input>
          <forms-postalcode-inputs
            @update:postalcodeValue="patientAdres.postcode = parseInt($event)"
            @update:houseNumberValue="patientAdres.nr = $event"
          ></forms-postalcode-inputs>
          <TextKop2 class="my-5">Contact gegevens</TextKop2>
          <forms-email-input
            :emailValue="patientContact.email"
            v-model="patientContact.email"
            @update:emailValue="patientContact.email = $event"
          ></forms-email-input>
          <forms-telephone-input
            :phoneNumberValue="patientContact.telefoon"
            v-model="patientContact.telefoon"
            @update:phoneNumberValue="patientContact.telefoon = $event"
          ></forms-telephone-input>
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
