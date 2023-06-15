export interface IRealtime {
    id: string
    deviceId: string
    ademFrequentie: ISensorValue
    hartslag: ISensorValue
    bloedzuurstof: ISensorValue
    temperatuur: ISensorValue
    bloeddruk: {
      systolic: number
      diastolic: number
      unit: string
    }
}

export interface ISensorValue {
  value: number
  unit: string
}