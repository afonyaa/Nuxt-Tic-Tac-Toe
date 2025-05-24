export const useEventSource = <T>(url: string) => {
  const sse = ref<EventSource>()
  const data = ref<T>()

  onMounted(() => {
    sse.value = new EventSource(url)
    sse.value.onmessage = ((evt: MessageEvent) => {
      data.value = JSON.parse(evt.data) as T
    })
  })

  onUnmounted(() => {
    sse.value?.close()
  })

  return data
}
