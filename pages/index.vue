<script setup lang="ts">
import DropDownSelector from '~/components/pressables/dropDownSelector.vue'
import { AlertType } from '~/interfaces/AlertType'
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
  achternaam: 'Jonkheere',
  geslacht: 'M',
  voornaam: 'Joshy',
  geboortedatum: new Date(1980, 1, 1),
  id: 1,
})



</script>

<template>
    <div class="bg-pink-800">Hello index</div>
    <PressablesButton>Hello world</PressablesButton>

    <div class="mx-12 my-2">
      <chart-table class="" />
    </div>

    <TemplateDashboardCards patient="15" />
    <PressablesEdit @clickDelete="clickEdit" v-model:is-editing="isEditing" />
    <PressablesSelector
      :options="['one', 'two', 'three', 'four']"
      v-model:selected="selected"
    />
  <PatientsPatientbanner
    imgUrl="imgUrl"
    patient="Joshy Jonkheere"
    age="32 jaar"
    gender="Man"
    alertDate="20/10/2023"
    :typeAlert="AlertType.temperature"
  ></PatientsPatientbanner>
   <pressables-goback link="Ga terug"></pressables-goback>
   <pressables-switch></pressables-switch>
   <FormsBirthDateInput></FormsBirthDateInput>
  <alerts-pinned
    value='37'
    :type='AlertType.temperature'
    name='Joshy Jonkheere'
    :datetime='new  Date(Date.now() - 2 * 60 * 60 * 1000)'
    level='danger'
  />
  <drop-down-selector class='m-3' v-model:selected='selected2' :options='["one", "two", "three"]' type='searchable'/>
<!---->
  <patients-patientcard-edit :patient="registerPatient"
  />
  <PressablesSaveButton text="Save"></PressablesSaveButton>
  <alerts-pinned
    value="37"
    :type="AlertType.temperature"
    name="Joshy Jonkheere"
    :datetime="new Date(Date.now() - 2  * 3 * 1000)"
    level="danger"
  ></alerts-pinned>
  <drop-down-selector
    v-model:selected='selected'
    :options="['one', 'two', 'three']"
  />
  <template-slider :type='AlertType.breathingRate' :min=0 :max=100 />
   <cards-login></cards-login>
   <TemplateInputs></TemplateInputs>
<!--   <PatientsSm />-->
</template>

<style scoped></style>
