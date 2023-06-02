<script setup lang='ts'>
import { IPatientAlgemeen, PatientGegevens } from '~/interfaces/IPatient'
import { LucideLineChart, LucideEdit } from 'lucide-vue-next'

defineProps(
  {
    // 'patient': {
    //   type: Object as PropType<IPatientAlgemeen>,
    //   required: true,
    // },
    'type': {
      type: String as PropType<'view' | 'edit'>,
      required: true,
    },
  },
)

const url =
  'http://localhost:5012/v1.0/invoke/PatientGegevensService/method/patient/878c95cf-e82d-40a5-a56c-8790427f1657'
const { error, data, pending } = await useFetch<PatientGegevens>(url)


const calculateAge = (date: string): number => {
  const today = new Date();
  const [day, month, year] = date.split('/');

  const geboortedatum = new Date(`${month}/${day}/${year}`);

  let age = today.getFullYear() - geboortedatum.getFullYear();

  const hasBirthdayOccurred = (
    today.getMonth() > geboortedatum.getMonth() ||
    (today.getMonth() === geboortedatum.getMonth() && today.getDate() >= geboortedatum.getDate())
  );

  if (!hasBirthdayOccurred) {
    age--;
  }

  return age;
};


const result = computed<IPatientAlgemeen[]>(() => {
  const lijst: IPatientAlgemeen[] = []
  if (data.value?.algemeen) {
    lijst.push(data.value.algemeen)
  }


  return lijst
})
// fetching function for the realtime data or websocket

</script>

<template>
  <div v-if="pending">Loading... {{ pending }}</div>
  <div v-else-if="error"></div>
  <!-- <div v-else-if="error">Er is een error opgetreden, probeer de pagina opniew te laden</div> -->
  <div class='flex flex-row justify-between bg-neutral-500 p-8 rounded-lg'>
    <div class='flex flex-row justify-start content-center gap-2'>
      <div
      v-if="result"
      :key="Math.random()"
      v-for="naam in result"
      >
        {{ naam.voornaam }}
        {{ naam.naam }}
      </div>
      <div v-for="naam in result">
        {{ calculateAge(naam.geboorteDatum.toString()) }}
      </div>
      <div v-for="naam in result">
        {{ naam.geslacht }}
      </div>
    </div>
    <div class='flex flex-row flex-1 justify-end content-center'>
      <button v-if='type === "view"'>
        <LucideLineChart />
      </button>
      <button v-if='type === "edit"'>
        <LucideEdit />
      </button>
    </div>
    <div>
      <!--    realtime data components-->
    </div>
  </div>
</template>

<style scoped>

</style>