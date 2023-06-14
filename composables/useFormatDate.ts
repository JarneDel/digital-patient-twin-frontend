import { Ref } from 'vue'

export default (date: Ref<Date>): Ref<string> => {
   const timeString = ref('')
  let diff
  let now
  watch(date, () => {
    now = new Date()
    diff = now.getTime() - date.value.getTime()
    const days = Math.floor(diff / 1000 / 60 / 60 / 24)
    const hoursString = date.value.getHours().toString().padStart(2, '0')
    const minutesString = date.value.getMinutes().toString().padStart(2, '0')
    const dayString = date.value.getDate().toString().padStart(2, '0')
    const monthString = (date.value.getMonth() + 1).toString().padStart(2, '0')
    if (days > 0) {
      timeString.value = `${dayString}-${monthString}-${date.value.getFullYear()}`
    } else {
      timeString.value = `${hoursString}:${minutesString}`
    }

  }, { immediate: true })
  return timeString
}