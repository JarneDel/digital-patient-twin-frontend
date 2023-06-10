export interface IPatientAlgemeen {
  value(value: any): BodyInit | null | undefined
  Straatnaam: any
  id: number
  voornaam: string
  naam: string
  geboorteDatum: Date
  geslacht: string
  geboorteland: string
}

export interface PatientGegevens {
  id?: string
  deviceId?: string
  algemeen?: IPatientAlgemeen
  profilePictureUrl?: string
  adres?: Address
  contact?: Contact
  medisch?: Medisch
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
