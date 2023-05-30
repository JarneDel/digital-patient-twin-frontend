export enum AlertType {
  BloodPressure = 'Bloeddruk',
  temperature = 'Temperatuur',
  oxygen = 'Bloedzuurstof',
  heartRate = 'Hartslag',
  breathingRate = 'Ademhalingsfrequentie',
}

export interface IMelding {
  id: number
  name: string
  type: AlertType
  level: string
  value: string
  time: Date
  dateOfBirth: string
}