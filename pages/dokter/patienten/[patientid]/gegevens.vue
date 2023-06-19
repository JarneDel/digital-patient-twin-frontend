<script setup lang="ts">
import { PatientGegevens } from '~/interfaces/IPatient'
import { LucideEdit3 } from 'lucide-vue-next'

useTitle('Gegevens patiënt', 'Patiënt detailpagina.')
const routeID = useRoute().params.patientid as string

//id dynamicaaly
const id = ref(routeID)

const url = `https://patientgegevens--hml08fh.blackdune-2fd1ec46.northeurope.azurecontainerapps.io/patient/${id.value}`

const { error, data, pending } = useFetch<PatientGegevens>(url)

const { convertDateStringToLocaleString } = UseDateConverter()
</script>

<template>
  <div
    class="m-5 flex max-w-[74rem] flex-col items-center justify-between md:flex-row lg:mx-20"
  >
    <PressablesGoback
      link_path="/dokter/patienten"
      link_name="patient gegevens"
    ></PressablesGoback>

    <button
      class="duration-400 m-2 w-10 min-w-max rounded-lg border border-transparent bg-tertiary-100/30 p-5 outline-none ring-2 ring-tertiary-300 transition-all hover:cursor-pointer hover:bg-tertiary-200/40 focus-visible:ring-tertiary-500"
      @click="() => $router.push(`/dokter/patienten/${id}/edit`)"
    >
      <LucideEdit3 class="text-tertiary-600 h-8 w-8" />
    </button>
  </div>

  <div
    class="mx-5 grid grid-cols-1 gap-8 md:grid-cols-2 lg:mx-20 lg:grid-cols-4"
    v-if="data"
  >
    <!-- profiel -->
    <div class="mx-auto lg:col-span-1">
      <div class="flex text-lg font-semibold">
        <p class="mx-auto text-center text-2xl font-semibold">
          {{ data.algemeen.voornaam }} {{ data.algemeen.naam }}
        </p>
      </div>
      <div>
        <p class="mx-auto text-center text-sm font-normal text-neutral-100">
          {{ data.contact.email }}<br />
          {{ convertDateStringToLocaleString(data.algemeen.geboorteDatum) }}
        </p>
      </div>

      <!-- meldingen -->
      <div class="relative">
        <svg-fitbit class="mx-auto"></svg-fitbit>
        <p class="absolute inset-0 top-12 text-center text-sm font-semibold">
          {{ '#' + data.deviceId }}
          <!-- #1 -->
        </p>
      </div>
    </div>

    <!-- persoonlijke -->
    <div class="lg:col-span-1">
      <TextKop2 class="my-5">Persoonlijke informatie</TextKop2>
      <div class="form-item">
        <div>
          <h4>geslacht</h4>
          <p>
            {{ data.algemeen.geslacht }}
          </p>
        </div>
        <div>
          <h4>Geboortedatum:</h4>
          <p>
            {{ convertDateStringToLocaleString(data.algemeen.geboorteDatum) }}
          </p>
        </div>
        <div>
          <h4>Geboorteland:</h4>
          <p>
            {{ data.algemeen.geboorteland }}
          </p>
        </div>
      </div>

      <!-- adres -->
      <TextKop2 class="my-5">Adres informatie</TextKop2>
      <div class="form-item">
        <div>
          <h4>Straatnaam:</h4>
          <p>
            {{ data.adres.straat }}
          </p>
        </div>
        <div>
          <h4>Huisnummer:</h4>
          <p>
            {{ data.adres.nr }}
          </p>
        </div>
        <div>
          <h4>Postcode:</h4>
          <p>
            {{ data.adres.postcode }}
          </p>
        </div>
        <div>
          <h4>Gemeente:</h4>
          <!-- <p>{{ patientAdres.gemeente }}</p> -->
          <p>
            {{ data.adres.gemeente }}
          </p>
        </div>
      </div>
    </div>

    <!-- medisch -->
    <div class="lg:col-span-1">
      <TextKop2 class="my-5">Medische informatie</TextKop2>
      <div class="form-item">
        <div>
          <h4>Lengte:</h4>
          <p>
            {{ data.medisch.lengte + ' cm' }}
          </p>
        </div>
        <div>
          <h4>Gewicht:</h4>
          <p>
            {{ data.medisch.gewicht + ' kg' }}
          </p>
        </div>
        <div>
          <h4>Bloedgroep:</h4>
          <p>
            {{ data.medisch.bloedgroep }}
          </p>
        </div>
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
.form-item > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}
.form-item {
  margin-bottom: 1rem;
  max-width: 20rem;
}
.form-item > div > h4 {
  text-transform: capitalize;
  font-weight: 500;
}
</style>
