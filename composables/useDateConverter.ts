export const UseDateConverter = () => {
  return {
    convertDateStringToLocaleString: (dateString: string) : string => {
      const date = new Date(dateString)
      const dayString = date.getDate().toString().padStart(2, '0')
      const monthString = (date.getMonth() + 1).toString().padStart(2, '0')
      const yearString = date.getFullYear().toString()
      return `${dayString}/${monthString}/${yearString}`
    },
    convertDateStringToAge: (dateString: string) : number => {
      // check if tpye is dd/mm/yyyy
      const regex = /^\d{1,2}\/\d{1,2}\/\d{4}$/
      let date: Date;
      if (regex.test(dateString)) {
        date = new Date(dateString.split('/').reverse().join('-'))
      }else{
        date = new Date(dateString)
      }
      const now = new Date()
      const diff = now.getTime() - date.getTime()
      const days = Math.floor(diff / 1000 / 60 / 60 / 24)
      return Math.floor(days / 365)
    }
  }
}