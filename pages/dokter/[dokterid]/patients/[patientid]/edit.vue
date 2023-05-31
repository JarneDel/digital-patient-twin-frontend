<script setup lang="ts">
import { AlertType } from '~/interfaces/AlertType'
</script>

<template>
  <div class="align-center m-5 flex justify-center lg:justify-between">
    <PressablesGoback link="Nieuwe Patient aanmaken"></PressablesGoback>
    <PressablesSaveButton></PressablesSaveButton>
  </div>

  <forms class="mx-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
    <!-- persoonlijke -->
    <div>
      <FormsSelectDevice></FormsSelectDevice>
      <LazyTextKop2>Meldingen</LazyTextKop2>

      <pressables-toggle
        :type="AlertType.temperature"
        :text="AlertType.temperature"
      ></pressables-toggle>
      <div>
        <template-slider :type="AlertType.breathingRate" :min="0" :max="100" />
      </div>
    </div>

    <div class="lg:mx-20">
      <TextKop2>Persoonlijke gegevens</TextKop2>
      <FormsTextInput></FormsTextInput>
      <FormsSurnameInput></FormsSurnameInput>
      <FormsEmailInput></FormsEmailInput>
      <FormsBirthDateInput></FormsBirthDateInput>
      <TextKop2>Adresgegevens</TextKop2>
    </div>

    <!-- medisch -->
    <div>
      <TextKop2>Medische gegevens</TextKop2>
      <FormsLenghtInput></FormsLenghtInput>
      <FormsWeightInput></FormsWeightInput>
    </div>
  </forms>
</template>

<style scoped></style>
