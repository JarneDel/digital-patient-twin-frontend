<script setup lang="ts">
import DropDownSelector from '~/components/pressables/dropDownSelector.vue'
import { AlertType, IMelding } from '~/interfaces/AlertType'
import { IPatientAlgemeen } from '~/interfaces/IPatient'

const isEditing = ref(false)
const clickEdit = () => {
  isEditing.value = !isEditing.value
}
const selected = ref('one')
const selected2 = ref('')
watch(selected, () => {
  console.log(selected.value)
})
const registerPatient = ref<IPatientAlgemeen>({
  naam: 'Jonkheere',
  geslacht: 'M',
  voornaam: 'Joshy',
  geboorteDatum: new Date(1980, 1, 1),
  id: 1,
})

// is test
const person = ref<IPatientAlgemeen>({
  naam: 'Jonkheere',
  geslacht: 'M',
  voornaam: 'Joshy',
  geboorteDatum: new Date(1980, 1, 1),
  id: 1,
})

</script>

<template>
  <!-- alert on dasboard -->
  <!-- <alerts-lg v-bind:type="" v-bind:alert=""/> -->

  <div>HIER</div>
  <!-- <drop-down-selector
    class="m-3"
    v-model:selected="selected2"
    :options="['one', 'two', 'three']"
    type="searchable"
  />
  <drop-down-selector
    v-model:selected="selected"
    :options="['one', 'two', 'three']"
  /> -->

  <pressables-search class="my-12" :options="['one', 'two', 'three']" v-model:selected="selected" type="small" />
  <pressables-search class="my-12" :options="['one', 'two', 'three']" v-model:selected="selected" type="medium" />
   
  <drop-down-selector class="my-12" :options="['een', 'twee', 'drie']" v-model:selected="selected"/>

  <div>HIER</div>

  <!-- goback -->
  <pressables-goback link="Ga terug" />

  <!-- select device -->
  <forms-select-device />

  <!-- edit -->
  <PressablesEdit @clickDelete="clickEdit" v-model:is-editing="isEditing" />
  
  <!-- deletepatient -->
  <PopupDeletePatient />

  <!-- bg -->
  <div class="bg-pink-800">Hello index</div>
  
  <!-- button -->
  <PressablesButton>Hello world</PressablesButton>
  
  <!-- chart table -->
  <div class="mx-12 my-2">
    <chart-table />
  </div>
  
  <!-- dashboardcard -->
  <TemplateDashboardCards patient="15" />

  <!-- edit button -->
  <PressablesEdit @clickDelete="clickEdit" v-model:is-editing="isEditing" />
  
  <!-- swith -->
  <PressablesSelector
    :options="['one', 'two', 'three', 'four']"
    v-model:selected="selected"
  />

  <!-- patientbanner -->
  <PatientsPatientbanner
    imgUrl="imgUrl"
    patient="Joshy Jonkheere"
    age="32 jaar"
    gender="Man"
    alertDate="20/10/2023"
    :typeAlert="AlertType.temperature"
  />

  <!-- go back -->
  <pressables-goback link="Ga terug" />

  <!-- toggle swith -->
  <pressables-switch />

  <!-- date input -->
  <FormsBirthDateInput />

  <!-- pinned alerts -->
  <alerts-pinned
    value="37"
    :type="AlertType.temperature"
    name="Joshy Jonkheere"
    :datetime="new Date(Date.now() - 2 * 60 * 60 * 1000)"
    level="danger"
  />

  <!-- search -->
  <drop-down-selector
    class="m-3"
    v-model:selected="selected2"
    :options="['one', 'two', 'three']"
    type="searchable"
  />
  
  <!-- patient card edit -->
  <patients-patientcard-edit :patient="registerPatient" />

  <!-- save button -->
  <PressablesSaveButton text="Save" />

  <!-- pinned alerts -->
  <alerts-pinned
    value="37"
    :type="AlertType.temperature"
    name="Joshy Jonkheere"
    :datetime="new Date(Date.now() - 2 * 3 * 1000)"
    level="danger"
  />

  <!-- dropdown -->
  <drop-down-selector
    v-model:selected="selected"
    :options="['one', 'two', 'three']"
  />

  <!-- dubble slider -->
  <template-slider :type="AlertType.breathingRate" :min="0" :max="100" />

  <!-- login card -->
  <cards-login />
  
  <!-- template inputs -->
  <TemplateInputs />
  
  <PatientsSm :patient="person"/>
</template>

<style scoped></style>
