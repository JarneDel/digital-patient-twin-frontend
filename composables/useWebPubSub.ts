import { WebPubSubClient } from '@azure/web-pubsub-client'

export default function useWebPubSub() {
  const client = ref<WebPubSubClient>()
  const isInitialized = ref(false)

  const negotiateUrl = 'https://iothubprocessor.azurewebsites.net/api/negotiate'

  const initializeClient = async () => {
    // check if initialized
    if (isInitialized.value) return
    try {
      const response = await fetch(negotiateUrl)
      const data = await response.json()
      client.value = new WebPubSubClient(data.uri)
      client.value.on('connected', () => {
        console.log('connected')
      })
      client.value.on('disconnected', () => {
        console.warn("realtime data disconnected");
        isInitialized.value = false;
      });
      client.value?.start()
      isInitialized.value = true
      console.log(client.value?.joinGroup('testdatagenerator'))
    } catch (error) {
      console.error('Failed to initialize WebPubSub client', error)
    }
  }

  const subscribeToGroup = async (group: string) => {
    try {
      await client.value?.joinGroup(group)
    } catch (error) {
      console.error('Failed to subscribe to group', error)
    }
  }
  const unsubscribeFromGroup = async (group: string) => {
    try {
      await client.value?.leaveGroup(group)
    } catch (error) {
      console.error('Failed to unsubscribe from group', error)
    }
  }

  return {
    client,
    initializeClient,
    isInitialized,
    subscribeToGroup,
    unsubscribeFromGroup,
  }
}