import { H3Error } from 'h3'

export const useEventSource = <T>(url: string) => {
  const sse = ref<EventSource>()
  const data = ref<T>()
  const notFound = ref()
  const api = useApi()

  onMounted(async () => {
    notFound.value = false
    try {
      await api(url, { method: 'HEAD' })
    } catch (err) {
      const h3Err = err as H3Error
      if (h3Err.statusCode === 404) {
        notFound.value = true
      }
      return;
    }

    sse.value = new EventSource(url)
    sse.value.onmessage = ((evt: MessageEvent) => {
      data.value = JSON.parse(evt.data) as T
    })
  })

  onUnmounted(() => {
    sse.value?.close()
  })

  return { data, notFound }
}
