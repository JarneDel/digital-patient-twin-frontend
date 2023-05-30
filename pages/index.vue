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

// test
const history = ref<History[]>()
// fetch('http://localhost:5010/v1.0/invoke/PatientDataService/method/history/878c95cf-e82d-40a5-a56c-8790427f1657?range=7d')
//     .then(response => response.json())
//     .then((data: History[]) => history.value = data);
/////
// const res = await fetch('http://localhost:5010/v1.0/invoke/PatientDataService/method/history/878c95cf-e82d-40a5-a56c-8790427f1657?range=7d')
// history.value = await res.json()
////
try{
  const res = await fetch('http://localhost:5010/v1.0/invoke/PatientDataService/method/history/878c95cf-e82d-40a5-a56c-8790427f1657?range=7d')
  history.value = await res.json()
  
}
catch(err){
  console.log(err)
}




interface History{
  deviceId: string;
  timestamp: string;
  bloeddruk: BloodPressureHistory;
  hartslag: SensorHistory;
  bloedzuurstof: SensorHistory;
  temperatuur: SensorHistory;
  ademFrequentie: SensorHistory;
}

interface BloodPressureHistory{
  systolic: number;
  diastolic: number;
}

interface SensorHistory{
  avg: number;
}




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
  <!-- <PatientsPatientbanner
    imgUrl="imgUrl"
    patient="Joshy Jonkheere"
    age="32 jaar"
    gender="Man"
    alertDate="20/10/2023"
    :typeAlert="AlertType.temperature"
  ></PatientsPatientbanner> -->
  <!-- <goback link="Ga terug"></goback> -->
  <!-- <pressables-switch></pressables-switch> -->
  <!-- <FormsBirthDateInput></FormsBirthDateInput> -->

  <!-- <li v-for="result in history" :key="result.deviceId">{{ result.deviceId }}</li> -->
  <div>hello</div>
  <div v-if="history?.length">{{ history[0].deviceId }}</div>
  <chart-table  :timestamp="[1, 2, 3, 4, 5]" :hartslag="[90, 89, 67, 88, 90]" :bloeddruk="[100, 80, 98, 87, 99]" :bloedzuurstof="[90, 90, 91, 91, 92]" :temperatuur="[36, 36, 36, 36, 36]" :adem-frequentie="[12, 12, 13, 13, 11]"/>
  <!-- <chart-table  :timestamp="[1, 2, 3, 4, 5]" :hartslag="[90, 89, 67, 88, 90]" :bloeddruk="[100, 80, 98, 87, 99]" :bloedzuurstof="[90, 90, 91, 91, 92]" :temperatuur="[36, 36, 36, 36, 36]" :adem-frequentie="[12, 12, 13, 13, 11]"/> -->
  
  <Alert
    value="37"
    :type="AlertType.temperature"
    name="Joshy Jonkheere"
    datetime="1u geleden"
    level="danger"
  ></Alert>
  <Alert
    value="37"
    :type="AlertType.BloodPressure"
    name="Joshy Jonkheere"
    datetime="1u geleden"
    level="warning"
  ></Alert>
  <Alert
    value="95"
    :type="AlertType.oxygen"
    name="Joshy Jonkheere"
    datetime="1u geleden"
    level="good"
  ></Alert>
  <Alert
    value="95"
    :type="AlertType.heartRate"
    name="Joshy Jonkheere"
    datetime="1u geleden"
    level="good"
  ></Alert>
  <Alert
    value="95"
    :type="AlertType.breathingRate"
    name="Joshy Jonkheere"
    datetime="1u geleden"
    level="good"
  ></Alert>
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

  <template-slider :type='AlertType.breathingRate' :min=0 :max=100 />

  <!-- <Login></Login> -->
  <!-- <Inputs></Inputs> -->
  <!-- <PatientSm /> -->
</template>

<style scoped></style>
