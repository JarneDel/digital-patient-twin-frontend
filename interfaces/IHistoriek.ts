export interface IHistoriek {
    deviceId: string;
  timestamp: string;
  bloeddruk: BloodPressureData;
  ademFrequentie: MeasurementData;
  hartslag: MeasurementData;
  bloedzuurstof: MeasurementData;
  temperatuur: MeasurementData;
}

export interface MeasurementData {
    min: number;
    max: number;
    q1: number;
    q3: number;
    avg: number;
}

export interface BloodPressureData {
    systolic: MeasurementData;
    diastolic: MeasurementData;
}