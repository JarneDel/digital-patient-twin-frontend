import { PatientGegevens } from '~/interfaces/IPatient'

export default function usePatientHelper() {

  const createEmptyPatient = () : PatientGegevens => {
    return {
      deviceId: '',
      adres: {
        straat: '',
        gemeente: '',
        postcode: undefined,
        nr: '',
      },
      medisch: {
        lengte: undefined,
        gewicht: undefined,
        bloedgroep: '',
      },
      algemeen: {
        voornaam: '',
        naam: '',
        geboorteland: '',
        geslacht: '',
        geboorteDatum: '',
        id: '',
      },
      contact: {
        email: '',
        telefoon: '',
      },
      medicalNotificationThresholds: undefined,
      createdBy: '',
      profilePictureUrl: '',

    }
  }
  return {
    createEmptyPatient
  }
}