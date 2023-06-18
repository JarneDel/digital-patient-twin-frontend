import { PatientGegevens } from '~/interfaces/IPatient'

export default function usePatientHelper() {

  const createEmptyPatient = () : PatientGegevens => {
    return {
      deviceId: '',
      adres: {
        straat: '',
        gemeente: '',
        postcode: 0,
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
  const createPlaceholderPatient = () : PatientGegevens => {
    return {
      id: '1',
      deviceId: '1',
      algemeen: {
        id: '1',
        voornaam: 'voornaam',
        naam: 'naam',
        geboorteDatum: 'geboortedatum',
        geslacht: 'geslacht',
        geboorteland: 'geboorteland',
      },
      profilePictureUrl: 'https://i.imgur.com/3Zo7z6d.png',
      adres: {
        gemeente: 'gemeente',
        straat: 'straat',
        postcode: 123,
        nr: '123a',
      },
      contact: {
        email: 'email@mail.com',
        telefoon: '123456789',
      },
      medisch: {
        bloedgroep: 'A+',
        lengte: 170,
        gewicht: 170,
      },
      createdBy: "1",
      medicalNotificationThresholds: {
        bloeddrukSystolisch: {
          min: 120,
          max: 140,
        },
        bloeddrukDiastolisch: {
          min: 80,
          max: 90,
        },
        hartslag: {
          min: 80,
          max: 120,
        },
        temperatuur: {
          min: 35,
          max: 40,
        },
        ademhalingsfrequentie: {
          min: 10,
          max: 30,
        },
        bloedzuurstof: {
          min: 70,
          max: 100,
        }
      }
    }
  }
  return {
    createEmptyPatient,
    createPlaceholderPatient,
  }
}