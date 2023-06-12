export interface IPatientAlgemeen {
  id: string
  voornaam: string
  naam: string
  geboorteDatum: string
  geslacht: string
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
