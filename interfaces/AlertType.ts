export enum AlertType {
  Bloeddruk,
  Temperatuur ,
  Bloedzuurstof ,
  Hartslag ,
  AdemsFrequentie ,
  "Alle types"
}

export enum AlertLevel {
  // Info = 'Info',
  // Matig = 'Matig',
  // Kritiek = 'Kritiek'
  Info,
  Matig,
  Kritiek,
  "Alles"
}

export interface IMelding {
  id: string
  patientId: string
  fullName: string
  type: AlertType
  level: AlertLevel
  value: string
  timestamp: Date
  birthDate: string
}