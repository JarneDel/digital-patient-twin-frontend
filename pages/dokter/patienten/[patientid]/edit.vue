<script setup lang="ts">
import { d } from 'ofetch/dist/error-04138797'
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
  title: 'Gegevens patiënt',
  meta: [
    {
      name: 'description',
      content: 'Patiënt gegevens aanpassen.',
    },
  ],
})

const patientId = '80406cff-3f96-4569-a177-b20d4f5ab276'
const url = `https://patientgegevens--hml08fh.blackdune-2fd1ec46.northeurope.azurecontainerapps.io/patient/${patientId}`

const { error, data, pending } = await useFetch<PatientGegevens>(url)
const patient: IPatientAlgemeen = data.value?.algemeen as IPatientAlgemeen
const patientAdres: Address = data.value?.adres as Address
const patientMedisch: Medisch = data.value?.medisch as Medisch
const patientContact: Contact = data.value?.contact as Contact

const formPatient = ref<IPatientAlgemeen>(patient)
const formPatientAdres = ref<Address>(patientAdres)
const formPatientMedisch = ref<Medisch>(patientMedisch)
const formPatientContact = ref<Contact>(patientContact)

const submitForm = async () => {
  try {
    const updatedPatientData = {
      deviceId: 'testdatagenerator', //deviceid remains unchanged when updated
      algemeen: formPatient.value,
      adres: formPatientAdres.value,
      medisch: formPatientMedisch.value,
      contact: formPatientContact.value,
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
      // Handle successful update
      console.log('Patient data updated successfully')
      alert('Patient data updated successfully')
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
      link_path="/dokter/patienten/[patientid]/gegevens"
    />

    <!-- <PressablesSaveButton @click="saveFormData"></PressablesSaveButton> -->
  </div>
  <form @submit.prevent="submitForm">
    <div class="mx-10 flex items-start justify-end">
      <button type="submit" class="md:fixed">
        <PressablesSaveButton></PressablesSaveButton>
      </button>
    </div>
    <div class="mx-5 flex flex-col gap-4 lg:mx-20 lg:flex-row">
      <!-- persoonlijke -->
      <div class="">
        <FormsSelectDevice></FormsSelectDevice>
        <pressables-toggle
          :type="AlertType.temperature"
          :text="AlertType.temperature"
        ></pressables-toggle>
        <div>
          <template-slider
            class="-mx-5"
            :type="AlertType.breathingRate"
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
