namespace PatientData.models {
  export interface VitalStats {
    systolic: VitalStat;
    diastolic: VitalStat;
    ademFrequentie: VitalStat;
    hartslag: VitalStat;
    bloedzuurstof: VitalStat;
    temperatuur: VitalStat;
  }

  export interface VitalStat {
    min: number;
    avg: number;
    max: number;
    unit: string;
  }
}
