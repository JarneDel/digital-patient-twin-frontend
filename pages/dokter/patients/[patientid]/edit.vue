<script setup lang="ts">
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

const url =
  'https://patientgegevens--hml08fh.blackdune-2fd1ec46.northeurope.azurecontainerapps.io/patient/878c95cf-e82d-40a5-a56c-8790427f1657'

const { error, data, pending } = await useFetch<PatientGegevens>(url)
const patient: IPatientAlgemeen = data.value?.algemeen as IPatientAlgemeen
const patientAdres: Address = data.value?.adres as Address
const patientMedisch: Medisch = data.value?.medisch as Medisch
const patientContact: Contact = data.value?.contact as Contact

async function saveFormData() {
  try {
    // Make a POST request to your API endpoint with the formValues
    const response = await fetch(
      'https://patientgegevens--hml08fh.blackdune-2fd1ec46.northeurope.azurecontainerapps.io/patient/878c95cf-e82d-40a5-a56c-8790427f1657',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues.value),
      },
    )

    // Handle the response or perform any additional actions
    if (response.ok) {
      // Form data saved successfully
      console.log('Form data saved!')
    } else {
      // Handle error case
      console.error('Failed to save form data.')
    }
  } catch (error) {
    // Handle error case
    console.error('An error occurred while saving form data:', error)
  }
}
</script>

<template>
  <div class="m-5 flex flex-col items-center justify-between md:flex-row">
    <pressables-goback
      link_name="nieuw patienten toevoegen"
      link_path="/dokter/patienten"
    />

    <PressablesSaveButton @click="saveFormData"></PressablesSaveButton>
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
        <FormsTextInput
          :value="patient.voornaam"
          @update:value="patient.voornaam = $event"
        ></FormsTextInput>
        <FormsSurnameInput
          :value="patient.naam"
          @update:value="patient.naam = $event"
        ></FormsSurnameInput>
        <FormsBirthDateInput></FormsBirthDateInput>
        <forms-country-input
          :value="patient.geboorteland"
          @update:value="patient.geboorteland = $event"
        ></forms-country-input>
        <TextKop2 class="my-5">Adresgegevens</TextKop2>
        <FormsStreetInput
          :value="patientAdres.straat"
          @update:value="patientAdres.straat = $event"
        ></FormsStreetInput>
        <forms-postalcode-inputs
          :postalcodeValue="patientAdres.postcode"
          @update:postalcodeValue="patientAdres.postcode = $event"
          @update:huisNumberValue="patientAdres.nr = $event"
          :huisNumberValue="patientAdres.nr"
        ></forms-postalcode-inputs>
        <TextKop2 class="my-5">Contact gegevens</TextKop2>
        <forms-email-input
          :emailValue="patientContact.email"
          @update:emailValue="patientContact.email = $event"
        ></forms-email-input>
        <forms-telephone-input
          :telephoneValue="patientContact.telefoon"
          @update:telephoneValue="patientContact.telefoon = $event"
        ></forms-telephone-input>
      </div>
    </div>

    <!-- medisch -->
    <div class="flex">
      <div>
        <TextKop2 class="my-5">Medische gegevens</TextKop2>
        <FormsLenghtInput
          :value="patientMedisch.lengte + ' cm'"
          @update:value="patientMedisch.lengte = $event"
        ></FormsLenghtInput>
        <FormsWeightInput
          :value="patientMedisch.gewicht + ' kg'"
          @update:value="patientMedisch.gewicht = $event"
        ></FormsWeightInput>
        <FormsBloodtypeInput
          :value="patientMedisch.bloedgroep"
          @update:value="patientMedisch.bloedgroep = $event"
        ></FormsBloodtypeInput>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
