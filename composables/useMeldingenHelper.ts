import { IMedicalNotificationsThresholds, IMeldingenInstellingen } from '~/interfaces/IPatient'
import { AccountInfo } from '@azure/msal-browser'
import { $fetch } from 'ofetch'

export default function useMeldingenHelper(id: Ref<string>, user: AccountInfo | null) {

  const dokterServiceUrl = 'https://dokterservice.blackdune-2fd1ec46.northeurope.azurecontainerapps.io'

  const fetchMeldingen = () => {
    return useFetch<IMeldingenInstellingen>(
      `dokter/${user?.localAccountId}/patient/${id.value}/notifications`,
      {
        baseURL: dokterServiceUrl,
        server: false,
      },
    );
  }
  const updateThresholds = async (thresholds: IMedicalNotificationsThresholds) => {
    const url = `https://patientgegevens.blackdune-2fd1ec46.northeurope.azurecontainerapps.io/patient/${id.value}/thresholds`
    await $fetch(url, {
      method: "PUT",
      body: JSON.stringify(thresholds),
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  const updateAreNotificationsEnabled = async (instellingen: IMeldingenInstellingen) => {
    const url = `https://dokterservice.blackdune-2fd1ec46.northeurope.azurecontainerapps.io/dokter/${user?.localAccountId}/patient/${id.value}/notifications`
    await $fetch(url, {
      method: "POST",
      body: JSON.stringify(instellingen),
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  const createEmptyNotificationThresholds = () : IMedicalNotificationsThresholds => {
    return {
      ademhalingsfrequentie: {
        min: 0,
        max: 0,
      },
      hartslag: {
        min: 0,
        max: 0,
      },
      bloedzuurstof: {
        min: 0,
        max: 0,
      },
      temperatuur: {
        min: 0,
        max: 0,
      },
      bloeddrukDiastolisch: {
        min: 0,
        max: 0,
      },
      bloeddrukSystolisch: {
        min: 0,
        max: 0,
      },
    }
  }
  const createEmptyMeldingenInstellingen = () : IMeldingenInstellingen => {
    return {
      patientId: id.value,
      ademhalingsfrequentie: false,
      hartslag: false,
      bloedzuurstof: false,
      temperatuur: false,
      bloeddruk: false,
      masterSwitch: false,
    }
  }

  return {
    fetchMeldingen,
    updateThresholds,
    updateAreNotificationsEnabled,
    createEmptyNotificationThresholds,
    createEmptyMeldingenInstellingen,
  }
}