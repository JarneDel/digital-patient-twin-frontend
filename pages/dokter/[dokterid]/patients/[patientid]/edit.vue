<script setup lang="ts">
import { AlertType } from '~/interfaces/AlertType'
</script>

<template>
  <div class="align-start m-20 flex justify-between">
    <PressablesGoback link="Nieuwe Patient aanmaken"></PressablesGoback>
    <PressablesSaveButton></PressablesSaveButton>
  </div>

  <forms class="mx-20 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
    <!-- persoonlijke -->
    <div class="-pl-4">
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

    <div class="pl-4">
      <TextKop2>Persoonlijke gegevens</TextKop2>
      <FormsTextInput></FormsTextInput>
      <FormsEmailInput></FormsEmailInput>
      <FormsBirthDateInput></FormsBirthDateInput>
    </div>

    <!-- medisch -->
    <div>
      <TextKop2>Medische gegevens</TextKop2>
      <FormsTextInput></FormsTextInput>
    </div>
  </forms>
</template>

<style scoped></style>
