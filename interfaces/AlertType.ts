export enum AlertType {
  BloodPressure = 'Bloeddruk',
  temperature = 'Temperatuur',
  oxygen = 'Bloedzuurstof',
  heartRate = 'Hartslag',
  breathingRate = 'Ademhalingsfrequentie',
}

export enum AlertLevel {
  Low = 'Laag',
  Medium = 'Matig',
  High = 'Kritiek',
}

export interface IMelding {
  id: string
  patientId: string
  name: string
  type: AlertType
  level: AlertLevel
  value: string
  time: Date
  dateOfBirth: string
}