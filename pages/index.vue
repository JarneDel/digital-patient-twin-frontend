<script setup lang="ts">
import DropDownSelector from '~/components/pressables/dropDownSelector.vue'
import { AlertType } from '~/interfaces/AlertType'
import goback from '~/components/pressables/goback.vue'

const isEditing = ref(false)
const clickEdit = () => {
  isEditing.value = !isEditing.value
}
const selected = ref('one')
const selected2 = ref('')
watch(selected, () => {
  console.log(selected.value)
})
</script>

<template>
  <!--  <div class="bg-pink-800">Hello index</div>-->
  <!--  <PressablesButton>Hello world</PressablesButton>-->
  <!--  <TemplateDashboardCards patient="15" />-->
  <!--  <PressablesEdit @clickDelete="clickEdit" v-model:is-editing="isEditing" />-->
  <!--  <PressablesSelector-->
  <!--    :options="['one', 'two', 'three', 'four']"-->
  <!--    v-model:selected="selected"-->
  <!--  />-->
  <!-- <goback link="Ga terug"></goback> -->
  <!-- <pressables-switch></pressables-switch> -->
  <!-- <FormsBirthDateInput></FormsBirthDateInput> -->
  <!-- <PatientsPatientbanner
    imgUrl="imgUrl"
    patient="Joshy Jonkheere"
    age="32 jaar"
    gender="Man"
    alertDate="20/10/2023"
    :typeAlert="AlertType.temperature"
  ></PatientsPatientbanner> -->
  <PopupAlert
    value="37"
    :type="AlertType.temperature"
    name="Joshy Jonkheere"
    datetime="1u geleden"
    level="danger"
  ></PopupAlert>
  <PopupAlert
    value="37"
    :type="AlertType.BloodPressure"
    name="Joshy Jonkheere"
    datetime="1u geleden"
    level="warning"
  ></PopupAlert>
  <PopupAlert
    value="95"
    :type="AlertType.oxygen"
    name="Joshy Jonkheere"
    datetime="1u geleden"
    level="good"
  ></PopupAlert>

  <drop-down-selector
    class="m-3"
    v-model:selected="selected2"
    :options="['one', 'two', 'three']"
    type="searchable"
  />

  <!--  <drop-down-selector-->
  <!--    v-model:selected='selected'-->
  <!--    :options="['one', 'two', 'three']"-->
  <!--  ></drop-down-selector>-->

  <alerts-alert-lg
    :type="AlertType.breathingRate"
    name="Joshy Jonkheere"
    birthdate="01/01/2000"
    datetime="1u geleden"
    level="warning"
    value="15"
  />

  <template-slider :type="AlertType.breathingRate" :min="0" :max="100" />

  <!-- <Login></Login> -->
  <!-- <Inputs></Inputs> -->
  <!-- <PatientSm /> -->
</template>

<style scoped></style>
