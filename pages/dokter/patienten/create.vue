<script setup lang="ts">
import { PatientGegevens } from '~/interfaces/IPatient'

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
const {createEmptyPatient} = usePatientHelper()
const patient = reactive<PatientGegevens>(
  createEmptyPatient()
)
const user = useUser()


const submitForm = async () => {
  try {
    // Send the new patient data to your API endpoint using POST request
    const response = await $fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patient),
    })
    const addToDokterUrl = `https://dokterservice.blackdune-2fd1ec46.northeurope.azurecontainerapps.io/dokter/${user.value?.localAccountId}/patient/${response}`
    await $fetch(addToDokterUrl, {
      method: 'POST',
    })
    navigateTo(`/dokter/patienten/${response}`)
  } catch (error) {
    console.error('An error occurred while creating new patient:', error)
  }
}
</script>

<template>
  <form @submit.prevent='submitForm'>
    <div class="m-5 flex items-center justify-between flex-row lg:mx-20 max-w-[74rem]">
      <pressables-goback
        link_name="Nieuw Patiënt creëren"
        link_path="/dokter/patienten/"
      />
      <button type='submit'>
        <PressablesSaveButton></PressablesSaveButton>
      </button>
    </div>
    <div class='mx-5 flex flex-col flex-wrap gap-32 md:flex-row md:mx-52'>
      <div class='flex'>
        <div>
          <TextKop2 class='mb-5'>Persoonlijke gegevens</TextKop2>
          <forms-text
            v-model='patient.algemeen.voornaam'
            label='Voornaam'
            input-id='voornaam'
          />
          <forms-text
            v-model='patient.algemeen.naam'
            label='Achternaam'
            input-id='naam'
          />
          <forms-input-select
            v-model='patient.algemeen.geslacht'
            input-id='geslacht'
            label='Geslacht'
            :options='["Man", "Vrouw", "Anders"]'/>
          <forms-text
            v-model='patient.algemeen.geboorteland'
            input-id='geboorteland'
            label='Geboorteland'/>
          <forms-text
            v-model='patient.algemeen.geboorteDatum'
            input-id='geboorteDatum'
            label='Geboortedatum'
            type='date'/>

          <TextKop2 class='mt-3 mb-4'>Adres informatie</TextKop2>
          <forms-text
            v-model='patient.adres.gemeente'
            input-id='gemeente'
            label='Gemeente'
          />
          <forms-text-aria
            v-model='patient.adres.straat'
            input-id='straat'
            label='Straatnaam'/>
          <div class='flex gap-4 flex-row'>
            <forms-text
              v-model='patient.adres.postcode'
              input-id='Postcode'
              label='Postcode'
            />
            <forms-text
              v-model='patient.adres.nr'
              input-id='huisnummer'
              label='Huisnummer'
            />
          </div>
        </div>
      </div>

      <!-- medisch -->
      <div class='flex'>
        <div>
          <TextKop2 class='mb-5'>Medische gegevens</TextKop2>
          <forms-text
            v-model='patient.medisch.lengte'
            input-id='length'
            label='Lengte [cm]'
          />
          <forms-text
            v-model='patient.medisch.gewicht'
            input-id='weight'
            label='Gewicht [kg]'
          />

          <forms-input-select
            input-id='bloedgroep'
            label='Bloedgroep'
            :options='["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]'
            v-model='patient.medisch.bloedgroep'
          />

          <TextKop2 class='mb-4 mt-3'>Contact gegevens</TextKop2>
          <forms-text
            v-model='patient.contact.email'
            input-id='email'
            label='Email'
            type='email'
          />
          <forms-text
            v-model='patient.contact.telefoon'
            input-id='telefoon'
            label='Telefoon'
            type='tel'
          />

        </div>
      </div>
    </div>
  </form>
</template>

<style scoped>
/* Styles */
</style>
