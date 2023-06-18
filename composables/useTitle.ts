export default function useTitle(title: string, description: string) {
  useHead({
    title: title,
    meta: [
      { name: 'description', content: description },
    ],
  })

}