import { IMedicalNotificationsThresholds, INotificationRange } from '~/interfaces/IPatient'

export default function useConvertNotificationRange() {

  const convertRangeToThresholds = (range: INotificationRange) : IMedicalNotificationsThresholds => {
    return {
      bloeddrukSystolisch: {
        min: range.bloeddrukSystolisch[0],
        max: range.bloeddrukSystolisch[1]
      },
      bloeddrukDiastolisch: {
        min: range.bloeddrukDiastolisch[0],
        max: range.bloeddrukDiastolisch[1]
      },
      hartslag: {
        min: range.hartslag[0],
        max: range.hartslag[1]
      },
      temperatuur: {
        min: range.temperatuur[0],
        max: range.temperatuur[1]
      },
      ademhalingsfrequentie: {
        min: range.ademhalingsfrequentie[0],
        max: range.ademhalingsfrequentie[1]
      },
      bloedzuurstof: {
        min: range.bloedzuurstof[0],
        max: range.bloedzuurstof[1]
      }
    }
  }
  const convertThresholdsToRange = (thresholds: IMedicalNotificationsThresholds) : INotificationRange => {
    return {
      bloeddrukSystolisch: [thresholds.bloeddrukSystolisch.min, thresholds.bloeddrukSystolisch.max],
      bloeddrukDiastolisch: [thresholds.bloeddrukDiastolisch.min, thresholds.bloeddrukDiastolisch.max],
      hartslag: [thresholds.hartslag.min, thresholds.hartslag.max],
      temperatuur: [thresholds.temperatuur.min, thresholds.temperatuur.max],
      ademhalingsfrequentie: [thresholds.ademhalingsfrequentie.min, thresholds.ademhalingsfrequentie.max],
      bloedzuurstof: [thresholds.bloedzuurstof.min, thresholds.bloedzuurstof.max]
    }
  }


  return {
    convertRangeToThresholds,
    convertThresholdsToRange
  }
}