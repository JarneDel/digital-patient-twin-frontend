export default (date: Date): Ref<string> => {
  console.log({ date })
  const timeString = ref('')
  let diff
  let now
  watch(date, () => {
    now = new Date()
    diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / 1000 / 60 / 60 / 24)
    const hoursString = date.getHours().toString().padStart(2, '0')
    const minutesString = date.getMinutes().toString().padStart(2, '0')
    const dayString = date.getDate().toString().padStart(2, '0')
    const monthString = (date.getMonth() + 1).toString().padStart(2, '0')
    if (days > 0) {
      timeString.value = `${dayString}-${monthString}-${date.getFullYear()}`
    } else {
      timeString.value = `${hoursString}:${minutesString}`
    }

  }, { immediate: true })
  return timeString
}