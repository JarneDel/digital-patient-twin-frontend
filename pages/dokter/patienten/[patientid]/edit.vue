<script setup lang="ts">
import { ref } from 'vue'
import {
  Address,
  Contact,
  IMeldingenInstellingen,
  INotificationRange,
  IPatientAlgemeen,
  Medisch,
  PatientGegevens,
} from '~/interfaces/IPatient'
import { Switch } from '@headlessui/vue'
import useConvertNotificationRange from '~/composables/useConvertNotificationRange'
import useTitle from '~/composables/useTitle'
import useMeldingenHelper from '~/composables/useMeldingenHelper'

const { convertThresholdsToRange, convertRangeToThresholds } =
  useConvertNotificationRange()
// todo: skeleton loading of meldingen to prevent layout shift

useTitle('Gegevens patiënt', 'Patiënt gegevens aanpassen.')
const user = useUser().value

const routeID = useRoute().params.patientid as string
const id = ref(routeID)
const {
  fetchMeldingen,
  updateThresholds,
  updateAreNotificationsEnabled,
  createEmptyNotificationThresholds,
  createEmptyMeldingenInstellingen,
} = useMeldingenHelper(id, user)

//get patient data
const url = `https://patientgegevens--hml08fh.blackdune-2fd1ec46.northeurope.azurecontainerapps.io/patient/${id.value}`

const {
  data: notificationsEnabledData,
  pending: notificationsPending,
  error: notificationsError,
  execute: refreshNotifications,
} = fetchMeldingen()

const notificationsEnabled = ref<IMeldingenInstellingen>()
watch(notificationsEnabledData, () => {
  console.log(
    'notificationsEnabledData changed to:',
    notificationsEnabledData.value,
  )
  if (notificationsEnabledData.value) {
    notificationsEnabled.value = notificationsEnabledData.value
  }
})

const { error, data, pending, execute } = await useFetch<PatientGegevens>(url)
const patient: IPatientAlgemeen = data.value?.algemeen as IPatientAlgemeen
const patientAdres: Address = data.value?.adres as Address
const patientMedisch: Medisch = data.value?.medisch as Medisch
const patientContact: Contact = data.value?.contact as Contact
const gegevens = data.value as PatientGegevens

const formPatient = ref<IPatientAlgemeen>(patient)

const formPatientAdres = ref<Address>(patientAdres)
const formPatientMedisch = ref<Medisch>(patientMedisch)
const formPatientContact = ref<Contact>(patientContact)
const isSavedPopupOpen = ref(false)

const submitForm = async () => {
  try {
    console.log('submitting form')

    if (!data.value || !thresholds.value)
      throw new Error('No data or thresholds')
    const updatedPatientData: PatientGegevens = {
      algemeen: formPatient.value,
      adres: formPatientAdres.value,
      medisch: formPatientMedisch.value,
      contact: formPatientContact.value,
      deviceId: gegevens.deviceId,
      id: gegevens.id,
      medicalNotificationThresholds: convertRangeToThresholds(thresholds.value),
    }

    // Send the updated patient data to your API endpoint
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPatientData),
    })

    if (response.ok) {
      //execute the fetch again to update the data
      execute()
      // Handle successful update
      console.log('Patient data updated successfully')
      isSavedPopupOpen.value = true

      console.log(fetch)
    } else {
      // Handle update error
      console.error('Failed to update patient data')
    }
  } catch (error) {
    console.error('An error occurred while updating patient data:', error)
  }
}

const patientForGoback = { ...patient }
const editLinkName = computed(
  () => `${patientForGoback.voornaam} ${patientForGoback.naam} | Edit`,
)

watch(
  notificationsEnabled,
  () => {
    if (!notificationsEnabled.value) return
    updateAreNotificationsEnabled(notificationsEnabled.value)
  },
  { deep: true },
)

const thresholds = ref<INotificationRange>()
watch(
  data,
  () => {
    if (!data.value || !data.value.medicalNotificationThresholds) return
    thresholds.value = convertThresholdsToRange(
      data.value.medicalNotificationThresholds,
    )
    console.log('thresholds', thresholds.value)
  },
  { immediate: true },
)
const fireRangeUpdate = () => {
  console.log('update')
  // convert the thresholds to the correct format
  if (!thresholds.value) return
  updateThresholds(convertRangeToThresholds(thresholds.value))
}
const createThresholds = async () => {
  if (!gegevens.medicalNotificationThresholds) {
    gegevens.medicalNotificationThresholds = createEmptyNotificationThresholds()
    await updateThresholds(gegevens.medicalNotificationThresholds)
  }
  if (notificationsError.value) {
    // post the enabled notifications
    if (!notificationsEnabled.value) {
      notificationsEnabled.value = createEmptyMeldingenInstellingen()
    }
  }
  await execute()
  await refreshNotifications()
}
</script>

<template>
  <popup-closeable
    v-model:is-open="isSavedPopupOpen"
    title-message="Gegevens opgeslagen"
    message="De gegevens van de patiënt zijn opgeslagen."
    button2="Terug naar patiënt"
    button3="Blijf hier"
    @button2Event="() => navigateTo(`/dokter/patienten/${id}/gegevens`)"
    @button3Event="() => (isSavedPopupOpen = false)"
  />

  <form @submit.prevent="submitForm">
    <div
      class="m-5 flex max-w-[74rem] flex-row items-center justify-between lg:mx-20"
    >
      <pressables-goback
        :link_name="editLinkName"
        :link_path="`/dokter/patienten/${id.valueOf}/gegevens`"
      />
      <PressablesSaveButton type='submit'></PressablesSaveButton>
    </div>
    <div class="mx-5 flex flex-col justify-start flex-wrap gap-12 md:flex-row lg:mx-20">
      <!-- persoonlijke -->
      <div class="" v-if="notificationsEnabled && thresholds">
        <!-- <FormsSelectDevice></FormsSelectDevice> -->
        <div class="flex flex-row justify-between">
          <TextKop2
            title="Stel hier in wanneer je een melding wil krijgen van afwijkende waardes van de patiënt. De instellingen slaan automatisch op."
            >meldingen 🛈
          </TextKop2>
          <Switch
            v-model="notificationsEnabled.masterSwitch"
            :class="
              notificationsEnabled.masterSwitch
                ? 'bg-tertiary-400'
                : 'bg-tertiary-200'
            "
            class="relative inline-flex h-6 w-11 items-center rounded-full"
          >
            <span class="sr-only">zet alle meldingen aan/uit</span>
            <span
              :class="
                notificationsEnabled.masterSwitch
                  ? 'translate-x-6'
                  : 'translate-x-1'
              "
              class="inline-block h-4 w-4 transform rounded-full bg-white transition"
            />
          </Switch>
        </div>
        <div class="mt-4">
          <div
            class="flex flex-row content-center justify-between"
            v-if="notificationsEnabled"
          >
            <text-kop3>Ademfrequentie</text-kop3>
            <Switch
              v-model="notificationsEnabled.ademhalingsfrequentie"
              :class="
                notificationsEnabled.ademhalingsfrequentie
                  ? 'bg-tertiary-400'
                  : 'bg-tertiary-200'
              "
              class="relative inline-flex h-6 w-11 items-center rounded-full"
            >
              <span class="sr-only">Enable notifications</span>
              <span
                :class="
                  notificationsEnabled.ademhalingsfrequentie
                    ? 'translate-x-6'
                    : 'translate-x-1'
                "
                class="inline-block h-4 w-4 transform rounded-full bg-white transition"
              />
            </Switch>
          </div>
          <template-slider
            class="-mx-5 mt-0"
            v-model="thresholds.ademhalingsfrequentie"
            @change="fireRangeUpdate"
            :step="0.1"
            :min="0"
            :max="100"
          />
        </div>
        <div class="mt-8">
          <div class="flex flex-row content-center justify-between">
            <text-kop3>Bloedzuurstof</text-kop3>
            <Switch
              v-model="notificationsEnabled.bloedzuurstof"
              :class="
                notificationsEnabled.bloedzuurstof
                  ? 'bg-tertiary-400'
                  : 'bg-tertiary-200'
              "
              class="relative inline-flex h-6 w-11 items-center rounded-full"
            >
              <span class="sr-only">Enable notifications</span>
              <span
                :class="
                  notificationsEnabled.bloedzuurstof
                    ? 'translate-x-6'
                    : 'translate-x-1'
                "
                class="inline-block h-4 w-4 transform rounded-full bg-white transition"
              />
            </Switch>
          </div>
          <template-slider
            class="-mx-5"
            v-model="thresholds.bloedzuurstof"
            @change="fireRangeUpdate"
            :min="67"
            :max="100"
          />
        </div>
        <div class="mt-4">
          <div class="flex flex-row content-center justify-between">
            <text-kop3>Hartslag</text-kop3>
            <Switch
              v-model="notificationsEnabled.hartslag"
              :class="
                notificationsEnabled.hartslag
                  ? 'bg-tertiary-400'
                  : 'bg-tertiary-200'
              "
              class="relative inline-flex h-6 w-11 items-center rounded-full"
            >
              <span class="sr-only">Enable notifications</span>
              <span
                :class="
                  notificationsEnabled.hartslag
                    ? 'translate-x-6'
                    : 'translate-x-1'
                "
                class="inline-block h-4 w-4 transform rounded-full bg-white transition"
              />
            </Switch>
          </div>
          <template-slider
            class="-mx-5"
            v-model="thresholds.hartslag"
            @change="fireRangeUpdate"
            :min="10"
            :max="160"
          />
        </div>
        <div class="mt-4">
          <div class="flex flex-row content-center justify-between">
            <text-kop3>Bloeddruk</text-kop3>
            <Switch
              v-model="notificationsEnabled.bloeddruk"
              :class="
                notificationsEnabled.bloeddruk
                  ? 'bg-tertiary-400'
                  : 'bg-tertiary-200'
              "
              class="relative inline-flex h-6 w-11 items-center rounded-full"
            >
              <span class="sr-only">Enable notifications</span>
              <span
                :class="
                  notificationsEnabled.bloeddruk
                    ? 'translate-x-6'
                    : 'translate-x-1'
                "
                class="inline-block h-4 w-4 transform rounded-full bg-white transition"
              />
            </Switch>
          </div>
          <p class="text-xs text-gray-500">systolisch</p>
          <template-slider
            class="-mx-5"
            v-model="thresholds.bloeddrukSystolisch"
            @change="fireRangeUpdate"
            :min="0"
            :max="200"
          />
          <p class="text-xs text-gray-500">diastolisch</p>
          <template-slider
            class="-mx-5"
            v-model="thresholds.bloeddrukDiastolisch"
            @change="fireRangeUpdate"
            :min="0"
            :max="150"
          />
        </div>
        <div class="mt-4">
          <div class="flex flex-row content-center justify-between">
            <text-kop3>temperatuur</text-kop3>
            <Switch
              v-model="notificationsEnabled.temperatuur"
              :class="
                notificationsEnabled.temperatuur
                  ? 'bg-tertiary-400'
                  : 'bg-tertiary-200'
              "
              class="relative inline-flex h-6 w-11 items-center rounded-full"
            >
              <span class="sr-only">Enable notifications</span>
              <span
                :class="
                  notificationsEnabled.temperatuur
                    ? 'translate-x-6'
                    : 'translate-x-1'
                "
                class="inline-block h-4 w-4 transform rounded-full bg-white transition"
              />
            </Switch>
          </div>
          <template-slider
            class="-mx-5"
            v-model="thresholds.temperatuur"
            @change="fireRangeUpdate"
            :min="33"
            :max="42"
            :step="0.1"
          />
        </div>
      </div>
      <div
        v-else-if="
          !gegevens.medicalNotificationThresholds || notificationsError
        "
      >
        <p>Meldingen van deze patient staan uit.</p>
        <pressables-button @click="createThresholds">
          Zet je meldingen aan
        </pressables-button>
      </div>

      <div class="flex max-w-lg">
        <div>
          <TextKop2 class="mb-2">Persoonlijke gegevens</TextKop2>
          <forms-text
            v-model="patient.voornaam"
            label="Voornaam"
            input-id="voornaam"
          />
          <forms-text
            v-model="patient.naam"
            label="Achternaam"
            input-id="naam"
          />
          <forms-input-select
            v-model="patient.geslacht"
            input-id="geslacht"
            label="Geslacht"
            :options="['Man', 'Vrouw', 'Anders']"
          />
          <forms-text
            v-model="patient.geboorteland"
            input-id="geboorteland"
            label="Geboorteland"
          />
          <forms-text
            v-model="patient.geboorteDatum"
            input-id="geboorteDatum"
            label="Geboortedatum"
            type="date"
          />

          <TextKop2 class="mb-2 mt-6">Adres informatie</TextKop2>
          <forms-text
            v-model="patientAdres.gemeente"
            input-id="gemeente"
            label="Gemeeente"
          />
          <forms-text-aria
            v-model="patientAdres.straat"
            input-id="straat"
            label="Straatnaam"
          />
          <div class="flex flex-row gap-4">
            <forms-text
              v-model="patientAdres.postcode"
              input-id="Postcode"
              label="Postcode"
            />
            <forms-text
              v-model="patientAdres.nr"
              input-id="huisnummer"
              label="Huisnummer"
            />
          </div>
          
        </div>
      </div>

      <!-- medisch -->
      <div class="flex">
        <div class="w-[396px]">
          <TextKop2 class="mb-2">Medische gegevens</TextKop2>
          <forms-text
            v-model="patientMedisch.lengte"
            input-id="length"
            label="Lengte [cm]"
          />
          <forms-text
            v-model="patientMedisch.gewicht"
            input-id="weight"
            label="Gewicht [kg]"
          />

          <forms-input-select
            input-id="bloedgroep"
            label="Bloedgroep"
            :options="['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']"
            v-model="patientMedisch.bloedgroep"
          />

          <TextKop2 class="mb-2 mt-6">Contact gegevens</TextKop2>
          <forms-text
            v-model="patientContact.email"
            input-id="email"
            label="Email"
            type="email"
          />
          <forms-text
            v-model="patientContact.telefoon"
            input-id="telefoon"
            label="Telefoon"
            type="tel"
          />
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped>
/* Styles */
</style>
