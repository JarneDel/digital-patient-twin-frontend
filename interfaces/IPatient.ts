export interface IPatientAlgemeen {
  id: string
  voornaam: string
  naam: string
  geboorteDatum: string
  geslacht: string
  geboorteland: string
}

export interface PatientGegevens {
  id: string
  deviceId: string
  algemeen: IPatientAlgemeen
  profilePictureUrl?: string
  adres: Address
  contact: Contact
  medisch: Medisch
  createdBy?: string
  medicalNotificationThresholds: IMedicalNotificationsThresholds
}

export interface Address {
  gemeente?: string
  straat?: string
  postcode?: number
  nr?: string
}

export interface Contact {
  email?: string
  telefoon?: string
}

export interface Medisch {
  bloedgroep?: string
  lengte?: number
  gewicht?: number
}

export interface IMedicalNotificationsThresholds {
  bloeddrukSystolisch: INotifications
  bloeddrukDiastolisch: INotifications
  hartslag: INotifications
  temperatuur: INotifications
  ademhalingsfrequentie: INotifications
  bloedzuurstof: INotifications
}

export interface INotifications {
  min: number
  max: number
}

export interface IMeldingenInstellingen {
  patientId: string;
  masterSwitch: boolean;
  bloeddruk: boolean;
  hartslag: boolean;
  ademhalingsfrequentie: boolean;
  temperatuur: boolean;
  bloedzuurstof: boolean;
}

export interface INotificationRange {
  bloeddrukSystolisch: [number, number];
  bloeddrukDiastolisch: [number, number];
  hartslag: [number, number];
  temperatuur: [number, number];
  ademhalingsfrequentie: [number, number];
  bloedzuurstof: [number, number];
}