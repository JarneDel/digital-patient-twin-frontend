<script setup lang="ts">
import { AlertType } from '~/interfaces/AlertType'
useHead({
  title: 'Gegevens patiënt',
  meta: [
    {
      name: 'description',
      content: 'Patiënt gegevens aanpassen.',
    },
  ],
})
</script>

<template>
  <div class="m-5 flex flex-col items-center justify-between md:flex-row">
    <PressablesGoback link="Nieuwe Patient aanmaken"></PressablesGoback>

    <PressablesSaveButton></PressablesSaveButton>
  </div>

  <div
    class="mx-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mx-20 lg:grid-cols-4"
  >
    <!-- persoonlijke -->
    <div class="lg:col-span-1">
      <FormsSelectDevice></FormsSelectDevice>
      <pressables-toggle
        :type="AlertType.temperature"
        :text="AlertType.temperature"
      ></pressables-toggle>
      <div>
        <template-slider :type="AlertType.breathingRate" :min="0" :max="100" />
      </div>
    </div>

    <div class="lg:col-span-1">
      <TextKop2 class="my-5">Persoonlijke gegevens</TextKop2>
      <FormsTextInput></FormsTextInput>
      <FormsSurnameInput></FormsSurnameInput>
      <FormsBirthDateInput></FormsBirthDateInput>
      <forms-country-input></forms-country-input>
      <TextKop2 class="my-5">Adresgegevens</TextKop2>
      <FormsStreetInput></FormsStreetInput>
      <TextKop2 class="my-5">Contact gegevens</TextKop2>
      <forms-email-input></forms-email-input>
      <forms-telephone-input></forms-telephone-input>
      <forms-postalcode-inputs></forms-postalcode-inputs>
    </div>

    <!-- medisch -->
    <div class="lg:col-span-1">
      <TextKop2 class="my-5">Medische gegevens</TextKop2>
      <FormsLenghtInput></FormsLenghtInput>
      <FormsWeightInput></FormsWeightInput>
      <FormsBloodtypeInput></FormsBloodtypeInput>
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
